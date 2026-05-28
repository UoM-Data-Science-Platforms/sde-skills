import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import { PAGE_COLORS } from "../data/domains.js";

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

function SocialLinks() {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
      <a
        href="https://github.com/UoM-Data-Science-Platforms/sde-skills"
        target="_blank"
        rel="noreferrer"
        title="GitHub"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '32px', height: '32px',
          color: 'var(--color-text-muted)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          textDecoration: 'none',
          transition: 'background var(--transition-fast), color var(--transition-fast)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-heading)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-surface)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </a>
      <a
        href="https://bsky.app/profile/sdertp.bsky.social"
        target="_blank"
        rel="noreferrer"
        title="Bluesky"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '32px', height: '32px',
          color: 'var(--color-text-muted)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          textDecoration: 'none',
          transition: 'background var(--transition-fast), color var(--transition-fast)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-border)'; e.currentTarget.style.color = '#1185FE'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-surface)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
      >
        <svg width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512">
          <path d="M105 0h302c57.928.155 104.845 47.072 105 104.996V407c-.155 57.926-47.072 104.844-104.996 104.998L105 512C47.074 511.844.156 464.926.002 407.003L0 105C.156 47.072 47.074.155 104.997 0H105z"/><path fill="#fff" fillRule="nonzero" d="M173.234 144.311c33.5 25.237 69.538 76.397 82.765 103.853 13.228-27.456 49.267-78.616 82.767-103.853 24.177-18.205 63.343-32.294 63.343 12.534 0 8.949-5.115 75.209-8.117 85.969-10.429 37.393-48.441 46.931-82.251 41.159 59.1 10.091 74.133 43.513 41.664 76.936-61.663 63.479-88.629-15.927-95.533-36.273-1.991-5.857-1.708-5.991-3.745 0-6.905 20.346-33.869 99.752-95.531 36.273-32.47-33.423-17.437-66.845 41.663-76.936-33.81 5.772-71.822-3.766-82.251-41.159-3.002-10.76-8.117-77.02-8.117-85.969 0-44.828 39.172-30.739 63.343-12.534z"/>
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/company/sdertp/?viewAsMember=true"
        target="_blank"
        rel="noreferrer"
        title="LinkedIn"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '32px', height: '32px',
          color: 'var(--color-text-muted)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          textDecoration: 'none',
          transition: 'background var(--transition-fast), color var(--transition-fast)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-border)'; e.currentTarget.style.color = '#0A66C2'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-surface)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
        </svg>
      </a>
    </div>
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
      {/* Mobile hamburger — Bootstrap navbar-toggler, hidden on lg+ */}
      <button
        className={`navbar-toggler d-lg-none position-fixed top-0 start-0 m-2`}
        style={{ zIndex: 1045, background: 'rgba(52,56,65,0.15)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.48)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}
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
          <div className="sidebar-brand__inner w-100">
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
                  className={`nav-link nav-group-title${currentDomain === '/' ? ' active' : ''}`}
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
                  href={`${base}home/`}
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
                      href={`${base}placement-case-studies/`}
                      className={`nav-link nav-sub-link${currentDomain === 'placement-case-studies' ? ' active' : ''}`}
                      style={{ '--color-item': colorOf('placement-case-studies') }}
                      onClick={close}
                    >Student Projects</a>
                  </li>
                  <li className="nav-item">
                    <a
                      href={`${base}professional-training-placements/`}
                      className={`nav-link nav-sub-link${currentDomain === 'professional-training-placements' ? ' active' : ''}`}
                      style={{ '--color-item': colorOf('professional-training-placements') }}
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

        {/* Footer */}
        <div className="sidebar-footer border-top p-3">
          <SocialLinks />
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
