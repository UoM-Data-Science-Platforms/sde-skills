import React from "react";


export default function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    // Only run on client
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(prefersDark);
  }, []);

  React.useEffect(() => {
    document.body.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  return (
    <button
      className="nav-btn active"
      style={{ textAlign: 'center' }}
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
    >
      {dark ? 'Mode: NIGHT' : 'Mode: LIGHT'}
    </button>
  );
}
