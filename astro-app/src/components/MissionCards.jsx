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
    body: 'Supporting the career development of RTPs through the creation of a competency framework — defining the key competencies that should be attained at different stages of an RTP\'s career in secure data environments.',
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

const STACK_OFFSET = 28; // px each card is nudged down the stack

export default function MissionCards() {
  const [panelHeight, setPanelHeight] = useState(600);
  const [activeIdx, setActiveIdx]     = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = trackRef.current?.closest('.scroll-area');
    if (!container) return;
    const update = () => setPanelHeight(container.clientHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // Track which card is on top
  useEffect(() => {
    const track     = trackRef.current;
    const container = track?.closest('.scroll-area');
    if (!track || !container) return;

    const onScroll = () => {
      const trackRect     = track.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scrolledInto  = containerRect.top - trackRect.top;
      const scrollRange   = trackRect.height - containerRect.height;
      const progress      = Math.max(0, Math.min(0.9999, scrolledInto / scrollRange));
      setActiveIdx(Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length)));
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={trackRef} style={{ height: panelHeight * STEPS.length, position: 'relative' }}>
      {STEPS.map((step, i) => {
        const color      = COLORS[i];
        const stickyTop  = i * STACK_OFFSET;
        const cardHeight = panelHeight - stickyTop;
        const isPast     = i < activeIdx;
        const isActive   = i === activeIdx;

        return (
          <div
            key={i}
            style={{
              position: 'sticky',
              top: stickyTop,
              height: cardHeight,
              zIndex: i + 1,
            }}
          >
            <div style={{
              height: '100%',
              borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
              background: `color-mix(in srgb, ${color} 6%, var(--color-surface))`,
              border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
              borderBottom: 'none',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
              transform: isPast ? 'scale(0.97)' : 'scale(1)',
              opacity: isPast ? 0.6 : 1,
            }}>
              {/* Colour bar along the top */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 3,
                background: color,
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
              }} />

              <div style={{
                maxWidth: 560,
                padding: '0 var(--space-xl)',
                textAlign: 'center',
              }}>
                {/* Ghost number */}
                <div style={{
                  fontSize: 'clamp(5rem, 14vw, 9rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color,
                  opacity: 0.1,
                  letterSpacing: '-0.05em',
                  marginBottom: '0.5rem',
                  userSelect: 'none',
                }}>
                  {step.number}
                </div>

                {/* Title */}
                <h2 style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                  fontWeight: 800,
                  color: 'var(--color-heading)',
                  margin: '0 0 1rem',
                  lineHeight: 1.2,
                }}>
                  {step.title}
                </h2>

                {/* Accent line */}
                <div style={{
                  width: 36,
                  height: 3,
                  borderRadius: 2,
                  background: color,
                  margin: '0 auto 1.25rem',
                }} />

                {/* Body */}
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'var(--color-text-muted)',
                  margin: 0,
                  fontStyle: 'italic',
                }}>
                  {step.body}
                </p>
              </div>

              {/* Step counter bottom-right */}
              <div style={{
                position: 'absolute',
                bottom: 'var(--space-lg)',
                right: 'var(--space-lg)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color,
                opacity: 0.5,
              }}>
                {i + 1} / {STEPS.length}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
