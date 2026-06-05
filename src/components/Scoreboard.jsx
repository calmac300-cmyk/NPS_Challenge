import { useMemo } from 'react';

// Singulars in the dataset → plurals for display
const PLURAL = {
  'National Park':           'National Parks',
  'National Monument':       'National Monuments',
  'National Historic Site':  'National Historic Sites',
  'National Historical Park':'National Historical Parks',
  'National Memorial':       'National Memorials',
  'National Preserve':       'National Preserves',
  'National Recreation Area':'National Recreation Areas',
  'National Seashore':       'National Seashores',
  'National Lakeshore':      'National Lakeshores',
  'National Battlefield':    'National Battlefields',
  'National Battlefield Park':'National Battlefield Parks',
  'National Battlefield Site':'National Battlefield Sites',
  'National Military Park':  'National Military Parks',
  'National Scenic River':   'National Scenic Rivers',
  'National Parkway':        'National Parkways',
  'National Reserve':        'National Reserves',
};
const pluralType = (t) => PLURAL[t] ?? (t.endsWith('s') ? t : t + 's');
import {
  calcScores,
  calExclusive,
  bradenExclusive,
  pointsByType,
  getCountdown,
  unclaimedParksByRegion,
} from '../utils/scoring';

export default function Scoreboard({ sites }) {
  const scores = useMemo(() => calcScores(sites), [sites]);
  const calOnly = useMemo(() => calExclusive(sites), [sites]);
  const bradenOnly = useMemo(() => bradenExclusive(sites), [sites]);
  const typeBreakdown = useMemo(() => pointsByType(sites), [sites]);
  const countdown = useMemo(() => getCountdown(), []);
  const remainingRegions = useMemo(() => unclaimedParksByRegion(sites), [sites]);

  const gap = scores.bradenScore - scores.calScore;
  const gapText =
    gap === 0
      ? 'Tied'
      : gap > 0
      ? `Braden leads by ${gap} pts`
      : `Cal leads by ${Math.abs(gap)} pts`;

  // Top 5 exclusive sites for each player
  const calTop = [...calOnly].sort((a, b) => b.pts - a.pts).slice(0, 8);
  const bradenTop = [...bradenOnly].sort((a, b) => b.pts - a.pts).slice(0, 8);

  // Type chart — sort by total desc, show top types
  const typeEntries = Object.entries(typeBreakdown)
    .filter(([, v]) => v.cal > 0 || v.braden > 0)
    .sort(([, a], [, b]) => b.cal + b.braden - (a.cal + a.braden));
  const maxTypeTotal = Math.max(...typeEntries.map(([, v]) => Math.max(v.cal, v.braden)), 1);

  return (
    <div>
      {/* ── Score cards ── */}
      <div className="score-grid">
        <div className="score-card cal">
          <div className="score-name">Cal</div>
          <div className="score-pts">{scores.calScore}</div>
          <div className="score-meta">{scores.calSites} sites visited</div>
          <div className="score-pct" style={{ color: 'var(--wpa-sky)' }}>
            {scores.calPct.toFixed(1)}%
          </div>
        </div>

        <div className="vs-divider">vs.</div>

        <div className="score-card braden">
          <div className="score-name">Braden</div>
          <div className="score-pts">{scores.bradenScore}</div>
          <div className="score-meta">{scores.bradenSites} sites visited</div>
          <div className="score-pct" style={{ color: 'var(--wpa-red)' }}>
            {scores.bradenPct.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* ── Tug-of-war ── */}
      <div className="tug-wrap">
        <div className="tug-labels">
          <span style={{ color: 'var(--wpa-sky)' }}>Cal {scores.calPct.toFixed(1)}%</span>
          <span style={{ opacity: 0.6 }}>
            {(100 - scores.calPct - scores.bradenPct).toFixed(1)}% unclaimed
          </span>
          <span style={{ color: 'var(--wpa-red)' }}>Braden {scores.bradenPct.toFixed(1)}%</span>
        </div>
        <div className="tug-bar">
          <div className="tug-cal" style={{ width: `${scores.calPct}%` }} />
          <div className="tug-mid" />
          <div className="tug-braden" style={{ width: `${scores.bradenPct}%` }} />
        </div>
        <div className="tug-gap">{gapText}</div>
      </div>

      {/* ── Countdown ── */}
      <div className="countdown">
        {countdown.expired ? (
          <div className="countdown-label" style={{ fontSize: '1rem' }}>
            The campaign has ended.
          </div>
        ) : (
          <>
            <div className="countdown-num">
              {countdown.years}y {countdown.days}d
            </div>
            <div className="countdown-label">remaining until Dec 31, 2032</div>
          </>
        )}
      </div>

      {/* ── Points by site type ── */}
      <div className="type-chart">
        <div className="section-title">Points by site type</div>
        {typeEntries.map(([type, v]) => (
          <div key={type} className="type-block">
            <div className="type-block-name">{pluralType(type)}</div>
            <div className="type-bar-row">
              <span className="type-bar-player cal-player">Cal</span>
              <div className="type-bar-track">
                <div
                  className="type-bar-fill cal-fill"
                  style={{ width: `${(v.cal / maxTypeTotal) * 100}%` }}
                />
              </div>
              <span className="type-bar-val">{v.cal}</span>
            </div>
            <div className="type-bar-row">
              <span className="type-bar-player braden-player">Braden</span>
              <div className="type-bar-track">
                <div
                  className="type-bar-fill braden-fill"
                  style={{ width: `${(v.braden / maxTypeTotal) * 100}%` }}
                />
              </div>
              <span className="type-bar-val">{v.braden}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Exclusive territory ── */}
      <div className="section-title">Exclusive territory</div>
      <div className="exclusive-grid">
        <div className="exclusive-col cal">
          <div className="exclusive-header">Cal only ({calOnly.length})</div>
          <ul className="exclusive-list">
            {calTop.map((s) => (
              <li key={s.name}>
                <span>{s.name}</span>
                {s.pts === 2 && <span className="site-pts-badge">2pt</span>}
              </li>
            ))}
            {calOnly.length > 8 && (
              <li style={{ opacity: 0.6 }}>+{calOnly.length - 8} more</li>
            )}
          </ul>
        </div>
        <div className="exclusive-col braden">
          <div className="exclusive-header">Braden only ({bradenOnly.length})</div>
          <ul className="exclusive-list">
            {bradenTop.map((s) => (
              <li key={s.name}>
                <span>{s.name}</span>
                {s.pts === 2 && <span className="site-pts-badge">2pt</span>}
              </li>
            ))}
            {bradenOnly.length > 8 && (
              <li style={{ opacity: 0.6 }}>+{bradenOnly.length - 8} more</li>
            )}
          </ul>
        </div>
      </div>

      {/* ── Remaining prizes ── */}
      <div className="section-title" style={{ marginTop: '1.5rem' }}>
        Remaining 2pt parks (neither visited)
      </div>
      {remainingRegions.length === 0 ? (
        <p style={{ fontSize: '0.8rem', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
          All National Parks claimed! ◆
        </p>
      ) : (
        <div className="prizes-grid">
          {remainingRegions.map(({ region, parks }) => (
            <div key={region} className="prizes-region">
              <div className="prizes-region-name">{region}</div>
              <ul className="prizes-list">
                {parks.map((p) => (
                  <li key={p.name}>
                    {p.name}
                    <span style={{ fontSize: '0.6rem', opacity: 0.7 }}> · {p.state}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
