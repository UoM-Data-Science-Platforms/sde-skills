import ThemeToggle from "./ThemeToggle.jsx";

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export default function Sidebar({ domains, currentDomain }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>RTP</h2>
        <h2>Competency Framework</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <a
              href={base}
              className={`nav-link${currentDomain === '/' ? ' active' : ''}`}
              style={{ '--color-item': 'var(--color-purple)' }}
            >
              Home
            </a>
          </li>
        
          {domains.map((domain) => (
            <li key={domain.id}>
              <a
                href={`${base}${domain.id}/`}
                className={`nav-link${currentDomain === domain.id ? ' active' : ''}`}
                style={domain.color ? { '--color-item': domain.color } : undefined}
              >
                {domain.name}
              </a>
            </li>
          ))}
           <li>
            <a
              href={`${base}about/`}
              className={`nav-link${currentDomain === 'about' ? ' active' : ''}`}
              style={{ '--color-item': 'var(--color-nhs-blue)' }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href={`${base}contributing/`}
              className={`nav-link${currentDomain === 'contributing' ? ' active' : ''}`}
              style={{ '--color-item': 'var(--color-blue-blue)' }}
            >
              Contributing
            </a>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <ThemeToggle />
      </div>
    </aside>
  );
}
