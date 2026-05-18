import { useState, useCallback } from 'react';
import { SATRE_PILLARS, SUBDOMAINS, SUBDOMAIN_INDEX, DOMAINS } from '../data/satreMapping.js';

const TOTAL_COLS = 1 + SUBDOMAINS.length; // component name col + 21 subdomain cols

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
  const entries = Object.entries(component.mappings)
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
          SATRE Requirement
        </p>
        <p style={{ margin: 0, fontSize: 'var(--text-small)', color: 'var(--color-text)', lineHeight: 1.75, fontStyle: 'italic' }}>
          {component.requirement}
        </p>
      </div>

      {/* Subdomain cards */}
      <div>
        <p style={{ margin: '0 0 var(--space-xs)', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-text-muted)' }}>
          Addressed by — expand a subdomain to see contributing competencies
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
        </div>
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
            const comps = component.mappings[sub.id] ?? [];
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
      <p style={{ margin: 0, fontSize: 'var(--text-small)', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
        Expand a <strong>pillar</strong> to see its components, expand a <strong>component</strong> to read the SATRE requirement and see which subdomains address it, then expand a <strong>subdomain</strong> to see the contributing competencies.
      </p>

      <div className="pill-scroll">
        <table style={{ borderCollapse: 'collapse', fontSize: 'var(--text-small)' }}>
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
