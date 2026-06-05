// NPS API geocoding — returns { siteName: { lat, lng } } for all sites with known coords.
// Get a free API key instantly at https://www.nps.gov/subjects/developer/get-started.htm
// Set VITE_NPS_API_KEY in your .env file.

const NPS_KEY = import.meta.env.VITE_NPS_API_KEY;
const CACHE_KEY = 'nps_coords_v2';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export const hasNpsKey = Boolean(NPS_KEY);

function normalize(name) {
  return name
    .toLowerCase()
    .replace(/national (park|monument|historic site|historical park|memorial|recreation area|preserve|lakeshore|seashore|battlefield|parkway|scenic river|trail|reserve|memorial park|military park|battlefield park)/g, '')
    .replace(/[^a-z0-9\s]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function bestMatch(siteName, lookup) {
  const n = normalize(siteName);
  // 1. Exact
  if (lookup[n]) return lookup[n];
  // 2. Our name is contained in an NPS name
  for (const [k, v] of Object.entries(lookup)) {
    if (k.includes(n) && n.length > 4) return v;
  }
  // 3. NPS name is contained in our name
  for (const [k, v] of Object.entries(lookup)) {
    if (n.includes(k) && k.length > 4) return v;
  }
  return null;
}

async function fetchAllNpsParks() {
  const parks = [];
  const limit = 500;
  let start = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = await fetch(
      `https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${start}&api_key=${NPS_KEY}`
    );
    if (!res.ok) throw new Error(`NPS API ${res.status}`);
    const json = await res.json();
    parks.push(...json.data);
    if (parks.length >= Number(json.total)) break;
    start += limit;
  }
  return parks;
}

/**
 * Fetch NPS park coordinates and match them to our sites list.
 * Results are cached in localStorage for 7 days.
 * Returns {} if no API key is configured.
 */
export async function fetchNpsCoords(sites) {
  if (!NPS_KEY) return {};

  // Return cached coords if still fresh
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const { data, expires } = JSON.parse(raw);
      if (Date.now() < expires) return data;
    }
  } catch { /* ignore */ }

  const parks = await fetchAllNpsParks();

  // Build normalized name → coords lookup from NPS data
  const lookup = {};
  for (const park of parks) {
    const lat = parseFloat(park.latitude);
    const lng = parseFloat(park.longitude);
    if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
      lookup[normalize(park.fullName)] = { lat, lng };
      if (park.name) lookup[normalize(park.name)] = { lat, lng };
    }
  }

  // Match our site names → coords
  const coords = {};
  for (const site of sites) {
    const match = bestMatch(site.name, lookup);
    if (match) coords[site.name] = match;
  }

  // Cache results
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: coords, expires: Date.now() + CACHE_TTL_MS })
    );
  } catch { /* ignore quota errors */ }

  return coords;
}
