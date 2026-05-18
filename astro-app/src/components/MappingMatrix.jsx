import { useState } from 'react';
import SatreMappingMatrix from './SatreMappingMatrix.jsx';

const DOMAINS = [
  { id: 'access-identity',            short: 'Access & Identity',  color: 'var(--color-deep-blue)' },
  { id: 'data-management',            short: 'Data Management',    color: 'var(--color-purple)'    },
  { id: 'governance-compliance',      short: 'Governance',         color: 'var(--color-nhs-blue)'  },
  { id: 'outputs-disclosure-control', short: 'Outputs',            color: 'var(--color-deep-blue)' },
  { id: 'projects-operations',        short: 'Projects & Ops',     color: 'var(--color-purple)'    },
  { id: 'technology-engineering',     short: 'Technology',         color: 'var(--color-nhs-blue)'  },
];

const FRAMEWORK_COLORS = {
  'Five Safes':    'var(--color-purple)',
  'SATRE':         'var(--color-nhs-blue)',
  'Cross-Cutting': 'var(--color-deep-blue)',
};

const ALL_DOMAINS = DOMAINS.map(d => d.id);

const STANDARDS = [
  { id: 'safe-data',      framework: 'Five Safes',    short: 'Safe Data',           name: 'Safe Data',                      tagline: 'Data is treated to protect any confidentiality concerns.',                    domains: ['data-management'],             competencies: ['Data classification & sensitivity assessment','Data lineage & provenance tracking','De-identification techniques','Data quality management','Data storage & database security'] },
  { id: 'safe-projects',  framework: 'Five Safes',    short: 'Safe Projects',       name: 'Safe Projects',                  tagline: 'Research projects are approved by data owners for the public good.',         domains: ['projects-operations'],         competencies: ['SDE project planning','Research project facilitation','Research ethics compliance','Service level management','Researcher training & support'] },
  { id: 'safe-people',    framework: 'Five Safes',    short: 'Safe People',         name: 'Safe People',                    tagline: 'Researchers are trained and authorised to use data safely.',                  domains: ['access-identity'],             competencies: ['Authentication systems','User provisioning & lifecycle management','Role-based access control','Researcher onboarding','Training & certification verification'] },
  { id: 'safe-settings',  framework: 'Five Safes',    short: 'Safe Settings',       name: 'Safe Settings',                  tagline: 'A SecureLab environment prevents unauthorised use.',                          domains: ['technology-engineering'],      competencies: ['Secure environment design','Network architecture','Infrastructure & deployment','Cloud infrastructure management','System architecture'] },
  { id: 'safe-outputs',   framework: 'Five Safes',    short: 'Safe Outputs',        name: 'Safe Outputs',                   tagline: 'Screened and approved outputs that are non-disclosive.',                     domains: ['outputs-disclosure-control'],  competencies: ['Statistical disclosure control techniques','Disclosure risk assessment','Output review processes','Output documentation & justification','Synthetic data generation'] },
  { id: 'auth-auth',      framework: 'SATRE',         short: 'Auth & Authz',        name: 'Authentication & Authorization', tagline: null,                                                                          domains: ['access-identity'],             competencies: ['Authentication systems','Federated identity management','Role-based access control','Attribute-based access control','Least privilege implementation'] },
  { id: 'env-prov',       framework: 'SATRE',         short: 'Env. Provisioning',   name: 'Environment Provisioning',       tagline: null,                                                                          domains: ['technology-engineering'],      competencies: ['Secure environment design','Containerization & orchestration','Cloud infrastructure management','Microservices & API design','Software development lifecycle'] },
  { id: 'data-ingress',   framework: 'SATRE',         short: 'Data Ingress/Egress', name: 'Data Ingestion & Egress',        tagline: null,                                                                          domains: ['data-management'],             competencies: ['Data pipeline development','Data validation','Data models & standardization','Data quality management','Research dataset creation'] },
  { id: 'resource-mgmt',  framework: 'SATRE',         short: 'Resource Mgmt',       name: 'Resource Management',            tagline: null,                                                                          domains: ['projects-operations'],         competencies: ['Service level management','Change & release management','TRE tools & capabilities','Monitoring & observability','Documentation & knowledge management'] },
  { id: 'audit-mon',      framework: 'SATRE',         short: 'Audit & Monitoring',  name: 'Audit & Monitoring',             tagline: null,                                                                          domains: ['governance-compliance'],       competencies: ['Audit trail implementation','Compliance monitoring & reporting','Security assessment & testing','Certification & accreditation','Incident response management'] },
  { id: 'output-check',   framework: 'SATRE',         short: 'Output Checking',     name: 'Output Checking',                tagline: null,                                                                          domains: ['outputs-disclosure-control'],  competencies: ['Output review processes','Statistical disclosure control techniques','Decision support systems','De-identification techniques','Synthetic data generation'] },
  { id: 'gov-comp',       framework: 'Cross-Cutting', short: 'Governance',          name: 'Governance & Compliance',        tagline: 'Spans across all Five Safes principles and SATRE components.',               domains: ALL_DOMAINS,                     competencies: ['Information governance','Data protection compliance','Healthcare standards compliance','Research ethics compliance','Security controls implementation'] },
  { id: 'collab-comm',    framework: 'Cross-Cutting', short: 'Collaboration',       name: 'Collaboration & Communication',  tagline: 'Key to effective implementation of all domains.',                             domains: ALL_DOMAINS,                     competencies: ['Documentation & knowledge management','Researcher training & support','Continuous improvement','Research project facilitation','Technical collaboration'] },
];

const FRAMEWORKS = ['Five Safes', 'SATRE', 'Cross-Cutting'];

const FRAMEWORK_DESCRIPTIONS = {
  'Five Safes':    'The Five Safes framework is a set of principles enabling safe research access to sensitive data. Our competency domains are designed to align with and support these principles.',
  'SATRE':         'The Standard Architecture for Trusted Research Environments (SATRE) specification provides a comprehensive high-level architecture for research organisations handling sensitive data safely. Our framework aligns with these components.',
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
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
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
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
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
  const [filter, setFilter]           = useState('Five Safes');
  const [selected, setSelected]       = useState(null);

  const filteredStandards = STANDARDS.filter(s => s.framework === filter);

  const handleCellClick = (standard, domain) => {
    const isSame = selected?.standard?.id === standard.id && selected?.domain?.id === domain.id;
    setSelected(isSame ? null : { standard, domain });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', height: '100%' }}>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
        {/* Framework filter tabs */}
        <div style={{ display: 'flex', gap: 0 }}>
          {FRAMEWORKS.map(f => (
            <button
              key={f}
              className={`tab subdomain-tab${filter === f ? ' active' : ''}`}
              style={{ '--color-domain': FRAMEWORK_COLORS[f] ?? 'var(--color-domain)' }}
              onClick={() => { setFilter(f); setSelected(null); }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Perspective toggle — hidden for SATRE view */}
        {filter !== 'SATRE' && (
          <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
            {[['by-standard', 'By Standard'], ['by-domain', 'By Domain']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => { setPerspective(val); setSelected(null); }}
                style={{
                  padding: 'var(--space-xs) var(--space-md)',
                  fontSize: 'var(--text-small)', fontWeight: 500,
                  background: perspective === val ? 'var(--color-domain)' : 'transparent',
                  color: perspective === val ? 'white' : 'var(--color-text-muted)',
                  border: 'none', cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
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
          <div style={{ overflowX: 'auto' }}>
            {perspective === 'by-standard'
              ? <ByStandardView standards={filteredStandards} domains={DOMAINS} selected={selected} onCellClick={handleCellClick} />
              : <ByDomainView   standards={filteredStandards} domains={DOMAINS} selected={selected} onCellClick={handleCellClick} />
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
