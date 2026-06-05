import { SITES, TOTAL_AVAILABLE_POINTS } from './sites';

/**
 * Calculate current scores from the sites array.
 * Percentages are always out of TOTAL_AVAILABLE_POINTS (453),
 * NOT out of combined scores — that was the bug in the original widget.
 */
export function calcScores(sites = SITES) {
  const calScore = sites.reduce((acc, s) => acc + (s.cal ? s.pts : 0), 0);
  const bradenScore = sites.reduce((acc, s) => acc + (s.braden ? s.pts : 0), 0);
  const calSites = sites.filter((s) => s.cal).length;
  const bradenSites = sites.filter((s) => s.braden).length;

  return {
    calScore,
    bradenScore,
    calPct: ((calScore / TOTAL_AVAILABLE_POINTS) * 100).toFixed(1),
    bradenPct: ((bradenScore / TOTAL_AVAILABLE_POINTS) * 100).toFixed(1),
    calSites,
    bradenSites,
    totalAvailablePoints: TOTAL_AVAILABLE_POINTS,
    totalSites: sites.length,
  };
}

/** Sites only Cal has visited */
export function calExclusive(sites = SITES) {
  return sites.filter((s) => s.cal && !s.braden);
}

/** Sites only Braden has visited */
export function bradenExclusive(sites = SITES) {
  return sites.filter((s) => s.braden && !s.cal);
}

/** Sites both have visited */
export function bothVisited(sites = SITES) {
  return sites.filter((s) => s.cal && s.braden);
}

/** Group points by site type for a given visitor */
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

/** State-level summary: how many sites each person has in each state */
export function byState(sites = SITES) {
  const states = {};
  sites.forEach((s) => {
    const st = s.state.split(',')[0].trim();
    if (!states[st]) states[st] = { cal: 0, braden: 0, both: 0, total: 0 };
    if (s.cal) states[st].cal++;
    if (s.braden) states[st].braden++;
    if (s.cal && s.braden) states[st].both++;
    states[st].total++;
  });
  return states;
}

/** Countdown to Dec 31 2032 */
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
