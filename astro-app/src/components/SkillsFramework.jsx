import React from 'react';
import { createPortal } from 'react-dom';
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

function ConceptCard({ concept }) {
  const [showDetail, setShowDetail] = React.useState(false);
  return (
    <div className="training-card">
      <button
        className="training-name"
        onClick={() => setShowDetail(!showDetail)}
      >
        {concept.topic}
      </button>
      {showDetail && (
        <div className="training-detail">
          <div className="detail-field">
            <strong>Core Concepts:</strong> {concept.concepts}
          </div>
          <div className="detail-field" style={{ marginTop: '8px' }}>
            <strong>Search Terms:</strong> 
            <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
              {concept.search_terms?.map((term, i) => (
                <li key={i} style={{ fontStyle: 'italic' }}>"{term}"</li>
              ))}
            </ul>
          </div>
          <div className="detail-field" style={{ marginTop: '8px' }}>
            <strong>Why:</strong> {concept.why}
          </div>
        </div>
      )}
    </div>
  );
}

function QualificationCard({ qualification }) {
  const [showDetail, setShowDetail] = React.useState(false);
  return (
    <div className="qualification-card">
      <button
        className="qualification-name"
        onClick={() => setShowDetail(!showDetail)}
      >
        {qualification.name}
      </button>
      {showDetail && (
        <div className="qualification-detail">
          <div className="detail-field">
            <strong>Issued by:</strong> {qualification.issuer}
          </div>
          <div className="detail-field">
            {qualification.description}
          </div>
          <div className="detail-field">
            <strong>Career Impact:</strong> {qualification.career_impact}
          </div>
        </div>
      )}
    </div>
  );
}
function TechChip({ item }) {
  const [showPopup, setShowPopup] = React.useState(false);
  const [coords, setCoords] = React.useState({ top: 0, left: 0 });
  const wrapperRef = React.useRef(null);
  const { name, role, sources } = item || {};
  
  if (!name) return null;

  const handleMouseEnter = () => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top - 8,
        left: rect.left + rect.width / 2
      });
    }
    setShowPopup(true);
  };

  const popupContent = showPopup && typeof document !== 'undefined' ? createPortal(
    <div 
      className="tech-hover-card" 
      style={{
        position: 'fixed',
        bottom: window.innerHeight - coords.top,
        left: coords.left,
        transform: 'translateX(-50%)',
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        width: 'max-content',
        maxWidth: '380px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        zIndex: 999999,
        fontSize: '0.85rem',
        lineHeight: 1.5,
        color: '#333',
        textAlign: 'left',
        pointerEvents: 'none'
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '1.05rem', marginBottom: '6px', color: '#1a1a1a' }}>
        {name}
      </div>
      <div style={{ fontStyle: 'italic', marginBottom: '12px', color: '#555', paddingBottom: '8px', borderBottom: '1px solid #eee' }}>
        {role}
      </div>
      {sources?.community && (
        <div style={{ marginBottom: '6px', color: '#2e7d32', fontWeight: '600' }}>
          ⭐ Identified in community events
        </div>
      )}
      {sources?.standards?.count > 0 && (
        <div style={{ marginBottom: '6px' }}>
          <strong>Industry Standards:</strong> {sources.standards.count}/7
          <span style={{ color: '#666' }}> ({sources.standards.mentions.slice(0,3).join(', ')})</span>
        </div>
      )}
      {sources?.projects?.count > 0 && (
        <div style={{ marginBottom: '6px' }}>
          <strong>DARE UK Projects:</strong> {sources.projects.count}/7
          <span style={{ color: '#666' }}> ({sources.projects.mentions.slice(0,3).join(', ')})</span>
        </div>
      )}
      {sources?.jobs?.total > 0 && (
        <div style={{ marginBottom: '6px' }}>
          <strong>Job Postings:</strong> {sources.jobs.total}/100
          <span style={{ color: '#666' }}> (Entry: {sources.jobs.entry}, Mid: {sources.jobs.mid}, Snr: {sources.jobs.senior})</span>
        </div>
      )}
      {sources?.radars?.score && sources.radars.score !== '0/4' && (
        <div>
          <strong>Tech Radars:</strong> {sources.radars.score}
          <span style={{ color: '#666' }}> ({sources.radars.status})</span>
        </div>
      )}
    </div>,
    document.body
  ) : null;

  return (
    <div 
      className="tech-chip-wrapper" 
      ref={wrapperRef}
      style={{ display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowPopup(false)}
    >
      <span className="badge tech-chip" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        {name} {sources?.community && '⭐'}
      </span>
      {popupContent}
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
    const scrollArea = scrollAreaRef.current;
    const offset = 22;

    if (scrollArea.scrollHeight > scrollArea.clientHeight) {
      // Desktop: scroll-area element is the scroller
      const containerTop = scrollArea.getBoundingClientRect().top;
      scrollArea.scrollTo({
        top: Math.max(0, el.getBoundingClientRect().top - containerTop + scrollArea.scrollTop - offset),
        behavior: 'smooth',
      });
    } else {
      // Mobile: window is the scroller.
      // stickyHeight = absolute document Y of the scroll-area top (= sticky header + subnav height).
      // This stays constant regardless of current scroll position.
      const stickyHeight = scrollArea.getBoundingClientRect().top + window.scrollY;
      const elAbsolute = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elAbsolute - stickyHeight - offset),
        behavior: 'smooth',
      });
    }
  };

  const handleDomainClick = () => {
    scrollAreaRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

  const getYamlFilename = () => {
    const dataBase = `${base}data/`;
    if (typeof window === 'undefined') return `${dataBase}skills_index.yaml`;
    const basePath = base.replace(/\/$/, '');
    const fullPath = window.location.pathname.replace(/\/$/, '');
    const slug = fullPath.startsWith(basePath) ? fullPath.slice(basePath.length).replace(/^\//, '') : fullPath.slice(1);
    if (!slug || slug === 'skills-index') return `${dataBase}skills_index.yaml`;
    const name = slug.replace(/-/g, '_');
    return `${dataBase}safe_${name}.yaml`;
  };

  React.useEffect(() => {
    const filename = getYamlFilename();
    const indexFile = `${base}data/skills_index.yaml`;

    fetch(filename)
      .then(res => {
        if (!res.ok) throw new Error(`Could not load ${filename}`);
        return res.text();
      })
      .then(text => setData(yaml.load(text)))
      .catch(err => {
        console.error(err);
        if (filename !== indexFile) {
          fetch(indexFile)
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

  // Deep-link: scroll to ?sub=subdomain-id&comp=competency-id on load
  React.useEffect(() => {
    if (!data) return;
    const params = new URLSearchParams(window.location.search);
    const targetSub = params.get('sub');
    const targetComp = params.get('comp');
    if (!targetSub) return;
    const subdomains = Object.entries(data.domain.subdomains ?? {});
    const domainNumber = data.domain.index;
    const subIdx = subdomains.findIndex(([key]) => key === targetSub);
    if (subIdx < 0) return;
    const subNumber = `${domainNumber}.${subIdx + 1}`;
    setStickySubdomain(subdomains[subIdx][1]?.name ?? '');
    setStickySubNumber(subNumber);
    if (targetComp) {
      const comps = Object.entries(subdomains[subIdx][1].competencies ?? {});
      const compIdx = comps.findIndex(([key]) => key === targetComp);
      if (compIdx >= 0) {
        const compNumber = `${subNumber}.${compIdx + 1}`;
        setStickyCompetency(comps[compIdx][1]?.name ?? '');
        setStickyCompNumber(compNumber);
      }
    }
    // Delay scroll until refs are populated after render
    setTimeout(() => {
      if (targetComp) {
        const comps = Object.entries(subdomains[subIdx][1].competencies ?? {});
        const compIdx = comps.findIndex(([key]) => key === targetComp);
        if (compIdx >= 0) scrollToElement(compRefs.current[`${subNumber}.${compIdx + 1}`]);
      } else {
        scrollToElement(subdomainRefs.current[subNumber]);
      }
    }, 300);
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

    let threshold = 110;
    const isDesktop = window.innerWidth >= 992;
    if (isDesktop) {
      // Desktop: top of scrollAreaRef is stable (below sticky header/nav)
      threshold = scrollAreaRef.current.getBoundingClientRect().top + 23;
    } else {
      // Mobile: window scrolls, so get position of the sticky header/nav bottom
      const stickyNav = frameworkRef.current?.querySelector('.sticky-nav');
      if (stickyNav) {
        threshold = stickyNav.getBoundingClientRect().bottom + 10;
      }
    }

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

  // On mobile the scroll-area has overflow:visible so the window scrolls instead.
  // Mirror the same handleScroll onto the window so the sticky nav updates.
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      <nav className="sticky-nav" role="navigation" aria-label="Page sections">
        <ul className="nav nav-tabs sticky-nav-top" ref={subdomainTabsRef} role="tablist">
          {subdomains.map(([subKey, subVal], idx) => {
            const subNumber = `${domainNumber}.${idx + 1}`;
            return (
              <li key={subKey} className="nav-item" role="presentation">
                <button
                  className={`nav-link tab subdomain-tab${stickySubNumber === subNumber ? ' active' : ''}`}
                  role="tab"
                  onClick={() => scrollToElement(subdomainRefs.current[subNumber])}
                >
                  {subNumber} {subVal.name}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="nav nav-tabs sticky-nav-sub" ref={competencyTabsRef} role="tablist">
          {subdomains
            .find(([, subVal], idx) => `${domainNumber}.${idx + 1}` === stickySubNumber)
            ?.[1].competencies &&
            Object.entries(
              subdomains.find(([, subVal], idx) => `${domainNumber}.${idx + 1}` === stickySubNumber)[1].competencies
            ).map(([compKey, compVal], idx) => {
              const compNumber = `${stickySubNumber}.${idx + 1}`;
              return (
                <li key={compKey} className="nav-item" role="presentation">
                  <button
                    className={`nav-link tab competency-tab${stickyCompNumber === compNumber ? ' active' : ''}`}
                    role="tab"
                    onClick={() => scrollToElement(compRefs.current[compNumber])}
                  >
                    {compNumber} {compVal.name || compVal.id}
                  </button>
                </li>
              );
            })}
        </ul>
      </nav>

      {/* Scrollable content */}
      <div className="scroll-area p-2 pt-4" ref={scrollAreaRef} onScroll={handleScroll}>
        {data.domain.description && (
          <p className="domain-description">{data.domain.description}</p>
        )}
        {subdomains.map(([subKey, subVal], subIdx) => {
          const competencies = Object.entries(subVal.competencies || {});
          return (
            <div key={subKey} className="subdomain-section">
              <h2
                ref={el => { if (el) subdomainRefs.current[`${domainNumber}.${subIdx + 1}`] = el; }}
                className="subdomain-title"
                data-scroll-stop
              >
                <span className="section-number">{domainNumber}.{subIdx + 1}</span>
                {subVal.name}
              </h2>
              {subVal.description && (
                <p className="subdomain-description">{subVal.description}</p>
              )}

              {/* Tools, Technologies, and Standards at subdomain level */}
              {subVal.items?.length > 0 && (
                  <div className="subdomain-tech-section glass--soft">
                    <span className="tech-label">Tools, Technologies & Standards:</span>
                    <div className="tech-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      {subVal.items.map((item, idx) => (
                        <TechChip key={idx} item={item} />
                      ))}
                    </div>
                  </div>
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
                    data-scroll-stop
                  >
                    <h3>
                      <span className="comp-number">{compNumber}</span>
                      {compVal.name || compVal.id}
                    </h3>
                    <p className="competency-description">{compVal.description}</p>

                    {/* Experience-level selector */}
                    <div className="btn-group level-buttons" role="group" aria-label="Experience level">
                      {levels.map(([levelKey]) => (
                        <button
                          key={levelKey}
                          className={`btn level-btn${selectedLevel === levelKey ? ' active btn-primary' : ' btn-outline-primary'}`}
                          onClick={() => toggleLevel(compNumber, levelKey)}
                        >
                          {levelLabels[levelKey] || levelKey.charAt(0).toUpperCase() + levelKey.slice(1)}
                        </button>
                      ))}
                    </div>

                    {/* Unified proficiency panel */}
                    {selectedLevel && selectedLevelData && (
                      <div className="proficiency-panel" style={{ display: 'block', padding: '16px 0' }}>
                        <div className="proficiency-list-plain" style={{ marginBottom: '24px' }}>
                          <ul style={{ paddingLeft: '20px', margin: 0 }}>
                            {selectedLevelData.skills?.map((skill, sIdx) => (
                              <li key={sIdx} style={{ marginBottom: '8px' }}>
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                          <div className="proficiency-detail" style={{ borderTop: '1px solid var(--border-color, #e5e7eb)', paddingTop: '20px' }}>
                            <div style={{ marginBottom: '24px' }}>
                              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px', color: 'var(--primary-color)' }}>Core Concepts & Self-Study</h4>
                              {selectedLevelData?.core_concepts?.length > 0 ? (
                                <div className="training-list">
                                  {selectedLevelData.core_concepts.map((concept, idx) => (
                                    <ConceptCard key={idx} concept={concept} />
                                  ))}
                                </div>
                              ) : (
                                <p className="text-muted">No concepts listed for this level.</p>
                              )}
                            </div>
                            
                            <div>
                              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px', color: 'var(--primary-color)' }}>Qualifications</h4>
                              {selectedLevelData?.qualifications?.length > 0 ? (
                                <div className="qualifications-list">
                                  {selectedLevelData.qualifications.map((qual, idx) => (
                                    <QualificationCard key={idx} qualification={qual} />
                                  ))}
                                </div>
                              ) : (
                                <p className="text-muted">No qualifications listed for this level.</p>
                              )}
                            </div>
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
