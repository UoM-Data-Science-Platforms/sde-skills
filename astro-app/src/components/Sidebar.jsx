import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import { PAGE_COLORS } from "../data/domains.js";

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

const REPO = 'UoM-Data-Science-Platforms/sde-skills';

function GitHubStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}`)
      .then(r => r.json())
      .then(d => setStats({ stars: d.stargazers_count, forks: d.forks_count }))
      .catch(() => {});
  }, []);

  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: 'var(--space-xs) var(--space-md)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        textDecoration: 'none',
        marginBottom: 'var(--space-sm)',
        transition: 'background var(--transition-fast), color var(--transition-fast)',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--color-border)'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface)'}
    >
      {/* GitHub logo */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      {/* Stats */}
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-small)', color: 'var(--color-text-muted)', flex: 1 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.7 }}>
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.873 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
          </svg>
          {stats ? stats.stars.toLocaleString() : '—'}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.7 }}>
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
          </svg>
          {stats ? stats.forks.toLocaleString() : '—'}
        </span>
      </span>
    </a>
  );
}

export default function Sidebar({ domains, currentDomain }) {
  const [isOpen, setIsOpen] = useState(false);

  const colorOf = (id) => PAGE_COLORS[id] ?? 'var(--color-purple)';
  const activeColor = colorOf(currentDomain);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-domain-base', activeColor);
  }, [activeColor]);

  // Close sidebar on ESC key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className={`mobile-menu-btn${isOpen ? ' hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
      >
        <span /><span /><span />
      </button>

      {/* Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={close} aria-hidden="true" />}

      <aside className={`sidebar glass${isOpen ? ' is-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand__inner">
            <div>
              <h2>RTP</h2>
              <h2>Competency Framework</h2>
            </div>
            <button className="sidebar-close-btn" onClick={close} aria-label="Close navigation">✕</button>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {/* Home group */}
            <li className="nav-group">
              <a
                href={base}
                className={`nav-link nav-group-title${currentDomain === '/' ? ' active' : ''}`}
                style={{ '--color-item': colorOf('/') }}
                onClick={close}
              >
                Home
              </a>
              <ul className="nav-sub">
                <li>
                  <a
                    href={`${base}contributing/`}
                    className={`nav-link nav-sub-link${currentDomain === 'contributing' ? ' active' : ''}`}
                    style={{ '--color-item': colorOf('contributing') }}
                    onClick={close}
                  >
                    Contributing
                  </a>
                </li>
              </ul>
            </li>

            {/* Competency Framework group */}
            <li className="nav-group">
              <a
                href={`${base}cf-overview/`}
                className={`nav-link nav-group-title${currentDomain === 'cf-overview' ? ' active' : ''}`}
                style={{ '--color-item': colorOf('cf-overview') }}
                onClick={close}
              >
                Competency Framework
              </a>
              <ul className="nav-sub">
                <li>
                  <a
                    href={`${base}framework-contents/`}
                    className={`nav-link nav-sub-link${currentDomain === 'framework-contents' ? ' active' : ''}`}
                    style={{ '--color-item': colorOf('framework-contents') }}
                    onClick={close}
                  >
                    Contents
                  </a>
                </li>
                <li>
                  <a
                    href={`${base}mapping-matrix/`}
                    className={`nav-link nav-sub-link${currentDomain === 'mapping-matrix' ? ' active' : ''}`}
                    style={{ '--color-item': colorOf('mapping-matrix') }}
                    onClick={close}
                  >
                    Mapping Matrix
                  </a>
                </li>
                {domains.map((domain) => (
                  <li key={domain.id}>
                    <a
                      href={`${base}${domain.id}/`}
                      className={`nav-link nav-sub-link${currentDomain === domain.id ? ' active' : ''}`}
                      style={{ '--color-item': colorOf(domain.id) }}
                      onClick={close}
                    >
                      {domain.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <GitHubStats />
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
