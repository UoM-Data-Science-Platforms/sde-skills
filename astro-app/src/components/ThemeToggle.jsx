import React from "react";

export default function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setDark(true);
  }, []);

  React.useEffect(() => {
    const val = dark ? 'dark' : 'light';
    document.documentElement.dataset.theme = val;
    document.documentElement.dataset.bsTheme = val;
    localStorage.setItem('theme', val);
  }, [dark]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setDark(d => !d)}
      aria-label="Toggle dark mode"
    >
      {dark ? 'Light mode' : 'Dark mode'}
    </button>
  );
}
