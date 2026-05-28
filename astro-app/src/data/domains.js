/**
 * Canonical domain list — single source of truth for all pages and components.
 */
export const DOMAINS = [
  { id: 'access-identity',            name: 'Safe Access & Identity'            },
  { id: 'data-management',            name: 'Safe Data Management'              },
  { id: 'governance-compliance',      name: 'Safe Governance & Compliance'      },
  { id: 'outputs-disclosure-control', name: 'Safe Outputs & Disclosure Control' },
  { id: 'projects-operations',        name: 'Safe Projects & Operations'        },
  { id: 'technology-engineering',     name: 'Safe Technology & Engineering'     },
];

/**
 * Single source of truth for every page's accent color.
 * All pages use the same static deep-blue accent color.
 */
const ACCENT = 'var(--color-deep-blue)';

export const PAGE_COLORS = {
  '/':                          ACCENT,
  'project':                    ACCENT,
  'contributing':               ACCENT,
  'retreat-2026':               ACCENT,
  'expression-of-interest':     ACCENT,
  'cf-overview':                ACCENT,
  'framework-contents':         ACCENT,
  'mapping-matrix':             ACCENT,
  'access-identity':            ACCENT,
  'data-management':            ACCENT,
  'governance-compliance':      ACCENT,
  'outputs-disclosure-control': ACCENT,
  'projects-operations':        ACCENT,
  'technology-engineering':     ACCENT,
  'cf-framework-mapping':       ACCENT,
  'about':                      ACCENT,
  'satre-mapping':              ACCENT,
  'acknowledgements':           ACCENT,
  'placement-case-studies':     ACCENT,
  'meet-the-team':              ACCENT,
  'professional-training-placements': ACCENT,
};

/**
 * Convenience alias — domain-only subset of PAGE_COLORS.
 * Used by CFOverview, MappingMatrix, and other components that
 * only deal with the six skill domains.
 */
export const DOMAIN_COLORS = Object.fromEntries(
  DOMAINS.map(d => [d.id, PAGE_COLORS[d.id]])
);

/**
 * Institution-specific accent colors for RTP trainees
 */
export const INSTITUTION_COLORS = {
  'manchester': ACCENT,
  'lancashire': ACCENT,
  'liverpool': ACCENT,
};
