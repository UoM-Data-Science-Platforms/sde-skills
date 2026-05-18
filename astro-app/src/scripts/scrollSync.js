/**
 * Shared scroll-sync logic for pages with sticky section tabs.
 *
 * Handles both simple section tabs (index, contributing) and
 * two-level section + subsection tabs (cf-framework-mapping).
 *
 * Usage (two <script> tags in Astro — define:vars cannot be combined with ESM imports):
 *
 *   <script define:vars={{ sections }}>
 *     window._pageSections = sections;
 *   </script>
 *   <script>
 *     import { initScrollSync } from '../scripts/scrollSync.js';
 *     initScrollSync({ sections: window._pageSections });
 *     // page-specific DOM ops after this line
 *   </script>
 */
export function initScrollSync({ sections }) {
  const sectionTabs   = document.querySelectorAll('#section-tabs .subdomain-tab');
  const subsectionNav = document.getElementById('subsection-tabs');
  const hasSubsections = sections.some(s => s.subsections?.length);

  const OFFSET = window.innerHeight * 0.4;
  let currentSectionId = sections[0]?.id ?? null;

  const renderSubsections = (sectionId) => {
    if (!subsectionNav) return;
    const sec = sections.find(s => s.id === sectionId);
    subsectionNav.innerHTML = '';
    (sec?.subsections ?? []).forEach(sub => {
      const btn = document.createElement('button');
      btn.className = 'tab competency-tab';
      btn.dataset.sub = sub.id;
      btn.textContent = sub.label;
      btn.addEventListener('click', () =>
        document.getElementById(sub.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      );
      subsectionNav.appendChild(btn);
    });
  };

  const setActiveSubsection = (id) => {
    subsectionNav?.querySelectorAll('.competency-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.sub === id)
    );
  };

  const setActiveSection = (id, force = false) => {
    sectionTabs.forEach(t => t.classList.toggle('active', t.dataset.section === id));
    if (hasSubsections && (id !== currentSectionId || force)) {
      currentSectionId = id;
      renderSubsections(id);
    }
  };

  const getActive = (ids) => {
    let active = ids[0];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= OFFSET) active = id;
    }
    return active;
  };

  // Tab click handlers
  sectionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const sectionId = tab.dataset.section;
      setActiveSection(sectionId, true);
      if (hasSubsections) {
        const sec = sections.find(s => s.id === sectionId);
        if (sec?.subsections?.[0]) setActiveSubsection(sec.subsections[0].id);
      }
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const allSectionIds = sections.map(s => s.id);

  const onScroll = () => {
    const secId = getActive(allSectionIds);
    setActiveSection(secId);

    if (hasSubsections) {
      const sec    = sections.find(s => s.id === secId);
      const subIds = (sec?.subsections ?? []).map(s => s.id);
      if (subIds.length) setActiveSubsection(getActive(subIds));
    }
  };

  document.addEventListener('scroll', onScroll, { passive: true, capture: true });

  // Initialise active states
  if (hasSubsections) {
    renderSubsections(currentSectionId);
    if (sections[0]?.subsections?.[0]) setActiveSubsection(sections[0].subsections[0].id);
  }
  setActiveSection(allSectionIds[0]);
}
