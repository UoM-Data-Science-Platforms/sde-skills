import React from "react";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Sidebar({ domains, currentDomain, onSelectDomain }) {
  return (
    <aside style={{
      width: 240,
      minHeight: '100vh',
      background: 'var(--sidebar-bg)',
      color: 'var(--sidebar-fg)',
      padding: '2rem 1rem',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(59, 130, 246, 0.07)',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '2rem', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.5 }}>Skills Framework</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li key="home">
            <a
              href="/"
              className={`nav-btn ${currentDomain === '/' ? 'active' : ''}`}
              style={{ display: 'block', textDecoration: 'none' }}
            >
              Skills Index
            </a>
          </li>
          {domains.map((domain) => (
            <li key={domain.id}>
              <a
                href={`/${domain.id}`}
                className={`nav-btn ${currentDomain === domain.id ? 'active' : ''}`}
                style={{ display: 'block', textDecoration: 'none' }}
              >
                {domain.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <ThemeToggle />
      </div>
    </aside>
  );
}
