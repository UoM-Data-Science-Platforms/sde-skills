import { useState, useEffect, useRef } from 'react';

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
  },
  {
    number: '02',
    title: 'Supporting Career Development',
    body: 'Supporting the career development of RTPs through the creation of a competency framework. We are working with the SDE community to define the key competencies that should be attained at different stages of an RTP\'s career in secure data environments.',
  },
  {
    number: '03',
    title: 'Facilitating Training',
    body: 'Supporting the training of RTPs by developing a curriculum that highlights training and sources of experience that can be used to achieve career progression against the competency framework.',
  },
  {
    number: '04',
    title: 'Certification Support',
    body: 'Facilitating direct training and certification of new and existing RTPs that work on the creation of secure data environments.',
  },
  {
    number: '05',
    title: 'Knowledge Sharing',
    body: 'Developing an online resource to share our outputs and experience with the wider SDE community.',
  },
];

export default function MissionScroll() {
  const [step, setStep]               = useState(0);
  const [animKey, setAnimKey]         = useState(0);
  const [panelHeight, setPanelHeight] = useState(600);
  const trackRef = useRef(null);

  // Measure the scroll container height for the sticky panel
  useEffect(() => {
    const container = trackRef.current?.closest('.scroll-area');
    if (!container) return;
    const update = () => setPanelHeight(container.clientHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // Track scroll progress through the track element
  useEffect(() => {
    const track = trackRef.current;
    const container = track?.closest('.scroll-area');
    if (!track || !container) return;

    const onScroll = () => {
      const trackRect     = track.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scrolledInto  = containerRect.top - trackRect.top;
      const scrollRange   = trackRect.height - containerRect.height;
      const progress      = Math.max(0, Math.min(0.9999, scrolledInto / scrollRange));
      const newStep       = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
      setStep(prev => {
        if (prev !== newStep) setAnimKey(k => k + 1);
        return newStep;
      });
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  const color   = COLORS[step];
  const current = STEPS[step];

  return (
    <div ref={trackRef} style={{ height: panelHeight * STEPS.length }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: panelHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 8, marginBottom: '3rem' }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              height: 6,
              width: i === step ? 28 : 6,
              borderRadius: 3,
              background: i === step ? color : 'var(--color-border)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
          ))}
        </div>

        {/* Animated content block */}
        <div
          key={animKey}
          style={{
            textAlign: 'center',
            maxWidth: 560,
            padding: '0 var(--space-xl)',
            animation: 'missionIn 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        >
          {/* Large ghost number */}
          <div style={{
            fontSize: 'clamp(6rem, 18vw, 10rem)',
            fontWeight: 900,
            lineHeight: 1,
            color,
            opacity: 0.12,
            letterSpacing: '-0.05em',
            marginBottom: '0.5rem',
            userSelect: 'none',
          }}>
            {current.number}
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 800,
            color: 'var(--color-heading)',
            margin: '0 0 1.25rem',
            lineHeight: 1.2,
          }}>
            {current.title}
          </h2>

          {/* Accent line */}
          <div style={{
            width: 40,
            height: 3,
            borderRadius: 2,
            background: color,
            margin: '0 auto 1.25rem',
            transition: 'background 0.4s ease',
          }} />

          {/* Body */}
          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: 'var(--color-text-muted)',
            margin: 0,
            fontStyle: 'italic',
          }}>
            {current.body}
          </p>
        </div>

        {/* Scroll nudge on first step */}
        {step === 0 && (
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            color: 'var(--color-text-muted)',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            animation: 'nudgeDown 2s ease-in-out infinite',
          }}>
            <span>scroll</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
