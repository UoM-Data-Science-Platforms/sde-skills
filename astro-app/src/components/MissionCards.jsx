import { useState, useEffect, useRef } from 'react';
import { STEPS, MISSION_COLORS as COLORS } from '../data/missions.jsx';

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
        const stickyTop  = i * STACK_OFFSET;
        const cardHeight = panelHeight - stickyTop;
        const isPast     = i < activeIdx;

        return (
          <div
            key={i}
            style={{ position: 'sticky', top: stickyTop, height: cardHeight, zIndex: i + 1 }}
          >
            <div
              className={`mission-card__inner${isPast ? ' is-past' : ''}`}
              style={{ '--color-accent': COLORS[i] }}
            >
              {/* Colour bar along the top */}
              <div className="card__top-bar" />

              <div className="mission-card__content">
                {/* Ghost number */}
                <div className="card__ghost-number">{step.number}</div>

                {/* Title */}
                <h2 className="mission-card__title">{step.title}</h2>

                {/* Accent line */}
                <div className="mission-card__accent-line" />

                {/* Body */}
                <p className="mission-card__body">{step.body}</p>
              </div>

              {/* Step counter bottom-right */}
              <div className="card__step-counter">
                {i + 1} / {STEPS.length}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
