import { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { byState } from '../utils/scoring';
import { fetchNpsCoords, hasNpsKey } from '../utils/nps';

const US_ATLAS = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const BASE_COLORS = {
  cal:     '#1B4D6E',
  braden:  '#8B2E1A',
  neither: '#C4AD7A',
  gold:    '#C8922A',
};

const FIPS = {
  '01':'Alabama','02':'Alaska','04':'Arizona','05':'Arkansas','06':'California',
  '08':'Colorado','09':'Connecticut','10':'Delaware','11':'District of Columbia',
  '12':'Florida','13':'Georgia','15':'Hawaii','16':'Idaho','17':'Illinois',
  '18':'Indiana','19':'Iowa','20':'Kansas','21':'Kentucky','22':'Louisiana',
  '23':'Maine','24':'Maryland','25':'Massachusetts','26':'Michigan','27':'Minnesota',
  '28':'Mississippi','29':'Missouri','30':'Montana','31':'Nebraska','32':'Nevada',
  '33':'New Hampshire','34':'New Jersey','35':'New Mexico','36':'New York',
  '37':'North Carolina','38':'North Dakota','39':'Ohio','40':'Oklahoma','41':'Oregon',
  '42':'Pennsylvania','44':'Rhode Island','45':'South Carolina','46':'South Dakota',
  '47':'Tennessee','48':'Texas','49':'Utah','50':'Vermont','51':'Virginia',
  '53':'Washington','54':'West Virginia','55':'Wisconsin','56':'Wyoming',
};

function stateColor(stateName, stateStats) {
  const s = stateStats[stateName];
  if (!s || (s.cal === 0 && s.braden === 0)) return BASE_COLORS.neither;
  if (s.cal > 0 && s.braden === 0) return BASE_COLORS.cal;
  if (s.braden > 0 && s.cal === 0) return BASE_COLORS.braden;
  const calRatio = s.cal / (s.cal + s.braden);
  const linear = Math.abs(calRatio - 0.5) * 2;
  const dominance = Math.pow(linear, 0.3);
  const baseColor = calRatio >= 0.5 ? BASE_COLORS.cal : BASE_COLORS.braden;
  return d3.interpolateRgb(BASE_COLORS.gold, baseColor)(dominance);
}

function dotColor(site) {
  if (site.cal && site.braden) return BASE_COLORS.gold;
  if (site.cal) return BASE_COLORS.cal;
  return BASE_COLORS.braden;
}

export default function CampaignMap({ sites, onToggle }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const topoRef = useRef(null);
  const tooltipRef = useRef(null);
  const projRef = useRef(null);
  const zoomRef = useRef(null);
  const zoomTransformRef = useRef(d3.zoomIdentity);

  const [selectedState, setSelectedState] = useState(null);
  const [siteCoords, setSiteCoords] = useState({});
  const [coordsLoading, setCoordsLoading] = useState(hasNpsKey);

  const stateStats = useMemo(() => byState(sites), [sites]);

  useEffect(() => {
    if (!hasNpsKey) return;
    fetchNpsCoords(sites)
      .then(setSiteCoords)
      .catch(console.error)
      .finally(() => setCoordsLoading(false));
  }, []);

  const draw = useCallback(() => {
    if (!topoRef.current || !containerRef.current || !svgRef.current) return;

    const container = containerRef.current;
    const W = container.offsetWidth;
    if (W === 0) return;
    const H = Math.round(W * 0.65);

    const states = topojson.feature(topoRef.current, topoRef.current.objects.states);
    const mesh = topojson.mesh(
      topoRef.current, topoRef.current.objects.states, (a, b) => a !== b
    );

    const projection = d3.geoAlbersUsa()
      .fitExtent([[16, 16], [W - 16, H - 16]], states);
    projRef.current = projection;

    const path = d3.geoPath().projection(projection);

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${W} ${H}`)
      .attr('width', W)
      .attr('height', H)
      .style('cursor', 'grab');

    svg.selectAll('*').remove();

    // Clip so panned content doesn't bleed outside SVG
    svg.append('defs').append('clipPath').attr('id', 'map-clip')
      .append('rect').attr('width', W).attr('height', H);

    svg.append('rect').attr('width', W).attr('height', H)
      .attr('fill', BASE_COLORS.cal).attr('opacity', 0.04);

    // All map content lives in this group — zoom transforms it
    const g = svg.append('g')
      .attr('class', 'map-root')
      .attr('clip-path', 'url(#map-clip)');

    // Restore zoom position
    g.attr('transform', zoomTransformRef.current);

    const currentK = zoomTransformRef.current.k ?? 1;

    // State fills
    g.append('g').selectAll('path')
      .data(states.features)
      .join('path')
      .attr('d', path)
      .attr('fill', (d) => stateColor(FIPS[String(d.id).padStart(2, '0')], stateStats))
      .attr('stroke', 'none')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        const name = FIPS[String(d.id).padStart(2, '0')];
        if (name) setSelectedState((prev) => (prev === name ? null : name));
      })
      .on('mousemove', function (event, d) {
        const name = FIPS[String(d.id).padStart(2, '0')] ?? 'Unknown';
        const s = stateStats[name];
        const tip = tooltipRef.current;
        if (!tip) return;
        tip.style.display = 'block';
        tip.style.left = `${event.offsetX + 14}px`;
        tip.style.top = `${event.offsetY - 10}px`;
        tip.innerHTML = `<strong>${name}</strong><br/>Cal: ${s?.cal ?? 0} &nbsp;|&nbsp; Braden: ${s?.braden ?? 0}`;
      })
      .on('mouseleave', () => {
        if (tooltipRef.current) tooltipRef.current.style.display = 'none';
      });

    // Selected state highlight
    if (selectedState) {
      const feature = states.features.find(
        (f) => FIPS[String(f.id).padStart(2, '0')] === selectedState
      );
      if (feature) {
        g.append('path').datum(feature)
          .attr('fill', 'none')
          .attr('stroke', BASE_COLORS.gold)
          .attr('stroke-width', 2 / currentK)
          .attr('d', path);
      }
    }

    // State borders — stroke scales down as you zoom in
    g.append('path').datum(mesh)
      .attr('class', 'border-path')
      .attr('fill', 'none')
      .attr('stroke', '#5C3D1E')
      .attr('stroke-width', 0.5 / currentK)
      .attr('stroke-opacity', 0.5)
      .attr('d', path);

    // Site dots
    const visitedWithCoords = sites.filter(
      (s) => (s.cal || s.braden) && siteCoords[s.name]
    );
    if (visitedWithCoords.length > 0) {
      g.append('g').selectAll('circle')
        .data(visitedWithCoords)
        .join('circle')
        .each(function (s) {
          const { lat, lng } = siteCoords[s.name];
          const pos = projection([lng, lat]);
          if (!pos) return;
          d3.select(this)
            .attr('cx', pos[0]).attr('cy', pos[1])
            .attr('r', (s.pts === 2 ? 5 : 3) / currentK)
            .attr('fill', dotColor(s))
            .attr('stroke', '#F5EDD6')
            .attr('stroke-width', 0.8 / currentK)
            .attr('opacity', 0.9)
            .style('pointer-events', 'none');
        });
    }

    // Zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [W, H]])
      .on('zoom', (event) => {
        zoomTransformRef.current = event.transform;
        const k = event.transform.k;
        g.attr('transform', event.transform);
        g.selectAll('.border-path').attr('stroke-width', 0.5 / k);
        g.selectAll('circle')
          .attr('r', function () {
            const r = parseFloat(d3.select(this).attr('data-base-r') || 3);
            return r / k;
          })
          .attr('stroke-width', 0.8 / k);
      })
      .on('start', () => {
        d3.select(svgRef.current).style('cursor', 'grabbing');
      })
      .on('end', () => {
        d3.select(svgRef.current).style('cursor', 'grab');
      });

    // Store base-r on dots so zoom handler can scale them
    g.selectAll('circle').each(function (s) {
      d3.select(this).attr('data-base-r', s?.pts === 2 ? 5 : 3);
    });

    zoomRef.current = zoom;
    svg.call(zoom).call(zoom.transform, zoomTransformRef.current);

    // Clicking the SVG background deselects state
    svg.on('click', () => setSelectedState(null));
  }, [stateStats, siteCoords, selectedState, sites]);

  useEffect(() => {
    fetch(US_ATLAS)
      .then((r) => r.json())
      .then((topo) => { topoRef.current = topo; draw(); })
      .catch(console.error);
  }, []);

  useEffect(() => { draw(); }, [draw]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      // Reset zoom on resize — projection coordinates change completely
      zoomTransformRef.current = d3.zoomIdentity;
      draw();
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [draw]);

  // Zoom control handlers
  const zoomIn = useCallback(() => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(300)
      .call(zoomRef.current.scaleBy, 1.6);
  }, []);

  const zoomOut = useCallback(() => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(300)
      .call(zoomRef.current.scaleBy, 1 / 1.6);
  }, []);

  const resetZoom = useCallback(() => {
    if (!svgRef.current || !zoomRef.current) return;
    zoomTransformRef.current = d3.zoomIdentity;
    d3.select(svgRef.current).transition().duration(400)
      .call(zoomRef.current.transform, d3.zoomIdentity);
  }, []);

  // Territory stats
  const calStates    = Object.values(stateStats).filter((s) => s.cal > 0 && s.braden === 0).length;
  const bradenStates = Object.values(stateStats).filter((s) => s.braden > 0 && s.cal === 0).length;
  const bothStates   = Object.values(stateStats).filter((s) => s.cal > 0 && s.braden > 0).length;
  const neitherStates = Object.keys(FIPS).length - calStates - bradenStates - bothStates;

  const stateSites = selectedState ? sites.filter((s) => s.state === selectedState) : [];
  const coordsCoverage = Object.keys(siteCoords).length;

  return (
    <div className="campaign-map">
      {/* Map + zoom controls */}
      <div style={{ position: 'relative' }} ref={containerRef}>
        <svg ref={svgRef} style={{ display: 'block', width: '100%' }} />

        {/* Zoom buttons */}
        <div className="map-zoom-controls">
          <button className="map-zoom-btn" onClick={zoomIn} title="Zoom in">+</button>
          <button className="map-zoom-btn" onClick={zoomOut} title="Zoom out">−</button>
          <button className="map-zoom-btn map-zoom-reset" onClick={resetZoom} title="Reset zoom">↺</button>
        </div>

        {/* Tooltip */}
        <div ref={tooltipRef} style={{
          display: 'none', position: 'absolute', pointerEvents: 'none',
          background: 'var(--wpa-cream)', border: '1px solid var(--wpa-brown)',
          padding: '0.35rem 0.6rem', fontSize: '0.78rem',
          fontFamily: 'Josefin Slab, serif', color: 'var(--wpa-brown)', lineHeight: 1.5,
        }} />
      </div>

      {/* Legend */}
      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-swatch" style={{ background: BASE_COLORS.cal }} />Cal only
        </div>
        <div className="legend-item">
          <span className="legend-swatch" style={{
            background: `linear-gradient(to right, ${BASE_COLORS.cal}, ${BASE_COLORS.gold}, ${BASE_COLORS.braden})`,
          }} />Contested (fades to gold at 50/50)
        </div>
        <div className="legend-item">
          <span className="legend-swatch" style={{ background: BASE_COLORS.braden }} />Braden only
        </div>
        <div className="legend-item">
          <span className="legend-swatch" style={{ background: BASE_COLORS.neither }} />Neither
        </div>
      </div>

      {/* NPS dot legend */}
      {coordsCoverage > 0 && (
        <div className="map-dot-legend">
          <div className="map-dot-legend-item">
            <span className="dot-swatch" style={{ background: BASE_COLORS.cal }} />Cal visited
          </div>
          <div className="map-dot-legend-item">
            <span className="dot-swatch" style={{ background: BASE_COLORS.braden }} />Braden visited
          </div>
          <div className="map-dot-legend-item">
            <span className="dot-swatch" style={{ background: BASE_COLORS.gold }} />Both visited
          </div>
          <div className="map-dot-legend-item" style={{ opacity: 0.6 }}>
            Large dot = 2pt park · {coordsCoverage} sites geocoded
          </div>
        </div>
      )}
      {coordsLoading && (
        <div style={{ textAlign: 'center', fontSize: '0.78rem', opacity: 0.6 }}>
          Loading NPS coordinates…
        </div>
      )}

      {/* Territory stats */}
      <div className="map-stats">
        <div className="map-stat">
          <div className="map-stat-num" style={{ color: BASE_COLORS.cal }}>{calStates}</div>
          <div className="map-stat-label">Cal exclusive</div>
        </div>
        <div className="map-stat">
          <div className="map-stat-num" style={{ color: BASE_COLORS.gold }}>{bothStates}</div>
          <div className="map-stat-label">Contested</div>
        </div>
        <div className="map-stat">
          <div className="map-stat-num" style={{ color: BASE_COLORS.braden }}>{bradenStates}</div>
          <div className="map-stat-label">Braden exclusive</div>
        </div>
        <div className="map-stat">
          <div className="map-stat-num" style={{ opacity: 0.45 }}>{neitherStates}</div>
          <div className="map-stat-label">Unclaimed</div>
        </div>
      </div>

      {/* State click panel */}
      {selectedState && (
        <div className="map-state-panel">
          <div className="map-state-panel-header">
            <span className="map-state-panel-title">
              {selectedState} · {stateSites.length} sites
            </span>
            <button className="map-panel-close" onClick={() => setSelectedState(null)}>
              close ✕
            </button>
          </div>
          <ul className="map-state-site-list">
            {stateSites.map((site) => (
              <li key={site.name} className="map-state-site-row">
                <span className="map-state-site-name">
                  {site.name}
                  {site.pts === 2 && <span className="pts-badge" style={{ marginLeft: '0.4rem' }}>2pt</span>}
                </span>
                <span className="map-state-site-type">{site.type}</span>
                {onToggle && (
                  <>
                    <button
                      className={`visit-toggle cal-toggle${site.cal ? ' checked' : ''}`}
                      onClick={() => onToggle(site.name, 'cal')}
                    >{site.cal ? '✓' : ''}</button>
                    <button
                      className={`visit-toggle braden-toggle${site.braden ? ' checked' : ''}`}
                      onClick={() => onToggle(site.name, 'braden')}
                    >{site.braden ? '✓' : ''}</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
