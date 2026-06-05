import { useState, useMemo, useRef } from 'react';
import { isConfigured } from '../utils/firebase';

const EMPTY_FORM = { name: '', state: '', type: '', pts: 1, cal: false, braden: false };

export default function LogVisit({ sites, onToggle, onAddSite }) {
  const [query, setQuery] = useState('');
  const [selectedSite, setSelectedSite] = useState(null);
  const [calChecked, setCalChecked] = useState(false);
  const [bradenChecked, setBradenChecked] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState(EMPTY_FORM);
  const [addConfirm, setAddConfirm] = useState('');
  const inputRef = useRef(null);

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return sites
      .filter((s) => s.name.toLowerCase().includes(q) || s.state.toLowerCase().includes(q))
      .slice(0, 12);
  }, [query, sites]);

  function selectSite(site) {
    setSelectedSite(site);
    setCalChecked(site.cal);
    setBradenChecked(site.braden);
    setQuery(site.name);
    setConfirmation('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedSite) return;

    const promises = [];
    if (calChecked !== selectedSite.cal)
      promises.push(onToggle(selectedSite.name, 'cal'));
    if (bradenChecked !== selectedSite.braden)
      promises.push(onToggle(selectedSite.name, 'braden'));

    await Promise.all(promises);
    setConfirmation(`Saved: ${selectedSite.name}`);
    setTimeout(() => setConfirmation(''), 3000);
  }

  async function handleAddSite(e) {
    e.preventDefault();
    if (!addForm.name.trim()) return;
    await onAddSite({ ...addForm, pts: Number(addForm.pts) });
    setAddConfirm(`Added: ${addForm.name}`);
    setAddForm(EMPTY_FORM);
    setTimeout(() => setAddConfirm(''), 3000);
  }

  function clearSelection() {
    setSelectedSite(null);
    setQuery('');
    setCalChecked(false);
    setBradenChecked(false);
    setConfirmation('');
  }

  const changed =
    selectedSite &&
    (calChecked !== selectedSite.cal || bradenChecked !== selectedSite.braden);

  return (
    <div className="log-visit">
      {!isConfigured && (
        <div className="sync-warning">
          ⚠ Firebase not configured — changes will save locally in this session only.
          See .env.example to enable real-time sync between you and Braden.
        </div>
      )}

      {/* ── Log a visit ── */}
      <div className="section-title">Log a visit</div>
      <form className="visit-form" onSubmit={handleSubmit}>

        {/* Step 1: Search */}
        <div className="form-field">
          <label className="form-label">Search site</label>
          <input
            ref={inputRef}
            className="form-input"
            placeholder="Type a site or state name…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (selectedSite && e.target.value !== selectedSite.name) clearSelection();
            }}
            autoComplete="off"
          />
          {searchResults.length > 0 && !selectedSite && (
            <div className="search-results">
              {searchResults.map((s) => (
                <div
                  key={s.name}
                  className="search-result-item"
                  onClick={() => selectSite(s)}
                >
                  <span>{s.name}</span>
                  <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>
                    {s.state} · {s.pts === 2 ? '2pt' : '1pt'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Steps 2+3: auto-filled details */}
        {selectedSite && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-field">
                <label className="form-label">Type</label>
                <input className="form-input" value={selectedSite.type} readOnly />
              </div>
              <div className="form-field">
                <label className="form-label">Points</label>
                <input className="form-input" value={selectedSite.pts} readOnly />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Who visited?</label>
              <div className="checkbox-group">
                <label className="checkbox-label" style={{ color: 'var(--wpa-sky)' }}>
                  <input
                    type="checkbox"
                    checked={calChecked}
                    onChange={(e) => setCalChecked(e.target.checked)}
                  />
                  Cal
                </label>
                <label className="checkbox-label" style={{ color: 'var(--wpa-red)' }}>
                  <input
                    type="checkbox"
                    checked={bradenChecked}
                    onChange={(e) => setBradenChecked(e.target.checked)}
                  />
                  Braden
                </label>
              </div>
            </div>

            <button className="submit-btn" type="submit" disabled={!changed}>
              {changed ? 'Save visit' : 'No changes'}
            </button>

            {confirmation && <div className="confirmation">✓ {confirmation}</div>}
          </>
        )}
      </form>

      {/* ── Add a new site ── */}
      <div className="section-title">New site not in dataset</div>
      <div className="add-site-form">
        <button className="add-site-toggle" onClick={() => setShowAdd((v) => !v)}>
          {showAdd ? '▲ Hide form' : '+ Add new site'}
        </button>

        {showAdd && (
          <form onSubmit={handleAddSite}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Site name *</label>
                <input
                  className="form-input"
                  required
                  value={addForm.name}
                  onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. New Site NM"
                />
              </div>
              <div className="form-field">
                <label className="form-label">State</label>
                <input
                  className="form-input"
                  value={addForm.state}
                  onChange={(e) => setAddForm((f) => ({ ...f, state: e.target.value }))}
                  placeholder="e.g. Wyoming"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Type</label>
                <input
                  className="form-input"
                  value={addForm.type}
                  onChange={(e) => setAddForm((f) => ({ ...f, type: e.target.value }))}
                  placeholder="e.g. National Park"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Points</label>
                <select
                  className="form-input"
                  value={addForm.pts}
                  onChange={(e) => setAddForm((f) => ({ ...f, pts: Number(e.target.value) }))}
                >
                  <option value={2}>2 — National Park</option>
                  <option value={1}>1 — Other</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Who visited?</label>
                <div className="checkbox-group">
                  <label className="checkbox-label" style={{ color: 'var(--wpa-sky)' }}>
                    <input
                      type="checkbox"
                      checked={addForm.cal}
                      onChange={(e) => setAddForm((f) => ({ ...f, cal: e.target.checked }))}
                    />
                    Cal
                  </label>
                  <label className="checkbox-label" style={{ color: 'var(--wpa-red)' }}>
                    <input
                      type="checkbox"
                      checked={addForm.braden}
                      onChange={(e) => setAddForm((f) => ({ ...f, braden: e.target.checked }))}
                    />
                    Braden
                  </label>
                </div>
              </div>
            </div>

            <button className="submit-btn" type="submit">Add site</button>
            {addConfirm && <div className="confirmation">✓ {addConfirm}</div>}
          </form>
        )}
      </div>
    </div>
  );
}
