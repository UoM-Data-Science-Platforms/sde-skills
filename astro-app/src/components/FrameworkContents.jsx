import { useState, useEffect, useRef, useCallback } from 'react';
import yaml from 'js-yaml';
import { DOMAINS, DOMAIN_COLORS } from '../data/domains.js';

const DOMAIN_SLUGS = DOMAINS.map(d => d.id);

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

function domainLink(slug, subId, compId) {
  const params = new URLSearchParams();
  if (subId)  params.set('sub',  subId);
  if (compId) params.set('comp', compId);
  const qs = params.toString();
  return `${base}${slug}/${qs ? '?' + qs : ''}`;
}

export default function FrameworkContents() {
  const [domains, setDomains]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeSlug, setActiveSlug] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetches = DOMAIN_SLUGS.map(slug => {
      const file = `${base}data/safe_${slug.replace(/-/g, '_')}.yaml`;
      return fetch(file).then(r => r.text()).then(t => ({ slug, data: yaml.load(t) }));
    });
    Promise.all(fetches)
      .then(results => {
        const sorted = results.sort((a, b) => a.data.domain.index - b.data.domain.index);
        setDomains(sorted);
        setActiveSlug(sorted[0]?.slug ?? null);
        setLoading(false);
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  // Scroll tracking
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !domains.length) return;
    const OFFSET = window.innerHeight * 0.4;
    const onScroll = () => {
      let active = domains[0].slug;
      for (const { slug } of domains) {
        const section = el.querySelector(`#domain-${slug}`);
        if (section && section.getBoundingClientRect().top <= OFFSET) active = slug;
      }
      setActiveSlug(active);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [domains]);

  const scrollTo = useCallback((slug) => {
    const el = scrollRef.current;
    const section = el?.querySelector(`#domain-${slug}`);
    if (section) {
      setActiveSlug(slug);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  if (loading) return (
    <div style={{ padding: 'var(--space-xl)', color: 'var(--color-text-muted)', fontSize: 'var(--text-small)' }}>Loading…</div>
  );

  return (
    <div className="skills-framework">
      <div className="sticky-header">
        <h1>Framework Contents</h1>
      </div>
      <div className="sticky-subnav">
        <div className="subdomain-tabs">
          {domains.map(({ slug, data }) => (
            <button
              key={slug}
              className={`tab subdomain-tab${activeSlug === slug ? ' active' : ''}`}
              style={{ '--color-domain': DOMAIN_COLORS[slug] ?? 'var(--color-domain-base)' }}
              onClick={() => scrollTo(slug)}
            >
              {data.domain.index}. {data.domain.name.replace(/^Safe /, '')}
            </button>
          ))}
        </div>
      </div>
      <div className="scroll-area" ref={scrollRef} style={{ padding: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {domains.map(({ slug, data }) => (
            <DomainSection key={slug} slug={slug} domain={data.domain} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DomainSection({ slug, domain }) {
  const color = DOMAIN_COLORS[slug] ?? 'var(--color-domain-base)';
  const subdomains = Object.entries(domain.subdomains ?? {});
  const totalComps = subdomains.reduce((n, [, s]) => n + Object.keys(s.competencies ?? {}).length, 0);

  return (
    <section
      id={`domain-${slug}`}
      className="competency-card is-visible"
      style={{ padding: 0, overflow: 'hidden' }}
    >
      {/* Domain header */}
      <div style={{ padding: 'var(--space-lg) var(--space-xl)', borderBottom: '1px solid var(--color-border)' }}>
        <a
          href={domainLink(slug)}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: domain.description ? 'var(--space-sm)' : 0 }}
        >
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color, minWidth: '1.8rem', flexShrink: 0 }}>
            {domain.index}
          </span>
          <span style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', fontWeight: 700, color }}>
            {domain.name}
          </span>
          <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color, opacity: 0.6, fontWeight: 500, flexShrink: 0 }}>
            {subdomains.length} subdomains · {totalComps} competencies
          </span>
        </a>
        {domain.description && (
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)', fontStyle: 'italic', lineHeight: 1.65 }}>
            {domain.description}
          </p>
        )}
      </div>

      {/* Subdomains — each separated by a divider */}
      {subdomains.map(([subId, sub], subIdx) => (
        <SubdomainRow
          key={subId}
          slug={slug}
          subId={subId}
          sub={sub}
          color={color}
          number={`${domain.index}.${subIdx + 1}`}
          divider={subIdx > 0}
        />
      ))}
    </section>
  );
}

function SubdomainRow({ slug, subId, sub, color, number, divider }) {
  const [expanded, setExpanded] = useState(false);
  const competencies = Object.entries(sub.competencies ?? {});
  const desc = sub.description ?? '';
  const firstSentenceEnd = desc.search(/\.\s/);
  const firstLine  = firstSentenceEnd > 0 ? desc.slice(0, firstSentenceEnd + 1) : desc;
  const remainder  = firstSentenceEnd > 0 ? desc.slice(firstSentenceEnd + 1).trim() : '';

  return (
    <div style={{
      borderTop: divider ? '1px solid var(--color-border)' : 'none',
      padding: 'var(--space-md) var(--space-xl)',
    }}>
      {/* Subdomain heading row */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-sm)', marginBottom: desc ? 'var(--space-xs)' : 'var(--space-sm)' }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color, opacity: 0.7, minWidth: '2rem', flexShrink: 0 }}>
          {number}
        </span>
        <a
          href={domainLink(slug, subId)}
          style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)', textDecoration: 'none' }}
          onMouseEnter={e => e.currentTarget.style.color = color}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text)'}
        >
          {sub.name}
        </a>
      </div>

      {/* Subdomain description */}
      {desc && (
        <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 var(--space-sm)', paddingLeft: '2.5rem' }}>
          {firstLine}
          {!expanded && remainder && (
            <button onClick={() => setExpanded(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color, fontSize: '0.72rem', fontWeight: 600, padding: '0 0 0 4px' }}>
              more
            </button>
          )}
          {expanded && (
            <>
              {' '}{remainder}
              <button onClick={() => setExpanded(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color, fontSize: '0.72rem', fontWeight: 600, padding: '0 0 0 4px' }}>
                less
              </button>
            </>
          )}
        </p>
      )}

      {/* Competency chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)', paddingLeft: '2.5rem' }}>
        {competencies.map(([compId, comp], compIdx) => (
          <a
            key={compId}
            href={domainLink(slug, subId, compId)}
            style={{
              fontSize: '0.72rem', fontWeight: 500,
              color: 'var(--color-text-muted)',
              background: `color-mix(in srgb, ${color} 6%, var(--color-surface))`,
              border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
              borderRadius: 'var(--radius-pill)',
              padding: '2px 10px',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `color-mix(in srgb, ${color} 18%, var(--color-surface))`;
              e.currentTarget.style.color = color;
              e.currentTarget.style.borderColor = color;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `color-mix(in srgb, ${color} 6%, var(--color-surface))`;
              e.currentTarget.style.color = 'var(--color-text-muted)';
              e.currentTarget.style.borderColor = `color-mix(in srgb, ${color} 20%, transparent)`;
            }}
          >
            <span style={{ opacity: 0.5, marginRight: 4, fontSize: '0.65rem' }}>{number}.{compIdx + 1}</span>
            {comp.name}
          </a>
        ))}
      </div>
    </div>
  );
}
