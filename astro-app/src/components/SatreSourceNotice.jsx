import { SATRE_SOURCE, FEDERATION_CAVEAT } from '../data/satreMapping.js';

export default function SatreSourceNotice() {
  return (
    <aside style={{ padding: 'var(--space-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
      <p>SATRE <a href={SATRE_SOURCE.release_url}>{SATRE_SOURCE.version}</a> (released {SATRE_SOURCE.release_date}).{' '}
        <a href={SATRE_SOURCE.url}>Pinned official source</a>; inventory checked {SATRE_SOURCE.inventory_checked_on}.
        {' '}Competency relationships await substantive review. An empty mapping means awaiting review, rather than a confirmed gap.
        Mapping inclusion does not demonstrate team proficiency or SATRE compliance.</p>
      <p>{FEDERATION_CAVEAT}</p>
      <small>{SATRE_SOURCE.attribution} <a href={SATRE_SOURCE.license_url}>License</a>.</small>
    </aside>
  );
}
