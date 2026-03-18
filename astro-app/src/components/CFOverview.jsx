import { useState, useRef, useEffect, useCallback } from 'react';
import { SATRE_PILLARS, SUBDOMAINS, DOMAINS as SATRE_DOMAINS } from '../data/satreMapping.js';
import { DOMAIN_COLORS } from '../data/domains.js';

// domainId -> array of its subdomain IDs
const DOMAIN_SUB_IDS = Object.fromEntries(
  SATRE_DOMAINS.map(d => [d.id, SUBDOMAINS.filter(s => s.domainId === d.id).map(s => s.id)])
);

// Map CFOverview domain IDs -> SATRE domain IDs
const DOMAIN_SATRE_ID = {
  'technology-engineering':     'ste',
  'data-management':            'sdm',
  'access-identity':            'sai',
  'outputs-disclosure-control': 'sod',
  'projects-operations':        'spo',
  'governance-compliance':      'sgc',
};

const TOTAL_SATRE_COMPONENTS = SATRE_PILLARS.reduce((n, p) => n + p.components.length, 0);

const FIVE_SAFES_LOOKUP = {
  'Safe Technology & Engineering':     'Safe Settings',
  'Safe Data Management':              'Safe Data',
  'Safe Access & Identity':            'Safe People',
  'Safe Outputs & Disclosure Control': 'Safe Outputs',
  'Safe Projects & Operations':        'Safe Projects',
  'Safe Governance & Compliance':      'Spans all five',
};

const DOMAINS = [
  { id: 'technology-engineering',     name: 'Safe Technology & Engineering',    desc: 'Technical implementation of secure systems'              },
  { id: 'data-management',            name: 'Safe Data Management',             desc: 'Handling, processing, and governing data'                },
  { id: 'access-identity',            name: 'Safe Access & Identity',           desc: 'User authentication, authorisation, and access control'  },
  { id: 'outputs-disclosure-control', name: 'Safe Outputs & Disclosure Control',desc: 'Ensuring non-disclosive research outputs'                },
  { id: 'projects-operations',        name: 'Safe Projects & Operations',       desc: 'Project management and operational excellence'           },
  { id: 'governance-compliance',      name: 'Safe Governance & Compliance',     desc: 'Meeting regulatory and ethical requirements'             },
];

const FIVE_SAFES = [
  { domain: 'Safe Technology & Engineering',    principle: 'Safe Settings'  },
  { domain: 'Safe Data Management',             principle: 'Safe Data'      },
  { domain: 'Safe Access & Identity',           principle: 'Safe People'    },
  { domain: 'Safe Outputs & Disclosure Control',principle: 'Safe Outputs'   },
  { domain: 'Safe Projects & Operations',       principle: 'Safe Projects'  },
  { domain: 'Safe Governance & Compliance',     principle: 'Spans all five' },
];


const APPLICATIONS = [
  {
    label: 'Career Development',
    desc: 'Structured progression pathways for Research Technical Professionals',
    type: 'Application',
    icon: (c) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="18" width="5" height="7" rx="1" fill={c} opacity="0.25" stroke={c} strokeWidth="1.2"/>
        <rect x="11" y="12" width="5" height="13" rx="1" fill={c} opacity="0.45" stroke={c} strokeWidth="1.2"/>
        <rect x="19" y="5" width="5" height="20" rx="1" fill={c} opacity="0.7" stroke={c} strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    label: 'Training Pathways',
    desc: 'Learning journeys aligned to competency levels and domain needs',
    type: 'Application',
    icon: (c) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="5" cy="14" r="3" stroke={c} strokeWidth="1.5"/>
        <circle cx="14" cy="7" r="3" stroke={c} strokeWidth="1.5"/>
        <circle cx="23" cy="14" r="3" stroke={c} strokeWidth="1.5"/>
        <circle cx="14" cy="21" r="3" stroke={c} strokeWidth="1.5"/>
        <line x1="8" y1="12" x2="11" y2="9" stroke={c} strokeWidth="1.2" strokeDasharray="2 2"/>
        <line x1="17" y1="9" x2="20" y2="12" stroke={c} strokeWidth="1.2" strokeDasharray="2 2"/>
        <line x1="20" y1="16" x2="17" y2="19" stroke={c} strokeWidth="1.2" strokeDasharray="2 2"/>
        <line x1="11" y1="19" x2="8" y2="16" stroke={c} strokeWidth="1.2" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    label: 'Skills Gap Analysis',
    desc: 'Identify and quantify capability gaps within teams and organisations',
    type: 'Application',
    icon: (c) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" strokeDashoffset="3"/>
        <circle cx="14" cy="14" r="5" stroke={c} strokeWidth="1.5" opacity="0.5"/>
        <line x1="14" y1="4" x2="14" y2="9" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Role Specifications',
    desc: 'Inform job descriptions and grade expectations with defined competencies',
    type: 'Application',
    icon: (c) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="6" y="3" width="16" height="22" rx="2" stroke={c} strokeWidth="1.5"/>
        <line x1="10" y1="9" x2="18" y2="9" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="10" y1="13" x2="18" y2="13" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="10" y1="17" x2="15" y2="17" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Recruitment & Retention',
    desc: 'Attract and retain talent using consistent, transparent competency standards',
    type: 'Application',
    icon: (c) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="10" r="4" stroke={c} strokeWidth="1.5"/>
        <path d="M4 22c0-4 2.7-6 6-6s6 2 6 6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="10" r="3" stroke={c} strokeWidth="1.3" opacity="0.6"/>
        <path d="M17 22c0-3 1.5-4.5 3-4.5" stroke={c} strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
];

const ENHANCED_AREAS = [
  {
    label: 'Healthcare Data Models & Standards',
    desc: 'FHIR, SNOMED, HL7 and NHS data standards applied in secure research contexts',
    type: 'Enhanced Area',
    icon: (c) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="7" width="22" height="14" rx="2" stroke={c} strokeWidth="1.5"/>
        <line x1="3" y1="12" x2="25" y2="12" stroke={c} strokeWidth="1.2" opacity="0.5"/>
        <line x1="10" y1="7" x2="10" y2="21" stroke={c} strokeWidth="1.2" opacity="0.5"/>
        <line x1="18" y1="7" x2="18" y2="21" stroke={c} strokeWidth="1.2" opacity="0.5"/>
      </svg>
    ),
  },
  {
    label: 'Enterprise Solution Development',
    desc: 'Building scalable, production-grade systems within NHS and public sector environments',
    type: 'Enhanced Area',
    icon: (c) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.5"/>
        <rect x="16" y="4" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.5" opacity="0.6"/>
        <rect x="4" y="16" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.5" opacity="0.6"/>
        <rect x="16" y="16" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.5" opacity="0.4"/>
        <line x1="12" y1="8" x2="16" y2="8" stroke={c} strokeWidth="1.2"/>
        <line x1="8" y1="12" x2="8" y2="16" stroke={c} strokeWidth="1.2"/>
        <line x1="20" y1="12" x2="20" y2="16" stroke={c} strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    label: 'Component-Based Architecture',
    desc: 'Modular, reusable design patterns for maintainable and extensible TRE systems',
    type: 'Enhanced Area',
    icon: (c) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="9" y="3" width="10" height="7" rx="1.5" stroke={c} strokeWidth="1.5"/>
        <rect x="3" y="18" width="9" height="7" rx="1.5" stroke={c} strokeWidth="1.5" opacity="0.7"/>
        <rect x="16" y="18" width="9" height="7" rx="1.5" stroke={c} strokeWidth="1.5" opacity="0.7"/>
        <line x1="14" y1="10" x2="14" y2="14" stroke={c} strokeWidth="1.3"/>
        <line x1="14" y1="14" x2="7" y2="18" stroke={c} strokeWidth="1.3"/>
        <line x1="14" y1="14" x2="21" y2="18" stroke={c} strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    label: 'Healthcare Regulatory Frameworks',
    desc: 'DSP Toolkit, DTAC, and NHS-specific compliance requirements for data environments',
    type: 'Enhanced Area',
    icon: (c) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L5 7v8c0 5 4 9 9 10 5-1 9-5 9-10V7L14 3z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/>
        <polyline points="10,14 13,17 19,11" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Code Publication & Reusability',
    desc: 'Open-source practices, reproducible research, and code sharing within TRE constraints',
    type: 'Enhanced Area',
    icon: (c) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="21" cy="7" r="3" stroke={c} strokeWidth="1.5"/>
        <circle cx="7" cy="14" r="3" stroke={c} strokeWidth="1.5"/>
        <circle cx="21" cy="21" r="3" stroke={c} strokeWidth="1.5"/>
        <line x1="10" y1="12.5" x2="18" y2="8.5" stroke={c} strokeWidth="1.3"/>
        <line x1="10" y1="15.5" x2="18" y2="19.5" stroke={c} strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    label: 'Resource & Cost Management',
    desc: 'Cloud cost optimisation, capacity planning, and efficient use of research compute budgets',
    type: 'Enhanced Area',
    icon: (c) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polyline points="4,22 10,14 15,17 24,6" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="6" r="2" fill={c} opacity="0.7"/>
        <line x1="4" y1="24" x2="24" y2="24" stroke={c} strokeWidth="1.2" opacity="0.4"/>
      </svg>
    ),
  },
  {
    label: 'Community Engagement',
    desc: 'Stakeholder communication, open science advocacy, and cross-institutional collaboration',
    type: 'Enhanced Area',
    icon: (c) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="9" r="3.5" stroke={c} strokeWidth="1.5"/>
        <circle cx="6" cy="20" r="2.5" stroke={c} strokeWidth="1.3" opacity="0.6"/>
        <circle cx="22" cy="20" r="2.5" stroke={c} strokeWidth="1.3" opacity="0.6"/>
        <path d="M9 22c0-2 1.5-3.5 5-3.5s5 1.5 5 3.5" stroke={c} strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
        <line x1="9" y1="11" x2="6" y2="17.5" stroke={c} strokeWidth="1.2" opacity="0.5"/>
        <line x1="19" y1="11" x2="22" y2="17.5" stroke={c} strokeWidth="1.2" opacity="0.5"/>
      </svg>
    ),
  },
];

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

const SECTIONS = [
  { id: 'introduction',         label: 'Introduction'    },
  { id: 'framework-structure',  label: 'Structure'       },
  { id: 'domains',              label: 'Domains'         },
  { id: 'standards-alignment',  label: 'Alignment'       },
  { id: 'applications',         label: 'Applications'    },
];

export default function CFOverview() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [alignTab, setAlignTab] = useState('five-safes');
  const scrollRef = useRef(null);
  const sectionRefs = useRef({});

  const color = 'var(--color-purple)';

  // --color-domain-base is set by Layout.astro — no need to set it here

  // True when the scroll-area element is the scroll container (desktop)
  const isContainerScroll = () => {
    const el = scrollRef.current;
    return el ? el.scrollHeight > el.clientHeight + 10 : false;
  };

  const handleScroll = useCallback(() => {
    const threshold = isContainerScroll()
      ? scrollRef.current.getBoundingClientRect().top + scrollRef.current.clientHeight * 0.3
      : window.innerHeight * 0.3;
    let found = SECTIONS[0].id;
    for (const { id } of SECTIONS) {
      const el = sectionRefs.current[id];
      if (el && el.getBoundingClientRect().top <= threshold) found = id;
    }
    setActiveSection(found);
  }, []);

  const scrollTo = useCallback((id) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    if (isContainerScroll()) {
      const container = scrollRef.current;
      const containerTop = container.getBoundingClientRect().top;
      const top = el.getBoundingClientRect().top - containerTop + container.scrollTop - 22;
      container.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    } else {
      // Mobile: window is the scroll container; offset for sticky header + subnav
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
    setActiveSection(id);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const secRef = (id) => (el) => { if (el) sectionRefs.current[id] = el; };

  // Build flat row array for summary matrix (avoids invalid DOM from fragments in tbody)
  const satreSummaryRows = [];
  SATRE_PILLARS.forEach(pillar => {
    satreSummaryRows.push(
      <tr key={`pillar-${pillar.id}`} style={{ background: `color-mix(in srgb, var(--color-text) 4%, transparent)`, borderTop: '2px solid var(--color-border)' }}>
        <td colSpan={SATRE_DOMAINS.length + 1} style={{ padding: '7px 14px', fontWeight: 700, fontSize: '0.78rem', color: 'var(--color-heading)' }}>
          {pillar.name}
        </td>
      </tr>
    );
    pillar.components.forEach(comp => {
      satreSummaryRows.push(
        <tr key={`comp-${comp.id}`} style={{ borderTop: '1px solid var(--color-border)' }}>
          <td style={{ padding: '5px 14px', fontSize: '0.82rem', color: 'var(--color-text)', verticalAlign: 'middle' }}>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.62rem', marginRight: 6, fontWeight: 600 }}>{comp.id}</span>
            {comp.name}
          </td>
          {SATRE_DOMAINS.map(d => {
            const count = DOMAIN_SUB_IDS[d.id].filter(sid => comp.mappings[sid]).length;
            const level = count === 0 ? 'none' : count === 1 ? 'low' : count >= 3 ? 'high' : 'medium';
            return (
              <td key={d.id} style={{ padding: 4, textAlign: 'center', borderLeft: '1px solid var(--color-border)', verticalAlign: 'middle' }}>
                {count > 0 && (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 26, height: 26, borderRadius: 'var(--radius-sm)',
                    background: level === 'high'
                      ? `color-mix(in srgb, ${d.color} 22%, transparent)`
                      : level === 'medium'
                      ? `color-mix(in srgb, ${d.color} 14%, transparent)`
                      : `color-mix(in srgb, ${d.color} 8%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${d.color} ${level === 'high' ? 45 : level === 'medium' ? 30 : 18}%, transparent)`,
                    color: d.color,
                    fontSize: '0.68rem', fontWeight: 700,
                    opacity: level === 'low' ? 0.7 : 1,
                  }}>
                    {count}
                  </div>
                )}
              </td>
            );
          })}
        </tr>
      );
    });
  });

  return (
    <div className="skills-framework">
      {/* Sticky header */}
      <div className="sticky-header">
        <h1>Competency Framework Overview</h1>
      </div>

      {/* Sticky subnav */}
      <div className="sticky-subnav">
        <div className="subdomain-tabs">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              className={`tab subdomain-tab${activeSection === s.id ? ' active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll area */}
      <div className="scroll-area" ref={scrollRef}>

        {/* ── 1. Introduction ── */}
        <div ref={secRef('introduction')} className="subdomain-section" style={{ paddingBottom: 'var(--space-xl)' }}>
          <h2 className="subdomain-title is-visible" style={{ marginTop: 'var(--space-sm)' }} id="introduction">Introduction</h2>
          <p className="domain-description">
            The SDE Skills Competency Framework maps the skills and knowledge needed by Research Technical
            Professionals (RTPs) working with Secure Data Environments. It aligns with established industry
            models — the{' '}
            <a href="https://ukdataservice.ac.uk/help/secure-lab/what-is-the-five-safes-framework/" target="_blank" rel="noreferrer">Five Safes</a>
            {' '}and{' '}
            <a href="https://satre-specification.readthedocs.io/" target="_blank" rel="noreferrer">SATRE</a>
            {' '}— while maintaining its unique focus on the technical skills required in secure research environments.
          </p>
        </div>

        {/* ── 2. Framework Structure ── */}
        <div ref={secRef('framework-structure')} className="subdomain-section" style={{ paddingBottom: 'var(--space-xl)' }}>
          <h2 className="subdomain-title is-visible" style={{ marginTop: 'var(--space-sm)' }} id="framework-structure">Framework Structure</h2>
          <p className="subdomain-description">
            A three-tier hierarchy with three defined proficiency levels at each competency item.
          </p>

          <div className="competency-card is-visible" style={{ display: 'flex', gap: 'var(--space-2xl)', flexWrap: 'wrap', alignItems: 'flex-start' }}>

            {/* Tier hierarchy */}
            <div style={{ flex: '1 1 220px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color, marginBottom: 'var(--space-md)', opacity: 0.7 }}>Hierarchy</p>
              {[
                { n: '1', label: 'Domains',    sub: 'Top-level categorisation'             },
                { n: '2', label: 'Subdomains', sub: 'Mid-level grouping of related skills'  },
                { n: '3', label: 'Items',       sub: 'Specific competencies'                },
              ].map((tier, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)', marginBottom: i < 2 ? 'var(--space-md)' : 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: `color-mix(in srgb, ${color} ${10 + i * 8}%, var(--color-surface))`,
                    border: `1.5px solid color-mix(in srgb, ${color} 40%, transparent)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 700, color,
                  }}>{tier.n}</div>
                  {i < 2 && (
                    <div style={{ position: 'absolute', marginLeft: 13, marginTop: 28, width: 1.5, height: 'var(--space-md)', background: `color-mix(in srgb, ${color} 30%, transparent)` }} />
                  )}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-heading)' }}>{tier.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>{tier.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--color-border)', flexShrink: 0 }} />

            {/* Numbering scheme */}
            <div style={{ flex: '1 1 220px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color, marginBottom: 'var(--space-md)', opacity: 0.7 }}>Numbering Scheme</p>
              {/* Visual code breakdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 'var(--space-md)', fontFamily: 'monospace' }}>
                {[
                  { segment: '2', label: 'Domain' },
                  { segment: '.', label: null },
                  { segment: '3', label: 'Subdomain' },
                  { segment: '.', label: null },
                  { segment: '1', label: 'Item' },
                ].map(({ segment, label }, i) => (
                  label ? (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 32, height: 32, borderRadius: 'var(--radius-sm)',
                        background: `color-mix(in srgb, ${color} 12%, var(--color-surface))`,
                        border: `1.5px solid color-mix(in srgb, ${color} 35%, transparent)`,
                        fontSize: '1rem', fontWeight: 700, color,
                      }}>{segment}</span>
                      <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>{label}</span>
                    </div>
                  ) : (
                    <span key={i} style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 20 }}>{segment}</span>
                  )
                ))}
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Each competency carries a unique reference — the first digit identifies the domain, the second the subdomain within it, and the third the individual item.
              </p>
            </div>

            {/* Divider */}
            <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--color-border)', flexShrink: 0 }} />

            {/* Proficiency levels */}
            <div style={{ flex: '1 1 220px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color, marginBottom: 'var(--space-md)', opacity: 0.7 }}>Proficiency Levels</p>
              {[
                { level: 'Entry',  desc: 'Basic understanding and application'           },
                { level: 'Mid',    desc: 'Independent application and implementation'    },
                { level: 'Senior', desc: 'Strategic oversight and leadership'            },
              ].map(({ level, desc }) => (
                <div key={level} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                  <span className={`level-btn active`} style={{ pointerEvents: 'none', flexShrink: 0 }}>{level}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontStyle: 'italic', paddingTop: '0.15rem' }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3. Competency Domains ── */}
        <div ref={secRef('domains')} className="subdomain-section" style={{ paddingBottom: 'var(--space-xl)' }}>
          <h2 className="subdomain-title is-visible" style={{ marginTop: 'var(--space-sm)' }} id="domains">Competency Domains</h2>
          <p className="subdomain-description">
            Six core domains aligned with both the Five Safes model and SATRE specification.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-md)' }}>
          {DOMAINS.map((d, i) => {
            const c = DOMAIN_COLORS[d.id];
            const satreId = DOMAIN_SATRE_ID[d.id];
            const subdomains = SUBDOMAINS.filter(s => s.domainId === satreId);
            const subIds = new Set(subdomains.map(s => s.id));
            const fiveSafe = FIVE_SAFES_LOOKUP[d.name];

            // Per-pillar: how many components does this domain address
            const pillarHits = SATRE_PILLARS.map(p => ({
              name: p.name,
              addressed: p.components.filter(comp => Object.keys(comp.mappings).some(k => subIds.has(k))).length,
              total: p.components.length,
            }));
            const satreCount = pillarHits.reduce((n, p) => n + p.addressed, 0);

            return (
              <a
                key={d.id}
                href={`${base}${d.id}/`}
                className="competency-card is-visible"
                style={{
                  display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)',
                  textDecoration: 'none', cursor: 'pointer',
                }}
              >
                {/* Number + Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    background: `color-mix(in srgb, ${c} 12%, var(--color-surface))`,
                    border: `1.5px solid color-mix(in srgb, ${c} 35%, transparent)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', fontWeight: 800, color: c,
                  }}>{i + 1}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-heading)', lineHeight: 1.3 }}>{d.name}</div>
                </div>

                {/* Description */}
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontStyle: 'italic', lineHeight: 1.5 }}>{d.desc}</div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 0 }} />

                {/* Five Safes */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-text-muted)' }}>Five Safes</span>
                  <span style={{
                    padding: '1px 8px', borderRadius: 'var(--radius-pill)',
                    background: `color-mix(in srgb, ${c} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${c} 28%, transparent)`,
                    fontSize: '0.68rem', fontWeight: 600, color: c,
                    fontStyle: fiveSafe === 'Spans all five' ? 'italic' : 'normal',
                  }}>{fiveSafe}</span>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 0 }} />

                {/* SATRE pillar table */}
                <p style={{ margin: '0 0 4px', fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-text-muted)' }}>SATRE Coverage</p>
                <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: `1px solid color-mix(in srgb, ${c} 15%, transparent)` }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.68rem' }}>
                    <tbody>
                      {pillarHits.map((p, pi) => (
                        <tr key={pi} style={{ borderTop: pi > 0 ? `1px solid color-mix(in srgb, ${c} 10%, transparent)` : undefined }}>
                          <td style={{ padding: '3px 7px', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>{p.name}</td>
                          <td title={`${p.addressed} of ${p.total} SATRE components in this pillar are addressed by at least one subdomain in this domain`} style={{ padding: '3px 7px', textAlign: 'right', fontWeight: 700, color: p.addressed > 0 ? c : 'var(--color-text-muted)', whiteSpace: 'nowrap', cursor: 'help' }}>
                            {p.addressed} / {p.total}
                          </td>
                        </tr>
                      ))}
                      <tr style={{ borderTop: `1px solid color-mix(in srgb, ${c} 25%, transparent)`, background: `color-mix(in srgb, ${c} 6%, transparent)` }}>
                        <td style={{ padding: '3px 7px', fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>Total</td>
                        <td title={`${satreCount} of ${TOTAL_SATRE_COMPONENTS} SATRE components in total are addressed by at least one subdomain in this domain`} style={{ padding: '3px 7px', textAlign: 'right', fontWeight: 800, color: c, cursor: 'help' }}>{satreCount} / {TOTAL_SATRE_COMPONENTS}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 0 }} />

                {/* Subdomain chips */}
                <p style={{ margin: '0 0 4px', fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-text-muted)' }}>Subdomains</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {subdomains.map(sub => (
                    <span key={sub.id} style={{
                      padding: '2px 8px', borderRadius: 'var(--radius-pill)',
                      background: `color-mix(in srgb, ${c} 9%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${c} 22%, transparent)`,
                      fontSize: '0.65rem', color: c, fontWeight: 500,
                    }}>{sub.name}</span>
                  ))}
                </div>
              </a>
            );
          })}
          </div>
        </div>

        {/* ── 4. Standards Alignment ── */}
        <div ref={secRef('standards-alignment')} className="subdomain-section" style={{ paddingBottom: 'var(--space-xl)' }}>
          <h2 className="subdomain-title is-visible" style={{ marginTop: 'var(--space-sm)' }} id="standards-alignment">Standards Alignment</h2>
          <p className="subdomain-description">
            How each domain maps to the Five Safes model and SATRE specification.
            <a href={`${base}cf-framework-mapping/`} style={{ color, marginLeft: '0.5rem', fontSize: '0.85rem' }}>Full mapping detail →</a>
          </p>

          {/* Toggle tabs */}
          <div style={{ display: 'flex', gap: 'var(--space-xs)', marginBottom: 'var(--space-lg)' }}>
            {[['five-safes', 'Five Safes'], ['satre', 'SATRE']].map(([id, label]) => (
              <button
                key={id}
                className={`tab subdomain-tab${alignTab === id ? ' active' : ''}`}
                onClick={() => setAlignTab(id)}
                style={{ fontSize: '0.8rem' }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Five Safes table */}
          {alignTab === 'five-safes' && (
            <div className="competency-card is-visible" style={{ padding: 0, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: `color-mix(in srgb, ${color} 6%, var(--color-surface))` }}>
                    <th style={thStyle}>Framework Domain</th>
                    <th style={thStyle}>Five Safes Principle</th>
                  </tr>
                </thead>
                <tbody>
                  {FIVE_SAFES.map((row, i) => (
                    <tr key={i} style={{ borderTop: '1px solid var(--color-border)' }}>
                      <td style={tdStyle}>{row.domain}</td>
                      <td style={{ ...tdStyle, color, fontWeight: 600, fontStyle: row.principle === 'Spans all five' ? 'italic' : 'normal' }}>{row.principle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SATRE summary matrix */}
          {alignTab === 'satre' && (
            <div className="competency-card is-visible" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="pill-scroll">
                <table style={{ borderCollapse: 'collapse', fontSize: 'var(--text-small)', width: '100%' }}>
                  <thead>
                    <tr style={{ background: `color-mix(in srgb, ${color} 6%, var(--color-surface))`, borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ ...thStyle, minWidth: 260, textAlign: 'left' }}>SATRE Component</th>
                      {SATRE_DOMAINS.map(d => (
                        <th key={d.id} title={d.name} style={{
                          ...thStyle,
                          textAlign: 'center',
                          minWidth: 62,
                          color: d.color,
                          borderLeft: '1px solid var(--color-border)',
                          fontSize: '0.6rem',
                          lineHeight: 1.3,
                          cursor: 'help',
                        }}>
                          {d.id.toUpperCase()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{satreSummaryRows}</tbody>
                </table>
              </div>
              {/* Legend */}
              <div style={{ padding: 'var(--space-sm) var(--space-lg)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 'var(--space-lg)', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Subdomains addressing component:</span>
                {[['1', 'low'], ['2', 'medium'], ['3+', 'high']].map(([label, level]) => (
                  <span key={level} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 22, height: 22, borderRadius: 'var(--radius-sm)',
                      background: level === 'high' ? `color-mix(in srgb, ${color} 22%, transparent)` : level === 'medium' ? `color-mix(in srgb, ${color} 14%, transparent)` : `color-mix(in srgb, ${color} 8%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${color} ${level === 'high' ? 45 : level === 'medium' ? 30 : 18}%, transparent)`,
                      color, fontSize: '0.65rem', fontWeight: 700, opacity: level === 'low' ? 0.7 : 1,
                    }}>{label}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>{level}</span>
                  </span>
                ))}
                <a href={`${base}satre-mapping/`} style={{ marginLeft: 'auto', fontSize: '0.8rem', color }}>Full competency detail →</a>
              </div>
            </div>
          )}
        </div>

        {/* ── 5. Applications & Enhanced Areas ── */}
        <div ref={secRef('applications')} className="subdomain-section" style={{ paddingBottom: 'var(--space-xl)' }}>
          <h2 className="subdomain-title is-visible" style={{ marginTop: 'var(--space-sm)' }} id="applications">Applications & Enhanced Areas</h2>
          <p className="subdomain-description">
            How the framework is used, and specialist areas it incorporates.
          </p>

          {/* Merged Applications + Enhanced Areas grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)' }}>
            {[...APPLICATIONS, ...ENHANCED_AREAS].map(({ label, desc, icon, type }, i) => {
              const isEnhanced = type === 'Enhanced Area';
              return (
                <div key={i} className="competency-card is-visible" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  {/* Icon + type pill row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 'var(--radius-md)', flexShrink: 0,
                      background: `color-mix(in srgb, ${color} 8%, var(--color-surface))`,
                      border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {icon(color)}
                    </div>
                    <span style={{
                      padding: '2px 8px', borderRadius: 'var(--radius-pill)',
                      background: isEnhanced
                        ? `color-mix(in srgb, ${color} 12%, transparent)`
                        : `color-mix(in srgb, ${color} 6%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${color} ${isEnhanced ? 30 : 18}%, transparent)`,
                      fontSize: '0.6rem', fontWeight: 700, color,
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                      opacity: isEnhanced ? 1 : 0.75,
                      whiteSpace: 'nowrap', alignSelf: 'flex-start',
                    }}>{type}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-heading)', lineHeight: 1.3 }}>{label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>{desc}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

const thStyle = {
  padding: 'var(--space-sm) var(--space-lg)',
  textAlign: 'left',
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)',
};

const tdStyle = {
  padding: 'var(--space-sm) var(--space-lg)',
  fontSize: '0.875rem',
  color: 'var(--color-text)',
  verticalAlign: 'top',
};
