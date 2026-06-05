import { SITES, TOTAL_AVAILABLE_POINTS } from '../data/sites';

// Percentages are always out of TOTAL_AVAILABLE_POINTS (453),
// not combined scores — the original widget had this wrong.
export function calcScores(sites = SITES) {
  const calScore = sites.reduce((acc, s) => acc + (s.cal ? s.pts : 0), 0);
  const bradenScore = sites.reduce((acc, s) => acc + (s.braden ? s.pts : 0), 0);
  return {
    calScore,
    bradenScore,
    calPct: (calScore / TOTAL_AVAILABLE_POINTS) * 100,
    bradenPct: (bradenScore / TOTAL_AVAILABLE_POINTS) * 100,
    calSites: sites.filter((s) => s.cal).length,
    bradenSites: sites.filter((s) => s.braden).length,
    totalAvailablePoints: TOTAL_AVAILABLE_POINTS,
    totalSites: sites.length,
  };
}

export const calExclusive = (sites = SITES) => sites.filter((s) => s.cal && !s.braden);
export const bradenExclusive = (sites = SITES) => sites.filter((s) => s.braden && !s.cal);
export const bothVisited = (sites = SITES) => sites.filter((s) => s.cal && s.braden);
export const unclaimedParks = (sites = SITES) =>
  sites.filter((s) => s.pts === 2 && !s.cal && !s.braden);

export function pointsByType(sites = SITES) {
  const types = {};
  sites.forEach((s) => {
    if (!types[s.type]) types[s.type] = { cal: 0, braden: 0, total: 0 };
    if (s.cal) types[s.type].cal += s.pts;
    if (s.braden) types[s.type].braden += s.pts;
    types[s.type].total += s.pts;
  });
  return types;
}

export function byState(sites = SITES) {
  const states = {};
  sites.forEach((s) => {
    const st = s.state;
    if (!states[st]) states[st] = { cal: 0, braden: 0, both: 0, total: 0 };
    if (s.cal) states[st].cal++;
    if (s.braden) states[st].braden++;
    if (s.cal && s.braden) states[st].both++;
    states[st].total++;
  });
  return states;
}

export function getCountdown() {
  const deadline = new Date('2032-12-31T23:59:59');
  const now = new Date();
  const diff = deadline - now;
  if (diff <= 0) return { expired: true, text: 'The campaign has ended.' };
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(totalDays / 365);
  const days = totalDays % 365;
  return { expired: false, years, days, text: `${years} years, ${days} days remaining` };
}

const REGION_ORDER = ['East', 'South', 'Midwest', 'West', 'Territories'];
const STATE_REGION = {
  Maine: 'East', 'New Hampshire': 'East', Vermont: 'East', Massachusetts: 'East',
  'Rhode Island': 'East', Connecticut: 'East', 'New York': 'East', 'New Jersey': 'East',
  Pennsylvania: 'East', Delaware: 'East', Maryland: 'East', Virginia: 'East',
  'West Virginia': 'East', 'North Carolina': 'East',
  Kentucky: 'South', Tennessee: 'South', Arkansas: 'South', Louisiana: 'South',
  Mississippi: 'South', Alabama: 'South', Georgia: 'South', 'South Carolina': 'South',
  Florida: 'South', Oklahoma: 'South', Texas: 'South',
  Ohio: 'Midwest', Michigan: 'Midwest', Indiana: 'Midwest', Illinois: 'Midwest',
  Wisconsin: 'Midwest', Minnesota: 'Midwest', Iowa: 'Midwest', Missouri: 'Midwest',
  'North Dakota': 'Midwest', 'South Dakota': 'Midwest', Nebraska: 'Midwest', Kansas: 'Midwest',
  Montana: 'West', Idaho: 'West', Wyoming: 'West', Colorado: 'West',
  'New Mexico': 'West', Arizona: 'West', Utah: 'West', Nevada: 'West',
  California: 'West', Oregon: 'West', Washington: 'West', Alaska: 'West', Hawaii: 'West',
};

export function unclaimedParksByRegion(sites = SITES) {
  const parks = unclaimedParks(sites);
  const byRegion = {};
  parks.forEach((p) => {
    const region = STATE_REGION[p.state] ?? 'Territories';
    if (!byRegion[region]) byRegion[region] = [];
    byRegion[region].push(p);
  });
  return REGION_ORDER.map((r) => ({ region: r, parks: byRegion[r] ?? [] })).filter(
    (g) => g.parks.length > 0
  );
}
