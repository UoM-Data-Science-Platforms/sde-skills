import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const require = createRequire(path.join(rootDir, 'astro-app', 'package.json'));
const yaml = require('js-yaml');

const csvPath = path.join(rootDir, 'CF_Objective_Outcome_Mapping_Completed.csv');
const dataDir = path.join(rootDir, 'astro-app', 'public', 'data');
const outJsonPath = path.join(rootDir, 'astro-app', 'src', 'data', 'forge26_outcomes.json');

const files = fs.readdirSync(dataDir).filter(f => f.startsWith('safe_') && f.endsWith('.yaml'));
const mapping = {};

files.forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
  const data = yaml.load(content);
  const domain = data.domain;
  const domainNumber = domain.index;
  const domainSlug = domain.id.replace(/^safe-/, '');
  
  const subdomains = Object.entries(domain.subdomains || {});
  subdomains.forEach(([subKey, subVal], subIdx) => {
    const subNumber = `${domainNumber}.${subIdx + 1}`;
    mapping[subNumber] = {
      type: 'subdomain',
      domainSlug,
      domainNumber,
      domainName: domain.name,
      subKey,
      subName: subVal.name,
      subNumber,
      path: `${domainSlug}/?sub=${subKey}`
    };
    const competencies = Object.entries(subVal.competencies || {});
    competencies.forEach(([compKey, compVal], compIdx) => {
      const compNumber = `${subNumber}.${compIdx + 1}`;
      mapping[compNumber] = {
        type: 'competency',
        domainSlug,
        domainNumber,
        domainName: domain.name,
        subKey,
        subName: subVal.name,
        compKey,
        compNumber,
        compName: compVal.name || compVal.id,
        path: `${domainSlug}/?sub=${subKey}&comp=${compKey}`
      };
    });
  });
});

function parseCSV(text) {
  const lines = [];
  let currentRow = [];
  let currentVal = '';
  let insideQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentVal += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentVal.trim());
      if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
        lines.push(currentRow);
      }
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  if (currentVal || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    lines.push(currentRow);
  }
  return lines;
}

const csvContent = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(csvContent);
const headers = rows[0];
const data = rows.slice(1);

const outcomes = data.map((r, idx) => {
  const session = r[headers.indexOf('Session')];
  const objective = r[headers.indexOf('Objective')];
  const domainCol = r[headers.indexOf('Domain')];
  const subdomainCol = r[headers.indexOf('Subdomain')];
  const compCol = r[headers.indexOf('Competency item / reference')];
  const levelCol = r[headers.indexOf('Level')];
  const strengthCol = r[headers.indexOf('Mapping strength')];
  const rationaleCol = r[headers.indexOf('Rationale')];
  const sourceCol = r[headers.indexOf('Framework source')];

  const m3 = compCol.match(/^(\d+\.\d+\.\d+)/);
  const m2 = subdomainCol.match(/^(\d+\.\d+)/);
  
  let code = '';
  let name = '';
  let title = '';
  let relativePath = '';
  let domainSlug = '';
  
  const levelSuffix = levelCol.toLowerCase().startsWith('entry') ? 'e'
    : (levelCol.toLowerCase().startsWith('mid') ? 'm'
    : (levelCol.toLowerCase().startsWith('senior') ? 's' : ''));

  if (m3) {
    const num = m3[1];
    code = `${num}${levelSuffix}`;
    const mapped = mapping[num];
    if (mapped) {
      domainSlug = mapped.domainSlug;
      name = mapped.compName;
      title = `${num} ${mapped.compName} (${levelCol})`;
      relativePath = `${mapped.path}${levelSuffix ? `&level=${levelCol.toLowerCase()}` : ''}`;
    }
  } else if (compCol.includes('Subdomain-level mapping') && m2) {
    const num = m2[1];
    code = `${num}${levelSuffix}`;
    const mapped = mapping[num];
    if (mapped) {
      domainSlug = mapped.domainSlug;
      name = mapped.subName;
      title = `${num} ${mapped.subName} (Subdomain, ${levelCol})`;
      relativePath = mapped.path;
    }
  } else {
    code = '—';
    name = compCol;
    title = compCol;
    relativePath = 'cf-overview/';
    domainSlug = 'cf-overview';
  }

  return {
    id: idx + 1,
    session,
    objective,
    competencyCode: code,
    competencyName: name,
    competencyTitle: title,
    competencyPath: relativePath,
    domainSlug,
    mappingStrength: strengthCol,
    rationale: rationaleCol,
    original: {
      domain: domainCol,
      subdomain: subdomainCol,
      competencyItem: compCol,
      level: levelCol,
      source: sourceCol
    }
  };
});

fs.writeFileSync(outJsonPath, JSON.stringify(outcomes, null, 2), 'utf8');
console.log(`Successfully compiled ${outcomes.length} outcomes to ${outJsonPath}`);
