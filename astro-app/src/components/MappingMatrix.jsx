import { useState } from 'react';
import SatreMappingMatrix from './SatreMappingMatrix.jsx';

const DOMAINS = [
  { id: 'access-identity', short: 'Access & Identity', color: 'var(--color-deep-blue)' },
  { id: 'data-management', short: 'Data Management', color: 'var(--color-purple)' },
  { id: 'governance-compliance', short: 'Governance', color: 'var(--color-nhs-blue)' },
  { id: 'outputs-disclosure-control', short: 'Outputs', color: 'var(--color-deep-blue)' },
  { id: 'projects-operations', short: 'Projects & Ops', color: 'var(--color-purple)' },
  { id: 'technology-engineering', short: 'Technology', color: 'var(--color-nhs-blue)' },
];

const FRAMEWORK_COLORS = {
  'Five Safes': 'var(--color-purple)',
  'SATRE': 'var(--color-nhs-blue)',
  'Cross-Cutting': 'var(--color-deep-blue)',
};

const ALL_DOMAINS = DOMAINS.map(d => d.id);

const STANDARDS = [
  { id: 'safe-data', framework: 'Five Safes', short: 'Safe Data', name: 'Safe Data', tagline: 'Data is treated to protect any confidentiality concerns.', domains: ['data-management'], competencies: ['Data Classification & Sensitivity', 'Data Lineage & Provenance', 'Data Integrity', 'Data Quality Management', 'Data Storage & Database Management', 'Encryption Standards & Implementation'] },
  { id: 'safe-projects', framework: 'Five Safes', short: 'Safe Projects', name: 'Safe Projects', tagline: 'Research projects are approved by data owners for the public good.', domains: ['projects-operations', 'governance-compliance'], competencies: ['SDE Project Planning', 'Research Project Facilitation', 'Research Ethics Compliance', 'Ethics & Research Approval Systems', 'Service Level Management', 'Researcher Training & Support'] },
  { id: 'safe-people', framework: 'Five Safes', short: 'Safe People', name: 'Safe People', tagline: 'Researchers are trained and authorised to use data safely.', domains: ['access-identity', 'projects-operations'], competencies: ['Authentication Systems', 'User Provisioning & Lifecycle', 'Federated Identity Management', 'Role-Based Access Control', 'Researcher Onboarding', 'Researcher Training & Support'] },
  { id: 'safe-settings', framework: 'Five Safes', short: 'Safe Settings', name: 'Safe Settings', tagline: 'A SecureLab environment prevents unauthorised use.', domains: ['technology-engineering', 'access-identity'], competencies: ['Secure Environment Design', 'Network Architecture', 'Cloud Infrastructure Management', 'Containerisation & Orchestration', 'Configuration Management', 'Secure Research Workspaces'] },
  { id: 'safe-outputs', framework: 'Five Safes', short: 'Safe Outputs', name: 'Safe Outputs', tagline: 'Screened and approved outputs that are non-disclosive.', domains: ['outputs-disclosure-control'], competencies: ['Output Review Processes', 'Disclosure Risk Assessment', 'Automated Disclosure Control', 'Data Airlocks', 'Accidental Disclosure Management', 'AI Artefact and Generated-output Release Controls'] },
  { id: 'satre-ig', framework: 'SATRE', short: '1. Info Governance', name: '1. Information Governance', tagline: null, domains: ['governance-compliance', 'projects-operations', 'access-identity'], competencies: ['Information Governance', 'Data Protection Compliance', 'Compliance Monitoring & Reporting', 'Certification & Accreditation', 'Research Ethics Compliance', 'Researcher Onboarding', 'Researcher Training & Support'] },
  { id: 'satre-tech', framework: 'SATRE', short: '2. Computing & IS', name: '2. Computing Technology and Information Security', tagline: null, domains: ['technology-engineering', 'access-identity', 'governance-compliance', 'projects-operations'], competencies: ['Secure Environment Design', 'Cloud Infrastructure Management', 'Network Architecture', 'Configuration Management', 'Vulnerability & Patch Management', 'Encryption & Key Management', 'Secure Research Workspaces'] },
  { id: 'satre-data', framework: 'SATRE', short: '3. Data Mgmt', name: '3. Data Management', tagline: null, domains: ['data-management', 'access-identity', 'outputs-disclosure-control'], competencies: ['Data Classification & Sensitivity', 'Data Cataloguing & Discovery', 'Data Lineage & Provenance', 'Data Retention & Disposal', 'Authentication Systems', 'Role-Based Access Control', 'Output Review Processes', 'Disclosure Risk Assessment'] },
  { id: 'satre-support', framework: 'SATRE', short: '4. Supporting', name: '4. Supporting Capabilities', tagline: null, domains: ['projects-operations', 'governance-compliance', 'technology-engineering'], competencies: ['SDE Project Planning', 'Resource & Cost Management', 'Procurement & Vendor Management', 'Service Level Management', 'Incident & Problem Management', 'Documentation & Knowledge Management'] },
  { id: 'satre-fed', framework: 'SATRE', short: '5. Federation', name: '5. Federation', tagline: null, domains: ALL_DOMAINS, competencies: ['Federated Identity Management', 'Attribute-Based Access Control', 'Encryption & Key Management', 'Data Cataloguing & Discovery', 'Data Models & Standardisation', 'Output Review Processes', 'Compliance Monitoring & Reporting'] },
  { id: 'gov-comp', framework: 'Cross-Cutting', short: 'Governance', name: 'Governance & Compliance', tagline: 'Spans across all Five Safes principles and SATRE pillars.', domains: ALL_DOMAINS, competencies: ['Information Governance', 'Data Protection Compliance', 'Healthcare Standards Compliance', 'Healthcare Data Security Frameworks', 'Research Ethics Compliance', 'Security Controls Implementation', 'Audit Trail Implementation', 'Compliance Monitoring & Reporting'] },
  { id: 'collab-comm', framework: 'Cross-Cutting', short: 'Collaboration', name: 'Collaboration & Communication', tagline: 'Key to effective implementation of all domains.', domains: ALL_DOMAINS, competencies: ['Documentation & Knowledge Management', 'Researcher Training & Support', 'Continuous Improvement', 'Research Project Facilitation', 'Community Engagement & Networking', 'Code Documentation & Reusability'] },
];

const FRAMEWORKS = ['Five Safes', 'SATRE', 'Cross-Cutting'];

const FRAMEWORK_DESCRIPTIONS = {
  'Five Safes': 'The Five Safes framework is a set of principles enabling safe research access to sensitive data. Our competency domains are designed to align with and support these principles.',
  'SATRE': 'The Standard Architecture for Trusted Research Environments (SATRE) specification provides a comprehensive high-level architecture for research organisations handling sensitive data safely. The SDE RTP Competency Framework aligns with these components.',
  'Cross-Cutting': 'Some competencies span multiple Five Safes principles or SATRE components.',
};

// ── sub-components ─────────────────────────────────────────────────────────

function MatrixCell({ filled, selected, color, crossCutting, onClick }) {
  return (
    <div
      onClick={filled ? onClick : undefined}
      style={{
        width: 36,
        height: 36,
        borderRadius: 'var(--radius-sm)',
        margin: '0 auto',
        cursor: filled ? 'pointer' : 'default',
        transition: 'all var(--transition-fast)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: selected
          ? color
          : filled
            ? `color-mix(in srgb, ${color} ${crossCutting ? 15 : 25}%, transparent)`
            : `color-mix(in srgb, var(--color-text) 4%, transparent)`,
        border: filled
          ? `1px solid color-mix(in srgb, ${color} ${selected ? 80 : 40}%, transparent)`
          : '1px solid var(--color-border)',
      }}
    >
      {filled && (
        <div style={{
          width: crossCutting ? 6 : 10,
          height: crossCutting ? 6 : 10,
          borderRadius: crossCutting ? '2px' : '50%',
          background: selected ? 'white' : color,
          opacity: selected ? 1 : 0.9,
        }} />
      )}
    </div>
  );
}

function FrameworkBadge({ framework }) {
  return (
    <span style={{
      fontSize: '0.6rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: FRAMEWORK_COLORS[framework],
      background: `color-mix(in srgb, ${FRAMEWORK_COLORS[framework]} 12%, transparent)`,
      padding: '2px 6px',
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
    }}>
      {framework}
    </span>
  );
}

function DetailPanel({ standard, domain, onClose }) {
  const color = domain?.color ?? FRAMEWORK_COLORS[standard.framework];
  return (
    <div style={{
      borderRadius: 'var(--radius-md)',
      border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
      background: `color-mix(in srgb, ${color} 5%, var(--color-surface))`,
      padding: 'var(--space-md)',
      animation: 'panelIn 0.15s ease',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap', alignItems: 'center' }}>
            <FrameworkBadge framework={standard.framework} />
            {domain && (
              <span style={{
                fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                color: domain.color, background: `color-mix(in srgb, ${domain.color} 12%, transparent)`,
                padding: '2px 6px', borderRadius: 'var(--radius-pill)',
              }}>
                {domain.short}
              </span>
            )}
          </div>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-heading)', margin: 0 }}>
            {standard.name}
          </h3>
          {standard.tagline && (
            <p style={{ fontSize: 'var(--text-small)', color: 'var(--color-text-muted)', fontStyle: 'italic', margin: 0 }}>
              "{standard.tagline}"
            </p>
          )}
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '1.2rem', lineHeight: 1, padding: '4px', flexShrink: 0 }}>
          ×
        </button>
      </div>
      <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', margin: '0 0 var(--space-xs)' }}>
        Key Competencies
      </p>
      <ul style={{ margin: 0, paddingLeft: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2xs)' }}>
        {standard.competencies.map((c, i) => (
          <li key={i} style={{ fontSize: 'var(--text-small)', color: 'var(--color-text)', lineHeight: 1.6 }}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

// ── views ───────────────────────────────────────────────────────────────────

const thStyle = {
  padding: 'var(--space-xs) var(--space-sm)',
  fontWeight: 500,
  fontSize: 'var(--text-small)',
  color: 'var(--color-text-muted)',
  whiteSpace: 'nowrap',
};

function ByStandardView({ standards, domains, selected, onCellClick }) {
  const frameworks = FRAMEWORKS.filter(f => standards.some(s => s.framework === f));
  return (
    <table className="table table-sm mb-0">
      <thead>
        <tr>
          <th style={{ ...thStyle, textAlign: 'left', minWidth: 160 }}>Standard</th>
          {domains.map(d => (
            <th key={d.id} style={{ ...thStyle, textAlign: 'center', color: d.color, fontSize: '0.7rem', fontWeight: 700, minWidth: 70 }}>
              {d.short}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {frameworks.map(fw => (
          <>
            <tr key={`hdr-${fw}`}>
              <td colSpan={domains.length + 1} style={{
                padding: 'var(--space-xs) var(--space-sm)',
                fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                color: FRAMEWORK_COLORS[fw],
                background: `color-mix(in srgb, ${FRAMEWORK_COLORS[fw]} 8%, transparent)`,
                borderTop: `2px solid color-mix(in srgb, ${FRAMEWORK_COLORS[fw]} 25%, transparent)`,
              }}>
                {fw}
              </td>
            </tr>
            {standards.filter(s => s.framework === fw).map(std => (
              <tr key={std.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--space-xs) var(--space-sm)', fontSize: 'var(--text-small)', fontWeight: 500, color: 'var(--color-text)' }}>
                  {std.short}
                </td>
                {domains.map(domain => {
                  const filled = std.domains.includes(domain.id);
                  const isSelected = selected?.standard?.id === std.id && selected?.domain?.id === domain.id;
                  return (
                    <td key={domain.id} style={{ padding: 4, textAlign: 'center' }}>
                      <MatrixCell
                        filled={filled}
                        selected={isSelected}
                        color={domain.color}
                        crossCutting={std.framework === 'Cross-Cutting'}
                        onClick={() => onCellClick(std, domain)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
}

function ByDomainView({ standards, domains, selected, onCellClick }) {
  return (
    <table className="table table-sm mb-0">
      <thead>
        <tr>
          <th style={{ ...thStyle, textAlign: 'left', minWidth: 140 }}>Domain</th>
          {standards.map(s => (
            <th key={s.id} style={{ padding: '4px', textAlign: 'center', minWidth: 52, verticalAlign: 'bottom' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <span style={{
                  fontSize: '0.62rem', fontWeight: 600, color: FRAMEWORK_COLORS[s.framework],
                  writingMode: 'vertical-rl', transform: 'rotate(180deg)',
                  maxHeight: 90, overflow: 'hidden', whiteSpace: 'nowrap',
                }}>
                  {s.short}
                </span>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: FRAMEWORK_COLORS[s.framework], flexShrink: 0 }} />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {domains.map(domain => (
          <tr key={domain.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
            <td style={{ padding: 'var(--space-xs) var(--space-sm)', fontSize: 'var(--text-small)', fontWeight: 700, color: domain.color }}>
              {domain.short}
            </td>
            {standards.map(std => {
              const filled = std.domains.includes(domain.id);
              const isSelected = selected?.standard?.id === std.id && selected?.domain?.id === domain.id;
              return (
                <td key={std.id} style={{ padding: 4, textAlign: 'center' }}>
                  <MatrixCell
                    filled={filled}
                    selected={isSelected}
                    color={domain.color}
                    crossCutting={std.framework === 'Cross-Cutting'}
                    onClick={() => onCellClick(std, domain)}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── main export ─────────────────────────────────────────────────────────────

export default function MappingMatrix() {
  const [perspective, setPerspective] = useState('by-standard');
  const [filter, setFilter] = useState('Five Safes');
  const [selected, setSelected] = useState(null);

  const filteredStandards = STANDARDS.filter(s => s.framework === filter);

  const handleCellClick = (standard, domain) => {
    const isSame = selected?.standard?.id === standard.id && selected?.domain?.id === domain.id;
    setSelected(isSame ? null : { standard, domain });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', height: '100%' }}>

      {/* Controls */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        {/* Framework filter tabs */}
        <ul className="nav nav-tabs sticky-nav-top mb-0" role="tablist">
          {FRAMEWORKS.map(f => (
            <li key={f} className="nav-item" role="presentation">
              <button
                className={`nav-link tab subdomain-tab${filter === f ? ' active' : ''}`}
                style={{ '--color-domain': FRAMEWORK_COLORS[f] ?? 'var(--color-domain)' }}
                role="tab"
                onClick={() => { setFilter(f); setSelected(null); }}
              >
                {f}
              </button>
            </li>
          ))}
        </ul>

        {/* Perspective toggle — hidden for SATRE view */}
        {filter !== 'SATRE' && (
          <div className="btn-group" role="group" aria-label="View perspective">
            {[['by-standard', 'By Standard'], ['by-domain', 'By Domain']].map(([val, label]) => (
              <button
                key={val}
                className={`btn btn-sm${perspective === val ? ' btn-primary' : ' btn-outline-secondary'}`}
                onClick={() => { setPerspective(val); setSelected(null); }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Framework description */}
      {filter !== 'all' && FRAMEWORK_DESCRIPTIONS[filter] && (
        <p style={{
          fontSize: '0.9375rem',
          lineHeight: 1.7,
          color: 'var(--color-text-muted)',
          fontStyle: 'italic',
          margin: 0,
          paddingLeft: 'var(--space-sm)',
          borderLeft: `3px solid color-mix(in srgb, ${FRAMEWORK_COLORS[filter]} 40%, transparent)`,
        }}>
          {FRAMEWORK_DESCRIPTIONS[filter]}
        </p>
      )}

      {/* Matrix / SATRE detail */}
      {filter === 'SATRE' ? (
        <SatreMappingMatrix />
      ) : (
        <>
          <div className="table-responsive">
            {perspective === 'by-standard'
              ? <ByStandardView standards={filteredStandards} domains={DOMAINS} selected={selected} onCellClick={handleCellClick} />
              : <ByDomainView standards={filteredStandards} domains={DOMAINS} selected={selected} onCellClick={handleCellClick} />
            }
          </div>
          {selected && (
            <DetailPanel
              standard={selected.standard}
              domain={selected.domain}
              onClose={() => setSelected(null)}
            />
          )}
        </>
      )}
    </div>
  );
}
