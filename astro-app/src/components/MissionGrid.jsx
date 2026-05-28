import React from 'react';
import { STEPS, MISSION_COLORS as COLORS } from '../data/missions.jsx';

export default function MissionGrid() {
  return (
    <div>
      
      {/* Tile grid */}
      <div className="mission-grid">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="mission-tile glass--soft"
            style={{ '--color-accent': COLORS[i] }}
          >
            {/* Icon */}
            <div className="tile__icon">
              {step.icon}
            </div>

            {/* Number */}
            <div className="tile__number">{step.number}</div>

            {/* Title */}
            <h3>{step.title}</h3>

            {/* Accent line */}
            <div className="card__accent-line--tile" />

            {/* Body */}
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
