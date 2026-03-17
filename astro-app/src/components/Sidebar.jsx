import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import { PAGE_COLORS } from "../data/domains.js";

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

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
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
