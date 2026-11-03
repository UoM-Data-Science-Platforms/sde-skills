import { useState, useCallback } from 'react';
import { SATRE_PILLARS, SUBDOMAINS, SUBDOMAIN_INDEX, DOMAINS } from '../data/satreMapping.js';
import { LEGACY_COMPONENTS, COMPETENCIES, SATRE_RELATIONSHIPS } from '../data/satreMapping.js';
import SatreSourceNotice from './SatreSourceNotice.jsx';

const TOTAL_COLS = 1 + SUBDOMAINS.length;

function setToggle(prev, key) {
  const next = new Set(prev);
  next.has(key) ? next.delete(key) : next.add(key);
  return next;
}

// ── Tooltip (hover on X cells) ───────────────────────────────────────────────

function Tooltip({ cell }) {
  if (!cell) return null;
  const sub = SUBDOMAINS.find(s => s.id === cell.subdomainId);
  return (
    <div style={{
      position: 'fixed',
      left: cell.x + 12,
      top: cell.y - 8,
      zIndex: 1000,
      pointerEvents: 'none',
      maxWidth: 280,
      background: 'var(--color-surface)',
      border: `1px solid color-mix(in srgb, ${sub?.color ?? 'var(--color-border)'} 40%, transparent)`,
      borderRadius: 'var(--radius-md)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
      padding: 'var(--space-sm)',
    }}>
      <p style={{ margin: '0 0 4px', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: sub?.color }}>
        {sub?.name}
      </p>
      <ul style={{ margin: 0, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {cell.competencies.map((c, i) => (
          <li key={i} style={{ fontSize: '0.8rem', color: 'var(--color-text)', lineHeight: 1.5 }}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

// ── Subdomain card (level 4 — expand to competencies) ────────────────────────

function SubdomainCard({ subdomainId, competencies, expanded, onToggle }) {
  const sub = SUBDOMAINS.find(s => s.id === subdomainId);
  if (!sub) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: expanded
            ? `color-mix(in srgb, ${sub.color} 18%, transparent)`
            : `color-mix(in srgb, ${sub.color} 9%, transparent)`,
          border: `1px solid color-mix(in srgb, ${sub.color} 35%, transparent)`,
          borderRadius: 'var(--radius-sm)',
          padding: '5px 10px',
          cursor: 'pointer',
          color: sub.color,
          fontSize: '0.75rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          transition: 'background var(--transition-fast)',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: '0.55rem', opacity: 0.8 }}>{expanded ? '▼' : '▶'}</span>
        <span>{sub.name}</span>
        <span style={{
          background: `color-mix(in srgb, ${sub.color} 22%, transparent)`,
          borderRadius: 'var(--radius-pill)',
          padding: '1px 6px',
          fontSize: '0.6rem',
          fontWeight: 700,
          marginLeft: 2,
        }}>
          {competencies.length}
        </span>
      </button>
      {expanded && (
        <ul style={{ margin: '0 0 4px 10px', paddingLeft: 14, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {competencies.map((c, i) => (
            <li key={i} style={{ fontSize: '0.8rem', color: 'var(--color-text)', lineHeight: 1.55 }}>{c}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Component detail panel (level 3) ────────────────────────────────────────

function ComponentDetail({ component, openSubs, onToggleSub }) {
  const relationships = SATRE_RELATIONSHIPS.filter(r => r.capability_id === component.id && r.review.status !== 'rejected');
  const flatMappings = {};
  if (component.mappings) {
    Object.values(component.mappings).forEach(domainMap => {
      Object.assign(flatMappings, domainMap);
    });
  }

  const entries = Object.entries(flatMappings)
    .sort(([a], [b]) => (SUBDOMAIN_INDEX[a] ?? 99) - (SUBDOMAIN_INDEX[b] ?? 99));

  return (
    <div style={{
      background: `color-mix(in srgb, var(--color-text) 3%, var(--color-surface))`,
      borderLeft: '3px solid color-mix(in srgb, var(--color-nhs-blue) 35%, transparent)',
      borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
      padding: 'var(--space-sm) var(--space-md)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
    }}>
      {/* Requirement text */}
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-text-muted)' }}>
          Editorial summary
        </p>
        <p style={{ margin: 0, fontSize: 'var(--text-small)', color: 'var(--color-text)', lineHeight: 1.75, fontStyle: 'italic' }}>
          {component.editorial_summary || 'No editorial summary has been added.'}
        </p>
        <h4>Official SATRE requirements — mapping review pending</h4>
        <p>Conditional applicability is retained in the original statement and guidance.</p>
        <ul>
          {component.requirements.map(requirement => (
            <li key={requirement.id} style={{ marginBottom: 'var(--space-sm)' }}>
              <strong>{requirement.id} — {requirement.importance}</strong>: {requirement.statement}
              <details><summary>Official guidance and applicability</summary>
                <p style={{ whiteSpace: 'pre-line' }}>{requirement.guidance}</p>
                <p>Scope: {requirement.applicability.scope}. Applicability assessment: {requirement.applicability.assessment}.
                  {' '}Mapping review: {requirement.mapping_review_status}.</p>
              </details>
            </li>
          ))}
        </ul>
      </div>

      {/* Subdomain cards */}
      <div>
        <p style={{ margin: '0 0 var(--space-xs)', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-text-muted)' }}>
          Candidate competencies — pending relationship review
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)', alignItems: 'flex-start' }}>
          {entries.map(([subId, comps]) => (
            <SubdomainCard
              key={subId}
              subdomainId={subId}
              competencies={comps}
              expanded={openSubs.has(`${component.id}:${subId}`)}
              onToggle={() => onToggleSub(`${component.id}:${subId}`)}
            />
          ))}
          {entries.length === 0 && <p>Awaiting relationship review; no confirmed framework-gap assessment.</p>}
        </div>
        {relationships.length > 0 && <details>
          <summary>Canonical relationship records and review state</summary>
          <ul>{relationships.map(r => <li key={r.id}>
            <strong>{COMPETENCIES[r.competency_id].name}</strong> ({r.competency_id})
            {' '}— {SUBDOMAINS.find(s => s.id === r.subdomain_id).name}; review: {r.review.status}.
            {' '}Requirements: {r.requirement_ids.length ? r.requirement_ids.join(', ') : 'awaiting review'}.
            {' '}Contribution: {r.contribution || 'not assessed'}.
            {' '}Rationale: {r.rationale || 'not yet reviewed'}.
            {r.review.reviewer && <> Reviewer: {r.review.reviewer}, {r.review.reviewed_on}.</>}
          </li>)}</ul>
        </details>}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function SatreMappingMatrix() {
  const [openPillars,    setOpenPillars]    = useState(new Set());
  const [openComponents, setOpenComponents] = useState(new Set());
  const [openSubs,       setOpenSubs]       = useState(new Set());
  const [hovered,        setHovered]        = useState(null);

  const togglePillar    = useCallback(id  => setOpenPillars(p    => setToggle(p, id)),  []);
  const toggleComponent = useCallback(id  => setOpenComponents(p => setToggle(p, id)),  []);
  const toggleSub       = useCallback(key => setOpenSubs(p       => setToggle(p, key)), []);

  const thBase = {
    padding: '4px 6px',
    fontSize: '0.65rem',
    fontWeight: 600,
    textAlign: 'center',
    whiteSpace: 'nowrap',
  };

  // Build tbody rows as a flat array to avoid invalid DOM nesting from fragments
  const rows = [];

  SATRE_PILLARS.forEach(pillar => {
    const isPillarOpen = openPillars.has(pillar.id);

    // ── Pillar row ──
    rows.push(
      <tr
        key={`pillar-${pillar.id}`}
        onClick={() => togglePillar(pillar.id)}
        style={{
          cursor: 'pointer',
          borderTop: '2px solid var(--color-border)',
          background: `color-mix(in srgb, var(--color-text) 5%, transparent)`,
          transition: 'background var(--transition-fast)',
        }}
      >
        <td colSpan={TOTAL_COLS} style={{ padding: '11px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', minWidth: 10 }}>
              {isPillarOpen ? '▼' : '▶'}
            </span>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-heading)' }}>
              {pillar.name}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>
              {pillar.components.length} components
            </span>
          </div>
          {pillar.caveat && <p style={{ whiteSpace: 'normal', margin: '8px 0 0' }}>{pillar.caveat}</p>}
        </td>
      </tr>
    );

    if (!isPillarOpen) return;

    pillar.components.forEach(component => {
      const isCompOpen = openComponents.has(component.id);

      // ── Component row ──
      rows.push(
        <tr
          key={`comp-${component.id}`}
          style={{ borderBottom: isCompOpen ? 'none' : '1px solid var(--color-border)' }}
        >
          {/* Name + toggle */}
          <td style={{ padding: '5px 12px 5px 28px', whiteSpace: 'nowrap' }}>
            <button
              onClick={() => toggleComponent(component.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 7,
                color: 'var(--color-text)', fontSize: 'var(--text-small)',
                fontWeight: 500, padding: 0, textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)', minWidth: 10 }}>
                {isCompOpen ? '▼' : '▶'}
              </span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem', fontWeight: 400 }}>
                {component.id}
              </span>
              <span>{component.name}</span>
            </button>
          </td>

          {/* X cells */}
          {SUBDOMAINS.map((sub, si) => {
            let comps = [];
            if (component.mappings && component.mappings[sub.domainId]) {
              comps = component.mappings[sub.domainId][sub.id] ?? [];
            }
            const filled = comps.length > 0;
            const borderLeft = si > 0 && SUBDOMAINS[si - 1].domainId !== sub.domainId
              ? '2px solid var(--color-surface)'
              : undefined;

            return (
              <td key={sub.id} style={{ padding: 3, textAlign: 'center', borderLeft }}>
                <div
                  onMouseEnter={filled ? e => {
                    const r = e.currentTarget.getBoundingClientRect();
                    setHovered({ subdomainId: sub.id, competencies: comps, x: r.right, y: r.top + r.height / 2 });
                  } : undefined}
                  onMouseLeave={filled ? () => setHovered(null) : undefined}
                  style={{
                    width: 26, height: 26,
                    margin: '0 auto',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: filled ? 'help' : 'default',
                    background: filled
                      ? `color-mix(in srgb, ${sub.color} 17%, transparent)`
                      : `color-mix(in srgb, var(--color-text) 4%, transparent)`,
                    border: filled
                      ? `1px solid color-mix(in srgb, ${sub.color} 40%, transparent)`
                      : '1px solid var(--color-border)',
                    transition: 'background var(--transition-fast)',
                  }}
                >
                  {filled && (
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: sub.color, lineHeight: 1 }}>✕</span>
                  )}
                </div>
              </td>
            );
          })}
        </tr>
      );

      // ── Detail row (level 3 + 4) ──
      if (isCompOpen) {
        rows.push(
          <tr key={`detail-${component.id}`} style={{ borderBottom: '1px solid var(--color-border)' }}>
            <td colSpan={TOTAL_COLS} style={{ padding: '0 12px 12px 28px' }}>
              <ComponentDetail
                component={component}
                openSubs={openSubs}
                onToggleSub={toggleSub}
              />
            </td>
          </tr>
        );
      }
    });
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      <SatreSourceNotice />
      <details>
        <summary>Previous mapping records and migration candidates (unverified)</summary>
        <p>These old identifiers were editorial groupings, not reliable official requirement identifiers. Topic candidates preserve migration history; they do not validate alignment.</p>
        {LEGACY_COMPONENTS.map(component => <section key={component.id}>
          <h3>Previous {component.id}: {component.name}</h3>
          <p>Editorial summary: {component.editorial_summary}</p>
          <p>Candidate official capabilities: {component.candidate_capability_ids.join(', ')}. {component.migration_note}</p>
          <ul>{Object.entries(component.mappings).flatMap(([domain, subs]) => Object.entries(subs).map(([sub, competencies]) =>
            <li key={`${domain}/${sub}`}>{DOMAINS.find(d => d.id === domain).name} / {SUBDOMAINS.find(s => s.id === sub).name}: {competencies.map(id => COMPETENCIES[id].name).join(', ')}</li>))}</ul>
        </section>)}
      </details>
      <p style={{ margin: 0, fontSize: 'var(--text-small)', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
        Expand a <strong>pillar</strong> to see its components, expand a <strong>component</strong> to read the official SATRE requirements and inspect unreviewed competency candidates, then expand a <strong>subdomain</strong> to see the contributing competencies.
      </p>

      <div className="table-responsive pill-scroll">
        <table className="table table-sm mb-0" style={{ fontSize: 'var(--text-small)' }}>
          <thead>
            {/* Row 1 — domain group headers */}
            <tr>
              <th style={{ ...thBase, minWidth: 300, textAlign: 'left', borderBottom: '2px solid var(--color-border)', paddingBottom: 8 }} />
              {DOMAINS.map(d => (
                <th
                  key={d.id}
                  colSpan={d.span}
                  style={{
                    ...thBase,
                    color: d.color,
                    background: `color-mix(in srgb, ${d.color} 8%, transparent)`,
                    borderBottom: `2px solid color-mix(in srgb, ${d.color} 35%, transparent)`,
                    borderLeft: '2px solid var(--color-surface)',
                    paddingTop: 6, paddingBottom: 6,
                    fontSize: '0.58rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {d.name}
                </th>
              ))}
            </tr>

            {/* Row 2 — subdomain column headers */}
            <tr>
              <th style={{ ...thBase, textAlign: 'left', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)', paddingBottom: 8 }}>
                SATRE Component
              </th>
              {SUBDOMAINS.map((s, i) => {
                const prevDomain = i > 0 ? SUBDOMAINS[i - 1].domainId : null;
                return (
                  <th
                    key={s.id}
                    style={{
                      ...thBase,
                      verticalAlign: 'bottom',
                      minWidth: 34,
                      paddingBottom: 6,
                      borderBottom: `2px solid color-mix(in srgb, ${s.color} 35%, transparent)`,
                      borderLeft: prevDomain && prevDomain !== s.domainId ? '2px solid var(--color-surface)' : undefined,
                    }}
                  >
                    <div style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      color: s.color,
                      maxHeight: 110,
                      overflow: 'hidden',
                      fontSize: '0.58rem',
                      fontWeight: 700,
                    }}>
                      {s.name}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </table>
      </div>

      <Tooltip cell={hovered} />
    </div>
  );
}
