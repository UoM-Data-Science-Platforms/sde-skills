import React from 'react';
import yaml from 'js-yaml';

function CollapsibleSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className={`collapsible${open ? ' is-open' : ''}`}>
      <button
        className="collapsible-summary"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        {title}
      </button>
      <div className="collapsible-content">
        <div className="collapsible-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function SkillsFramework() {
  const [data, setData] = React.useState(null);
  const [stickySubdomain, setStickySubdomain] = React.useState('');
  const [stickyCompetency, setStickyCompetency] = React.useState('');
  const [stickyCompNumber, setStickyCompNumber] = React.useState('');
  const [stickySubNumber, setStickySubNumber] = React.useState('');
  const [activeLevel, setActiveLevel] = React.useState({});
  const [activeProficiency, setActiveProficiency] = React.useState({});
  const scrollAreaRef = React.useRef(null);
  const frameworkRef = React.useRef(null);
  const sectionRefs = React.useRef([]);
  const competencyTabsRef = React.useRef(null);
  const subdomainTabsRef = React.useRef(null);
  const subdomainRefs = React.useRef({});
  const compRefs = React.useRef({});

  const DOMAIN_COLOR_VARS = {
    'color-purple':    '--color-purple',
    'color-deep-blue': '--color-deep-blue',
    'color-nhs-blue':  '--color-nhs-blue',
  };

  const levelLabels = { entry: 'Entry', mid: 'Mid', senior: 'Senior' };

  const toggleLevel = (compNumber, levelKey) => {
    setActiveLevel(prev => ({
      ...prev,
      [compNumber]: prev[compNumber] === levelKey ? null : levelKey,
    }));
    setActiveProficiency(prev => ({ ...prev, [compNumber]: null }));
  };

  const selectProficiency = (compNumber, skillIdx) => {
    setActiveProficiency(prev => ({
      ...prev,
      [compNumber]: prev[compNumber] === skillIdx ? null : skillIdx,
    }));
  };

  const scrollToElement = (el) => {
    if (!el || !scrollAreaRef.current) return;
    scrollAreaRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  const handleDomainClick = () => {
    if (scrollAreaRef.current) scrollAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getYamlFilename = () => {
    if (typeof window === 'undefined') return '/data/skills_index.yaml';
    const path = window.location.pathname.replace(/\/$/, '');
    if (!path || path === '/' || path === '/skills-index') return '/data/skills_index.yaml';
    const name = path.slice(1).replace(/-/g, '_');
    return `/data/safe_${name}.yaml`;
  };

  React.useEffect(() => {
    const filename = getYamlFilename();
    fetch(filename)
      .then(res => {
        if (!res.ok) throw new Error(`Could not load ${filename}`);
        return res.text();
      })
      .then(text => setData(yaml.load(text)))
      .catch(err => {
        console.error(err);
        if (filename !== '/data/skills_index.yaml') {
          fetch('/data/skills_index.yaml')
            .then(res => res.text())
            .then(text => setData(yaml.load(text)));
        }
      });
  }, []);

  React.useEffect(() => {
    if (!data) return;
    const firstSub = Object.entries(data.domain.subdomains)[0];
    const domainNumber = data.domain.index;
    const firstSubName = firstSub?.[1]?.name || '';
    const firstSubNumber = `${domainNumber}.1`;
    setStickySubdomain(firstSubName);
    setStickySubNumber(firstSubNumber);
    const firstComp = Object.entries(firstSub?.[1]?.competencies || {})[0];
    if (firstComp) {
      setStickyCompetency(firstComp[1]?.name || firstComp[1]?.id || '');
      setStickyCompNumber(`${domainNumber}.1.1`);
    } else {
      setStickyCompetency('');
      setStickyCompNumber('');
    }
  }, [data]);

  // Scroll active competency tab into view when sync updates
  React.useEffect(() => {
    competencyTabsRef.current
      ?.querySelector('.competency-tab.active')
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }, [stickyCompNumber]);

  // Scroll active subdomain tab into view when sync updates
  React.useEffect(() => {
    subdomainTabsRef.current
      ?.querySelector('.subdomain-tab.active')
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }, [stickySubNumber]);

  // Pad the bottom so the last card can scroll to the threshold but no further
  React.useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const update = () => {
      const cards = el.querySelectorAll('.competency-card');
      const lastCard = cards[cards.length - 1];
      const lastCardHeight = lastCard ? lastCard.offsetHeight : 0;
      el.style.paddingBottom = `${Math.max(0, el.clientHeight - lastCardHeight)}px`;
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [data]);

  // Fade-up on scroll — observe cards and titles entering the scroll area
  React.useEffect(() => {
    const root = scrollAreaRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root, rootMargin: '0px', threshold: 0.05 }
    );
    root.querySelectorAll('.competency-card, .subdomain-title')
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [data]);

  const handleScroll = () => {
    if (!sectionRefs.current.length || !scrollAreaRef.current) return;

    // The top of the scroll area in viewport coords = bottom of the sticky header.
    // An element triggers when its top edge crosses this boundary.
    const threshold = scrollAreaRef.current.getBoundingClientRect().top;

    let foundSubdomain = '';
    let foundSubNumber = '';
    let foundCompetency = '';
    let foundCompNumber = '';

    for (let subNumber in subdomainRefs.current) {
      const ref = subdomainRefs.current[subNumber];
      if (ref && ref.getBoundingClientRect().top <= threshold) {
        foundSubNumber = subNumber;
        foundSubdomain = ref.textContent.replace(subNumber, '').trim();
      }
    }

    for (let i = 0; i < sectionRefs.current.length; i++) {
      const ref = sectionRefs.current[i];
      if (ref && ref.getBoundingClientRect().top <= threshold) {
        foundCompetency = ref.dataset.competency;
        foundCompNumber = ref.dataset.compNumber;
      }
    }

    if (foundSubdomain) setStickySubdomain(foundSubdomain);
    if (foundSubNumber) setStickySubNumber(foundSubNumber);
    if (foundCompetency) setStickyCompetency(foundCompetency);
    if (foundCompNumber) setStickyCompNumber(foundCompNumber);
  };

  React.useEffect(() => {
    sectionRefs.current = [];
    if (!data) return;
    Object.entries(data.domain.subdomains || {}).forEach(([, subVal]) => {
      Object.keys(subVal.competencies || {}).forEach(() => {
        sectionRefs.current.push(null);
      });
    });
  }, [data]);

  React.useEffect(() => {
    if (!data) return;
    const varName = DOMAIN_COLOR_VARS[data.domain['main-color']];
    if (varName) document.documentElement.style.setProperty('--color-domain-base', `var(${varName})`);
  }, [data]);

  if (!data) return <div className="loading">Loading…</div>;

  const domainNumber = data.domain.index;
  const subdomains = Object.entries(data.domain.subdomains || {});
  let refIdx = 0;

  return (
    <div className="skills-framework" ref={frameworkRef}>
      {/* Sticky domain header */}
      <div className="sticky-header" onClick={handleDomainClick}>
        <h1>{domainNumber} {data.domain.name}</h1>
      </div>

      {/* Sticky subdomain / competency nav */}
      <div className="sticky-subnav">
        <div className="subdomain-tabs" ref={subdomainTabsRef}>
          {subdomains.map(([subKey, subVal], idx) => {
            const subNumber = `${domainNumber}.${idx + 1}`;
            return (
              <button
                key={subKey}
                className={`tab subdomain-tab${stickySubNumber === subNumber ? ' active' : ''}`}
                onClick={() => scrollToElement(subdomainRefs.current[subNumber])}
              >
                {subNumber} {subVal.name}
              </button>
            );
          })}
        </div>
        <div className="competency-tabs" ref={competencyTabsRef}>
          {subdomains
            .find(([, subVal], idx) => `${domainNumber}.${idx + 1}` === stickySubNumber)
            ?.[1].competencies &&
            Object.entries(
              subdomains.find(([, subVal], idx) => `${domainNumber}.${idx + 1}` === stickySubNumber)[1].competencies
            ).map(([compKey, compVal], idx) => {
              const compNumber = `${stickySubNumber}.${idx + 1}`;
              return (
                <button
                  key={compKey}
                  className={`tab competency-tab${stickyCompNumber === compNumber ? ' active' : ''}`}
                  onClick={() => scrollToElement(compRefs.current[compNumber])}
                >
                  {compNumber} {compVal.name || compVal.id}
                </button>
              );
            })}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="scroll-area" ref={scrollAreaRef} onScroll={handleScroll}>
        {subdomains.map(([subKey, subVal], subIdx) => {
          const competencies = Object.entries(subVal.competencies || {});
          return (
            <div key={subKey} className="subdomain-section">
              <h2
                ref={el => { if (el) subdomainRefs.current[`${domainNumber}.${subIdx + 1}`] = el; }}
                className="subdomain-title"
              >
                <span className="section-number">{domainNumber}.{subIdx + 1}</span>
                {subVal.name}
              </h2>
              {subVal.description && (
                <p className="subdomain-description">{subVal.description}</p>
              )}
              {competencies.map(([compKey, compVal], compIdx) => {
                const compNumber = `${domainNumber}.${subIdx + 1}.${compIdx + 1}`;
                const idx = refIdx++;
                const levels = Object.entries(compVal.levels || {});
                const selectedLevel = activeLevel[compNumber] || null;
                const selectedLevelData = selectedLevel
                  ? levels.find(([k]) => k === selectedLevel)?.[1]
                  : null;
                return (
                  <div
                    key={compKey}
                    ref={el => {
                      sectionRefs.current[idx] = el;
                      if (el) compRefs.current[compNumber] = el;
                    }}
                    data-competency={compVal.name || compVal.id}
                    data-comp-number={compNumber}
                    className="competency-card"
                  >
                    <h3>
                      <span className="comp-number">{compNumber}</span>
                      {compVal.name || compVal.id}
                    </h3>
                    <p className="competency-description">{compVal.description}</p>

                    {/* Experience-level selector */}
                    <div className="level-buttons">
                      {levels.map(([levelKey]) => (
                        <button
                          key={levelKey}
                          className={`level-btn${selectedLevel === levelKey ? ' active' : ''}`}
                          onClick={() => toggleLevel(compNumber, levelKey)}
                        >
                          {levelLabels[levelKey] || levelKey.charAt(0).toUpperCase() + levelKey.slice(1)}
                        </button>
                      ))}
                    </div>

                    {/* Two-column proficiency panel */}
                    {selectedLevel && selectedLevelData && (
                      <div className="proficiency-panel">
                        <div className="proficiency-list">
                          {selectedLevelData.skills?.map((skill, sIdx) => (
                            <button
                              key={sIdx}
                              className={`proficiency-btn${activeProficiency[compNumber] === sIdx ? ' active' : ''}`}
                              onClick={() => selectProficiency(compNumber, sIdx)}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                        <div className="proficiency-display">
                          {activeProficiency[compNumber] != null ? (
                            <div className="proficiency-detail">
                              <h4>{selectedLevelData.skills[activeProficiency[compNumber]]}</h4>
                              <CollapsibleSection title="Technologies" defaultOpen={true}>
                                <p>No technologies listed yet.</p>
                              </CollapsibleSection>
                              <CollapsibleSection title="Training Materials">
                                <p>No training materials listed yet.</p>
                              </CollapsibleSection>
                              <CollapsibleSection title="Qualifications">
                                <p>No qualifications listed yet.</p>
                              </CollapsibleSection>
                            </div>
                          ) : (
                            <p className="proficiency-placeholder">Select a proficiency to view details</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
