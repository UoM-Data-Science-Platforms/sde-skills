import React from 'react';

const COLORS = [
  'var(--color-purple)',
  'var(--color-nhs-blue)',
  'var(--color-deep-blue)',
  'var(--color-purple)',
  'var(--color-nhs-blue)',
];

const STEPS = [
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
    body: 'Supporting the career development of RTPs through the creation of a competency framework defining key competencies at different career stages.',
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
    body: 'Supporting the training of RTPs by developing a curriculum that highlights training and experience for career progression.',
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
    body: 'Facilitating direct training and certification of new and existing RTPs working on the creation of secure data environments.',
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

export default function MissionGrid() {
  return (
    <div>

      {/* Section heading */}
      <div id="our-mission" style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{
          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
          fontWeight: 800,
          color: 'var(--color-domain)',
          margin: '0 0 0.75rem',
        }}>
          Our Mission
        </h2>
        <p style={{
          fontSize: '1.05rem',
          lineHeight: 1.7,
          color: 'var(--color-text-muted)',
          fontStyle: 'italic',
          margin: 0,
        }}>
          We aim to achieve this through five key initiatives:
        </p>
      </div>

      {/* Tile grid */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        {STEPS.map((step, i) => {
          const color = COLORS[i];
          return (
            <div
              key={i}
              style={{
                flex: '1 1 200px',
                maxWidth: 280,
                minWidth: 180,
                borderRadius: 16,
                background: 'rgba(255, 255, 255, 0)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(6.4px)',
                WebkitBackdropFilter: 'blur(6.4px)',
                border: '1px solid rgba(255, 255, 255, 0.19)',
                padding: 'var(--space-lg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '0.6rem',
              }}
            >
              {/* Icon */}
              <div style={{ width: 44, height: 44, color, marginTop: '0.25rem' }}>
                {step.icon}
              </div>

              {/* Number */}
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                color,
                opacity: 0.7,
              }}>
                {step.number}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--color-heading)',
                margin: 0,
                lineHeight: 1.3,
              }}>
                {step.title}
              </h3>

              {/* Accent line */}
              <div style={{ width: 28, height: 2, borderRadius: 1, background: color }} />

              {/* Body */}
              <p style={{
                fontSize: '0.85rem',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
                margin: 0,
                fontStyle: 'italic',
              }}>
                {step.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
