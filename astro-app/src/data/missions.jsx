/**
 * Mission steps — single source of truth for MissionCards, MissionGrid, MissionScroll.
 * Icons are only rendered by MissionGrid; the other components ignore the icon field.
 */
export const STEPS = [
  {
    number: '01',
    title: 'Increasing Capacity',
    body: 'Directly increasing capacity through recruitment of RTPs into existing teams developing SDEs in the Northwest of England.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="13" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="26" cy="13" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 32c0-5.523 4.477-10 10-10h12c5.523 0 10 4.477 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Supporting Career Development',
    body: "Supporting the career development of RTPs through the creation of a competency framework — defining the key competencies that should be attained at different stages of an RTP's career in secure data environments.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="6,30 16,18 24,24 34,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="28,10 34,10 34,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Facilitating Training',
    body: 'Supporting the training of RTPs by developing a curriculum that highlights training and sources of experience that can be used to achieve career progression against the competency framework.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10h24v20a2 2 0 01-2 2H10a2 2 0 01-2-2V10z" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 10a4 4 0 014-4h16a4 4 0 014 4" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 10v22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M13 17h4M13 22h4M23 17h4M23 22h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Certification Support',
    body: 'Facilitating direct training and certification of new and existing RTPs that work on the creation of secure data environments.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="16" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 22l-4 12 10-4 10 4-4-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 16l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Knowledge Sharing',
    body: 'Developing an online resource to share our outputs and experience with the wider SDE community.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="10" r="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="32" cy="30" r="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8"  cy="20" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 20h8M28 12l-8 6M28 28l-8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

/**
 * Color cycle for the five mission steps.
 */
export const MISSION_COLORS = [
  'var(--color-purple)',
  'var(--color-nhs-blue)',
  'var(--color-deep-blue)',
  'var(--color-purple)',
  'var(--color-nhs-blue)',
];
