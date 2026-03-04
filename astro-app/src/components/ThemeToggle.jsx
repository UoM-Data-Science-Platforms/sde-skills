import React from "react";

export default function ThemeToggle() {
  const [dark, setDark] = React.useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  React.useEffect(() => {
    document.body.dataset.theme = dark ? 'dark' : 'light';
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
