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
 * Used by both Layout.astro (initial paint) and Sidebar (runtime update)
 * so they always agree.
 */
// Colors cycle purple → nhs-blue → deep-blue by nav position.
// The order here mirrors the Sidebar nav item order so the cycle is consistent.
// NOTE: cf-framework-mapping has no sidebar link so is NOT in the sequential cycle.
const C = ['var(--color-purple)', 'var(--color-nhs-blue)', 'var(--color-deep-blue)'];

export const PAGE_COLORS = {
  // Nav items in order (index % 3 determines color)
  '/':                          C[0],  // 0
  'contributing':               C[1],  // 1
  'cf-overview':                C[2],  // 2
  'framework-contents':         C[0],  // 3
  'mapping-matrix':             C[1],  // 4
  'access-identity':            C[2],  // 5
  'data-management':            C[0],  // 6
  'governance-compliance':      C[1],  // 7
  'outputs-disclosure-control': C[2],  // 8
  'projects-operations':        C[0],  // 9
  'technology-engineering':     C[1],  // 10
  // Pages without a sidebar nav link — pick a reasonable match
  'cf-framework-mapping':       C[2],
  'about':                      C[2],
  'satre-mapping':              C[0],
};

/**
 * Convenience alias — domain-only subset of PAGE_COLORS.
 * Used by CFOverview, MappingMatrix, and other components that
 * only deal with the six skill domains.
 */
export const DOMAIN_COLORS = Object.fromEntries(
  DOMAINS.map(d => [d.id, PAGE_COLORS[d.id]])
);
