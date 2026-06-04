import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import { PAGE_COLORS } from "../data/domains.js";

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export default function Sidebar({ domains, currentDomain, children }) {
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
      {/* Mobile hamburger — Bootstrap navbar-toggler, hidden on lg+ */}
      <button
        className={`navbar-toggler sidebar-toggler d-lg-none position-fixed top-0 start-0 m-2`}
        style={{ zIndex: 1045 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
        aria-controls="sidebar-offcanvas"
        aria-expanded={isOpen}
      >
        <span className="navbar-toggler-icon" />
      </button>

      {/* Bootstrap offcanvas panel */}
      <div
        id="sidebar-offcanvas"
        className={`offcanvas offcanvas-start glass--soft${isOpen ? ' show' : ''}`}
        tabIndex="-1"
        aria-labelledby="sidebar-label"
        style={{ width: 'var(--sidebar-width)' }}
      >
        {/* Offcanvas header / brand */}
        <div className="offcanvas-header border-bottom sidebar-brand">
          <div className="sidebar-brand-inner w-100">
            <div id="sidebar-label">
              <h2>SDE</h2>
              <h2>Team Development Hub</h2>
            </div>
            <button className="btn-close d-lg-none" onClick={close} aria-label="Close navigation" />
          </div>
        </div>

        {/* Offcanvas body — scrollable nav */}
        <div className="offcanvas-body p-0">
          <nav className="sidebar-nav">
            <ul className="nav flex-column py-2">

              {/* Home link */}
              <li className="nav-item nav-group">
                <a
                  href={base}
                  className={`nav-link nav-group-title home-nav-link${currentDomain === '/' ? ' active' : ''}`}
                  style={{ '--color-item': colorOf('/') }}
                  onClick={close}
                >
                  <svg className="nav-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8V13C2 13.5304 2.21071 14.0391 2.58579 14.4142C2.96086 14.7893 3.46957 15 4 15H12C12.5304 15 13.0391 14.7893 13.4142 14.4142C13.7893 14.0391 14 13.5304 14 13V8M1 7L8 2L15 7M5 13V9H11V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Home</span>
                </a>
              </li>

              {/* Project group */}
              <li className="nav-item nav-group">
                <a
                  href={`${base}project/`}
                  className={`nav-link nav-group-title${currentDomain === 'project' ? ' active' : ''}`}
                  style={{ '--color-item': colorOf('project') }}
                  onClick={close}
                >
                  <svg className="nav-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Project</span>
                </a>
                <ul className="nav flex-column nav-sub">
                  <li className="nav-item">
                    <a
                      href={`${base}student-projects/`}
                      className={`nav-link nav-sub-link${currentDomain === 'student-projects' ? ' active' : ''}`}
                      style={{ '--color-item': colorOf('student-projects') }}
                      onClick={close}
                    >Student Projects</a>
                  </li>
                  <li className="nav-item">
                    <a
                      href={`${base}rtp-placements/`}
                      className={`nav-link nav-sub-link${currentDomain === 'rtp-placements' ? ' active' : ''}`}
                      style={{ '--color-item': colorOf('rtp-placements') }}
                      onClick={close}
                    >RTP Placements</a>
                  </li>
                  <li className="nav-item">
                    <a
                      href={`${base}meet-the-team/`}
                      className={`nav-link nav-sub-link${currentDomain === 'meet-the-team' ? ' active' : ''}`}
                      style={{ '--color-item': colorOf('meet-the-team') }}
                      onClick={close}
                    >Meet the Team</a>
                  </li>
                  <li className="nav-item">
                    <a
                      href={`${base}acknowledgements/`}
                      className={`nav-link nav-sub-link${currentDomain === 'acknowledgements' ? ' active' : ''}`}
                      style={{ '--color-item': colorOf('acknowledgements') }}
                      onClick={close}
                    >Acknowledgements &amp; Attributions</a>
                  </li>
                </ul>
              </li>

              {/* Competency Framework group */}
              <li className="nav-item nav-group">
                <a
                  href={`${base}cf-overview/`}
                  className={`nav-link nav-group-title${currentDomain === 'cf-overview' ? ' active' : ''}`}
                  style={{ '--color-item': colorOf('cf-overview') }}
                  onClick={close}
                >
                  <svg className="nav-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Competency Framework</span>
                </a>
                <ul className="nav flex-column nav-sub">
                  <li className="nav-item">
                    <a
                      href={`${base}framework-contents/`}
                      className={`nav-link nav-sub-link${currentDomain === 'framework-contents' ? ' active' : ''}`}
                      style={{ '--color-item': colorOf('framework-contents') }}
                      onClick={close}
                    >Contents</a>
                  </li>
                  <li className="nav-item">
                    <a
                      href={`${base}mapping-matrix/`}
                      className={`nav-link nav-sub-link${currentDomain === 'mapping-matrix' ? ' active' : ''}`}
                      style={{ '--color-item': colorOf('mapping-matrix') }}
                      onClick={close}
                    >Mapping Matrix</a>
                  </li>
                  {domains.map((domain) => (
                    <li className="nav-item" key={domain.id}>
                      <a
                        href={`${base}${domain.id}/`}
                        className={`nav-link nav-sub-link${currentDomain === domain.id ? ' active' : ''}`}
                        style={{ '--color-item': colorOf(domain.id) }}
                        onClick={close}
                      >{domain.name}</a>
                    </li>
                  ))}
                  <li className="nav-item">
                    <a
                      href={`${base}contributing/`}
                      className={`nav-link nav-sub-link${currentDomain === 'contributing' ? ' active' : ''}`}
                      style={{ '--color-item': colorOf('contributing') }}
                      onClick={close}
                    >Contributing</a>
                  </li>
                </ul>
              </li>

            </ul>
          </nav>
        </div>

        <div className="sidebar-footer border-top p-3">
          {children}
          <ThemeToggle />
        </div>
      </div>

      {/* Backdrop — mobile only */}
      {isOpen && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={close}
          aria-hidden="true"
        />
      )}
    </>
  );
}
