import React from "react";

export default function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setDark(true);
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
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
