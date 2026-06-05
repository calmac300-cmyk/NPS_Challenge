# NPS Challenge Tracker — Cal vs. Braden
**Campaign deadline: December 31, 2032**

A WPA-aesthetic National Parks challenge tracker. Two explorers racing to visit the most NPS sites by 2032.

---

## Stack
- **React Native + Expo** (per existing app pattern)
- **expo-sqlite** or AsyncStorage for persistence (see `src/utils/storage.js`)
- **react-native-maps** or a web D3 choropleth for the campaign map
- For web deployment: standard React + D3 works cleanly

---

## Current scores (from Google Sheets import)
| | Points | Sites visited | % of 453 total pts |
|---|---|---|---|
| **Cal** | 40 | 30 | **8.8%** |
| **Braden** | 59–61 | 43 | **13.0–13.5%** |

> Note: Braden shows 61pts in the spreadsheet vs 59 computed here — 2 sites may be
> missing from this dataset. Cross-check against the original sheet:
> https://docs.google.com/spreadsheets/d/103XYOVd4Iw3WLMInvXjYYpJQpNYD0I4vhCT0FodXwNk

---

## Known bugs to fix (from prototype)

### 1. Percentage calculation was wrong ⚠️
The original widget calculated percentages as `score / (calScore + bradenScore)`,
which inflated both numbers to ~21% and ~29%. The correct formula is always:

```js
pct = score / TOTAL_AVAILABLE_POINTS  // 453
```

This is already fixed in `src/utils/scoring.js` — `calcScores()` returns correct values.

### 2. Campaign Map was clipped and oddly arranged
The D3 choropleth projection needs:
- `geoAlbersUsa()` with explicit `.scale()` and `.translate()` relative to actual container width
- Wait for container to mount before reading `offsetWidth` — the prototype fired before layout
- Alaska and Hawaii insets render fine with AlbersUSA; don't override their positions
- Suggested fix: wrap the map SVG in a ResizeObserver (web) or onLayout callback (RN)
  and re-project when dimensions change

### 3. Log Visit — autofill type and points from site selection
When a user picks a site from the search dropdown:
- Auto-populate the **Type** field (read-only display, not editable)
- Auto-populate the **Points** field (read-only: 2 for National Park, 1 for all others)
- Pre-check the visitor checkboxes based on current visit status
- Only the visitor checkboxes should be editable after selection

### 4. Remove "Sites Visited by State" chart
That bar chart was cluttered and not useful at this scale.

**Suggested replacement:** A "Remaining Prizes" panel — list the highest-value
unvisited sites (all 2-pt National Parks neither has been to), sorted by geographic
region, to help plan future trips. Or a simple "Points Gap" stat card showing
`bradenScore - calScore` and what sites would close the gap.

---

## Data
- **391 sites** in `src/data/sites.js`
- **453 total available points** (62 National Parks × 2pts + 329 other sites × 1pt)
- Each site: `{ name, state, type, pts, cal, braden }`
- `cal` and `braden` are booleans — `true` = visited

### Adding new sites
The spreadsheet may have sites not in this dataset. To add:
```js
{ name: "Site Name", state: "State", type: "National Park", pts: 2, cal: false, braden: false }
```
Points rule: `pts: 2` for National Parks only, `pts: 1` for everything else.

### Persistence
`src/utils/storage.js` has a swappable async wrapper. For Expo:
```js
import AsyncStorage from '@react-native-async-storage/async-storage';
// Replace window.storage calls with AsyncStorage.getItem / setItem
```

---

## WPA Design System

### Colors
| Token | Hex | Use |
|---|---|---|
| `--wpa-cream` | `#F5EDD6` | Background |
| `--wpa-tan` | `#E8D9B0` | Surfaces, borders |
| `--wpa-brown` | `#5C3D1E` | Primary text, borders |
| `--wpa-forest` | `#2D4A1E` | Header, buttons |
| `--wpa-sky` | `#1B4D6E` | Cal color, map bg |
| `--wpa-gold` | `#C8922A` | Accents, both-visited |
| `--wpa-red` | `#8B2E1A` | Braden color |

### Typography
- **Display/headings:** Playfair Display (700, 900)
- **Body:** Libre Baskerville (400 regular, 700 bold, italic)
- Avoid Inter/Roboto — they kill the WPA feel

### Aesthetic notes
- Uppercase labels with `letter-spacing: 2–3px`
- Thin `1px` borders, not rounded
- `◆` diamond ornaments as section dividers
- Progress bars fill from left (Cal) and right (Braden) toward center
- Map state fills: Cal=`#1B4D6E`, Braden=`#8B2E1A`, Both=`#C8922A`, Unclaimed=`#C4AD7A`

---

## Tabs / Screens

### 1. Scoreboard
- Head-to-head score cards (large Playfair numerals)
- Tug-of-war progress bar
- Points by site type chart (keep this one — it's useful)
- Exclusive territory lists (Cal only / Braden only)
- Countdown to Dec 31 2032

### 2. Campaign Map
- D3 choropleth: state fill by visit status
- Dot layer: individual visited sites (larger dot = 2pt park)
- Territory stats: Cal exclusive / contested / Braden exclusive

### 3. Field Log
- Full searchable, filterable table of all 391 sites
- Filters: visitor (Cal/Braden/Both/Neither), state, type, points
- Inline toggle buttons to mark/unmark visits directly from the table
- Toggle immediately saves to storage and recalculates scores

### 4. Log Visit
- **Step 1:** Search and select a site from the full list
- **Step 2:** Auto-display site name, type (read-only), points (read-only)
- **Step 3:** Check who visited (Cal / Braden checkboxes)
- **Step 4:** Submit → save, recalculate, show confirmation
- Secondary section: "Add New Site" form for sites not in the dataset

---

## File structure
```
src/
  data/
    sites.js          ← full 391-site dataset + TOTAL_AVAILABLE_POINTS
  utils/
    scoring.js        ← calcScores(), byState(), pointsByType(), getCountdown()
    storage.js        ← async load/save wrapper (swap for AsyncStorage in RN)
  components/
    Scoreboard.jsx    ← tab 1
    CampaignMap.jsx   ← tab 2 (needs D3 fix — see bug #2 above)
    FieldLog.jsx      ← tab 3
    LogVisit.jsx      ← tab 4 (needs autofill fix — see bug #3 above)
```
