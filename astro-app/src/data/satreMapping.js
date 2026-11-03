// SATRE Mapping Data
// Dynamically loaded from compiled JSON to ensure it stays in sync with master YAML files.

import satreData from './satre_mapping.json';
export const SATRE_SOURCE = satreData.source;
export const FEDERATION_CAVEAT = satreData.federation_caveat;
export const LEGACY_COMPONENTS = satreData.legacy_components;

export const SATRE_PILLARS = satreData.pillars;
export const DOMAINS = satreData.domains;
export const SUBDOMAINS = satreData.subdomains;
export const SUBDOMAIN_INDEX = Object.fromEntries(SUBDOMAINS.map((s, i) => [s.id, i]));
