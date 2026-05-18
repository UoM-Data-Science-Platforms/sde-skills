import { useState, useEffect, useRef } from 'react';
import { STEPS, MISSION_COLORS as COLORS } from '../data/missions.jsx';

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
      <div
        className="mission-scroll__panel"
        style={{ height: panelHeight, '--color-accent': color }}
      >
        {/* Step indicator dots */}
        <div className="mission-scroll__indicators">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`step-dot${i === step ? ' step-dot--active' : ''}`}
            />
          ))}
        </div>

        {/* Animated content block */}
        <div key={animKey} className="mission-scroll__content">
          {/* Large ghost number */}
          <div className="mission-scroll__ghost-number">{current.number}</div>

          {/* Title */}
          <h2 className="mission-scroll__title">{current.title}</h2>

          {/* Accent line */}
          <div className="mission-card__accent-line" />

          {/* Body */}
          <p className="mission-card__body">{current.body}</p>
        </div>

        {/* Scroll nudge on first step */}
        {step === 0 && (
          <div className="mission-scroll__nudge">
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
