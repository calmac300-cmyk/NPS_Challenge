import { useState, useMemo } from 'react';

const ALL = 'All';

export default function FieldLog({ sites, onToggle }) {
  const [search, setSearch] = useState('');
  const [visitorFilter, setVisitorFilter] = useState(ALL);
  const [stateFilter, setStateFilter] = useState(ALL);
  const [typeFilter, setTypeFilter] = useState(ALL);
  const [ptsFilter, setPtsFilter] = useState(ALL);
  const [sortCol, setSortCol] = useState('name');
  const [sortAsc, setSortAsc] = useState(true);

  const states = useMemo(
    () => [ALL, ...[...new Set(sites.map((s) => s.state))].sort()],
    [sites]
  );
  const types = useMemo(
    () => [ALL, ...[...new Set(sites.map((s) => s.type))].sort()],
    [sites]
  );

  const filtered = useMemo(() => {
    let list = sites;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.state.toLowerCase().includes(q) ||
          s.type.toLowerCase().includes(q)
      );
    }

    if (visitorFilter === 'Cal') list = list.filter((s) => s.cal);
    else if (visitorFilter === 'Braden') list = list.filter((s) => s.braden);
    else if (visitorFilter === 'Both') list = list.filter((s) => s.cal && s.braden);
    else if (visitorFilter === 'Neither') list = list.filter((s) => !s.cal && !s.braden);

    if (stateFilter !== ALL) list = list.filter((s) => s.state === stateFilter);
    if (typeFilter !== ALL) list = list.filter((s) => s.type === typeFilter);
    if (ptsFilter !== ALL) list = list.filter((s) => s.pts === Number(ptsFilter));

    list = [...list].sort((a, b) => {
      let av = a[sortCol];
      let bv = b[sortCol];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return sortAsc ? -1 : 1;
      if (av > bv) return sortAsc ? 1 : -1;
      return 0;
    });

    return list;
  }, [sites, search, visitorFilter, stateFilter, typeFilter, ptsFilter, sortCol, sortAsc]);

  function handleSort(col) {
    if (sortCol === col) setSortAsc((a) => !a);
    else { setSortCol(col); setSortAsc(true); }
  }

  function colHeader(col, label) {
    const active = sortCol === col;
    return (
      <th onClick={() => handleSort(col)}>
        {label} {active ? (sortAsc ? '▲' : '▼') : ''}
      </th>
    );
  }

  return (
    <div className="field-log">
      <div className="log-controls">
        <input
          className="log-search"
          placeholder="Search sites, states, types…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="log-select" value={visitorFilter} onChange={(e) => setVisitorFilter(e.target.value)}>
          {[ALL, 'Cal', 'Braden', 'Both', 'Neither'].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>

        <select className="log-select" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
          {states.map((s) => <option key={s}>{s}</option>)}
        </select>

        <select className="log-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>

        <select className="log-select" value={ptsFilter} onChange={(e) => setPtsFilter(e.target.value)}>
          <option value={ALL}>All pts</option>
          <option value="2">2pt (National Park)</option>
          <option value="1">1pt (Other)</option>
        </select>

        <span className="log-count">{filtered.length} / {sites.length}</span>
      </div>

      <div className="log-table-wrap">
        <table className="log-table">
          <thead>
            <tr>
              {colHeader('name', 'Site')}
              {colHeader('state', 'State')}
              {colHeader('type', 'Type')}
              {colHeader('pts', 'Pts')}
              <th>Cal</th>
              <th>Braden</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((site) => (
              <tr key={site.name}>
                <td>{site.name}</td>
                <td>{site.state}</td>
                <td>{site.type}</td>
                <td>
                  <span className={`pts-badge pts-${site.pts}`}>{site.pts}</span>
                </td>
                <td>
                  <button
                    className={`visit-toggle cal-toggle${site.cal ? ' checked' : ''}`}
                    title={site.cal ? 'Mark Cal unvisited' : 'Mark Cal visited'}
                    onClick={() => onToggle(site.name, 'cal')}
                  >
                    {site.cal ? '✓' : ''}
                  </button>
                </td>
                <td>
                  <button
                    className={`visit-toggle braden-toggle${site.braden ? ' checked' : ''}`}
                    title={site.braden ? 'Mark Braden unvisited' : 'Mark Braden visited'}
                    onClick={() => onToggle(site.name, 'braden')}
                  >
                    {site.braden ? '✓' : ''}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '1.5rem', opacity: 0.5, fontStyle: 'italic' }}>
                  No sites match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
