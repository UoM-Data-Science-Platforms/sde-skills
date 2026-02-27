
import React from 'react';
import yaml from 'js-yaml';
export default function SkillsFramework() {

  const [data, setData] = React.useState(null);
  const [stickySubdomain, setStickySubdomain] = React.useState('');
  const [stickyCompetency, setStickyCompetency] = React.useState('');
  const [stickyCompNumber, setStickyCompNumber] = React.useState('');
  const [stickySubNumber, setStickySubNumber] = React.useState('');
  const [activeLevel, setActiveLevel] = React.useState({});
  const [activeProficiency, setActiveProficiency] = React.useState({});
  const scrollAreaRef = React.useRef(null);
  const sectionRefs = React.useRef([]);
  const levelMap = { entry: 'E', mid: 'M', senior: 'S' };
  const levelLabels = { entry: 'Entry', mid: 'Mid', senior: 'Senior' };
  // refs for subdomain and competency headings to support click-to-scroll
  const subdomainRefs = React.useRef({});
  const compRefs = React.useRef({});

  const toggleLevel = (compNumber, levelKey) => {
    setActiveLevel(prev => ({
      ...prev,
      [compNumber]: prev[compNumber] === levelKey ? null : levelKey,
    }));
    // Clear selected proficiency when toggling level
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
    const top = el.offsetTop;
    scrollAreaRef.current.scrollTo({ top, behavior: 'smooth' });
  };

  const handleDomainClick = () => {
    if (scrollAreaRef.current) scrollAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleSubdomainClick = () => {
    scrollToElement(subdomainRefs.current[stickySubNumber]);
  };
  const handleCompetencyClick = () => {
    scrollToElement(compRefs.current[stickyCompNumber]);
  };

  const getYamlFilename = () => {
    if (typeof window === 'undefined') return '/data/skills_index.yaml';
    const path = window.location.pathname.replace(/\/$/, '');
    if (!path || path === '/' || path === '/skills-index') {
      return '/data/skills_index.yaml';
    }
    // Convert /technology-engineering to safe_technology_engineering.yaml
    const name = path.slice(1).replace(/-/g, '_');
    return `/data/safe_${name}.yaml`;
  };

  React.useEffect(() => {
    const filename = getYamlFilename();
    fetch(filename)
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load ${filename}`);
        return res.text();
      })
      .then((text) => setData(yaml.load(text)))
      .catch(err => {
        console.error(err);
        // Fallback to default if load fails
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
    const firstSubName = firstSub?.[1]?.name || '';
    const firstSubNumber = '1.1';

    setStickySubdomain(firstSubName);
    setStickySubNumber(firstSubNumber);

    const firstComp = Object.entries(firstSub?.[1]?.competencies || {})[0];
    if (firstComp) {
      setStickyCompetency(firstComp[1]?.name || firstComp[1]?.id || '');
      setStickyCompNumber('1.1.1');
    } else {
      setStickyCompetency('');
      setStickyCompNumber('');
    }
  }, [data]);

  const handleScroll = () => {
    if (!sectionRefs.current.length) return;
    const scrollTop = scrollAreaRef.current.scrollTop;
    let foundSubdomain = '';
    let foundSubNumber = '';
    let foundCompetency = '';
    let foundCompNumber = '';

    // First find the active subdomain
    for (let subNumber in subdomainRefs.current) {
      const ref = subdomainRefs.current[subNumber];
      if (ref) {
        const offset = ref.offsetTop;
        if (scrollTop >= offset - 100) { // Larger buffer for subdomains
          foundSubNumber = subNumber;
          foundSubdomain = ref.textContent.replace(subNumber, '').trim();
        }
      }
    }

    // Then find the active competency
    for (let i = 0; i < sectionRefs.current.length; i++) {
      const ref = sectionRefs.current[i];
      if (ref) {
        const offset = ref.offsetTop;
        if (scrollTop >= offset - 20) { // Small buffer for competency snapping
          foundCompetency = ref.dataset.competency;
          foundCompNumber = ref.dataset.compnumber;
        }
      }
    }

    if (foundSubdomain) setStickySubdomain(foundSubdomain);
    if (foundSubNumber) setStickySubNumber(foundSubNumber);
    if (foundCompetency) setStickyCompetency(foundCompetency);
    if (foundCompNumber) setStickyCompNumber(foundCompNumber);
  };

  const domainNumber = '1.0';
  const subdomains = data ? Object.entries(data.domain.subdomains || {}) : [];

  // Build refs for each competency section: must call hook unconditionally
  React.useEffect(() => {
    sectionRefs.current = [];
    if (!data) return;
    subdomains.forEach(([subKey, subVal]) => {
      Object.entries(subVal.competencies || {}).forEach(([compKey, compVal]) => {
        sectionRefs.current.push(null);
      });
    });
  }, [data]);

  if (!data) return <div>Loading...</div>;

  let refIdx = 0;
  return (
    <div className="skills-framework">
      {/* Sticky domain header */}
      <div
        className="sticky-header"
        onClick={handleDomainClick}
      >
        <h1>{domainNumber} {data.domain.name}</h1>
      </div>
      {/* Sticky subdomain/proficiency header */}
      <div className="sticky-subheader-nav">
        <div className="subdomain-tabs">
          {subdomains.map(([subKey, subVal], idx) => {
            const subNumber = `1.${idx + 1}`;
            const isActive = stickySubNumber === subNumber;
            return (
              <div
                key={subKey}
                className={`tab subdomain-tab ${isActive ? 'active' : ''}`}
                onClick={() => scrollToElement(subdomainRefs.current[subNumber])}
              >
                {subNumber} {subVal.name}
              </div>
            );
          })}
        </div>
        <div className="competency-tabs">
          {subdomains.find(([_, subVal], idx) => `1.${idx + 1}` === stickySubNumber)?.[1].competencies &&
            Object.entries(subdomains.find(([_, subVal], idx) => `1.${idx + 1}` === stickySubNumber)[1].competencies).map(([compKey, compVal], idx) => {
              const compNumber = `${stickySubNumber}.${idx + 1}`;
              const isActive = stickyCompNumber === compNumber;
              return (
                <div
                  key={compKey}
                  className={`tab competency-tab ${isActive ? 'active' : ''}`}
                  onClick={() => scrollToElement(compRefs.current[compNumber])}
                >
                  {compNumber} {compVal.name || compVal.id}
                </div>
              );
            })
          }
        </div>
      </div>
      {/* Scrollable content */}
      <div
        ref={scrollAreaRef}
        className="scroll-area"
        onScroll={handleScroll}
      >
        {subdomains.map(([subKey, subVal], subIdx) => {
          const competencies = Object.entries(subVal.competencies || {});
          return (
            <div key={subKey} className="subdomain-section">
              <h2
                ref={el => { if (el) subdomainRefs.current[`1.${subIdx + 1}`] = el; }}
                className="section-title fade-in"
              >
                {`1.${subIdx + 1}`} {subVal.name}
              </h2>
              {subVal.description && (
                <div style={{ fontStyle: 'italic', padding: '0.5rem 0' }}>{subVal.description}</div>
              )}
              {competencies.map(([compKey, compVal], compIdx) => {
                const compNumber = `1.${subIdx + 1}.${compIdx + 1}`;
                const idx = refIdx++;
                const levels = Object.entries(compVal.levels || {});
                const selectedLevel = activeLevel[compNumber] || null;
                const selectedLevelData = selectedLevel ? levels.find(([k]) => k === selectedLevel)?.[1] : null;
                return (
                  <div
                    key={compKey}
                    ref={el => {
                      sectionRefs.current[idx] = el;
                      if (el) compRefs.current[compNumber] = el;
                    }}
                    data-subdomain={subVal.name}
                    data-subnumber={`1.${subIdx + 1}`}
                    data-competency={compVal.name || compVal.id}
                    data-compnumber={compNumber}
                    className="competency fade-in"
                  >
                    <h3>{compNumber} {compVal.name || compVal.id}</h3>
                    <div>{compVal.description}</div>
                    {/* Level toggle buttons */}
                    <div className="level-buttons">
                      {levels.map(([levelKey]) => (
                        <button
                          key={levelKey}
                          className={`level-btn${selectedLevel === levelKey ? ' level-btn-active' : ''}`}
                          onClick={() => toggleLevel(compNumber, levelKey)}
                        >
                          {levelLabels[levelKey] || (levelKey.charAt(0).toUpperCase() + levelKey.slice(1))}
                        </button>
                      ))}
                    </div>
                    {/* Proficiency panel: buttons left, display right */}
                    {selectedLevel && selectedLevelData && (
                      <div className="proficiency-panel fade-in">
                        <div className="proficiency-list">
                          {selectedLevelData.skills && Array.isArray(selectedLevelData.skills) && selectedLevelData.skills.map((skill, sIdx) => (
                            <button
                              key={sIdx}
                              className={`proficiency-btn${activeProficiency[compNumber] === sIdx ? ' proficiency-btn-active' : ''}`}
                              onClick={() => selectProficiency(compNumber, sIdx)}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                        <div className="proficiency-display">
                          {activeProficiency[compNumber] != null ? (
                            <div>
                              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>{selectedLevelData.skills[activeProficiency[compNumber]]}</h4>
                              <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: 600 }}>Technologies</h5>
                              <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: '#94a3b8' }}>No technologies listed yet.</p>
                              <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: 600 }}>Learning Materials</h5>
                              <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: '#94a3b8' }}>No learning materials listed yet.</p>
                              <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: 600 }}>Qualifications</h5>
                              <p style={{ margin: '0', fontSize: '0.85rem', color: '#94a3b8' }}>No qualifications listed yet.</p>
                            </div>
                          ) : (
                            <div className="proficiency-placeholder">Select a proficiency to view details</div>
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

