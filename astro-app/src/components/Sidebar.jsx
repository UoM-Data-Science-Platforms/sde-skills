import ThemeToggle from "./ThemeToggle.jsx";

export default function Sidebar({ domains, currentDomain }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Skills Framework</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="/" className={`nav-link${currentDomain === '/' ? ' active' : ''}`}>
              Skills Index
            </a>
          </li>
          {domains.map((domain) => (
            <li key={domain.id}>
              <a
                href={`/${domain.id}`}
                className={`nav-link${currentDomain === domain.id ? ' active' : ''}`}
                style={domain.color ? { '--color-item': domain.color } : undefined}
              >
                {domain.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <ThemeToggle />
      </div>
    </aside>
  );
}
