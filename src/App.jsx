import { useState, useEffect, useCallback } from 'react';
import { SITES } from './data/sites';
import { subscribeSites, toggleVisit, addSite, isConfigured } from './utils/firebase';
import Scoreboard from './components/Scoreboard';
import CampaignMap from './components/CampaignMap';
import FieldLog from './components/FieldLog';
import LogVisit from './components/LogVisit';
import posterWildlife from './assets/poster-wildlife.jpg';
import posterAcadia from './assets/poster-acadia.jpg';

const TABS = ['Scoreboard', 'Campaign Map', 'Field Log', 'Log Visit'];

export default function App() {
  const [sites, setSites] = useState(SITES);
  const [activeTab, setActiveTab] = useState(0);
  const [syncStatus, setSyncStatus] = useState(isConfigured ? 'connecting' : 'offline');

  useEffect(() => {
    const unsub = subscribeSites(
      (updatedSites) => {
        setSites(updatedSites);
        setSyncStatus('live');
      },
      (err) => {
        console.error('Firestore error:', err);
        setSyncStatus('offline');
      }
    );
    return unsub;
  }, []);

  const handleToggle = useCallback(
    async (siteName, visitor) => {
      const site = sites.find((s) => s.name === siteName);
      if (!site) return;

      if (isConfigured) {
        await toggleVisit(siteName, visitor, site[visitor]);
        // State updates via onSnapshot
      } else {
        setSites((prev) =>
          prev.map((s) => (s.name === siteName ? { ...s, [visitor]: !s[visitor] } : s))
        );
      }
    },
    [sites]
  );

  const handleAddSite = useCallback(
    async (site) => {
      if (isConfigured) {
        await addSite(site);
        // State updates via onSnapshot
      } else {
        setSites((prev) => [...prev, site]);
      }
    },
    []
  );

  const tabComponents = [
    <Scoreboard key="scoreboard" sites={sites} />,
    <CampaignMap key="map" sites={sites} onToggle={handleToggle} />,
    <FieldLog key="log" sites={sites} onToggle={handleToggle} />,
    <LogVisit key="visit" sites={sites} onToggle={handleToggle} onAddSite={handleAddSite} />,
  ];

  const syncLabel =
    syncStatus === 'live'
      ? '● LIVE'
      : syncStatus === 'connecting'
      ? '○ SYNCING'
      : '✕ LOCAL ONLY';

  return (
    <div className="app-shell">
      <div className="poster-col poster-left">
        <img src={posterWildlife} alt="The National Parks Preserve Wild Life" className="poster-img" />
      </div>

      <div className="app">
      <header className="app-header">
        <div className="header-ornament">◆ ◆ ◆</div>
        <h1>NPS Challenge</h1>
        <p className="header-sub">Cal vs. Braden · Campaign 2032</p>
        <div className={`sync-badge sync-${syncStatus}`}>{syncLabel}</div>
      </header>

      <nav className="tab-nav">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`tab-btn${activeTab === i ? ' active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="tab-content">{tabComponents[activeTab]}</main>

      <footer className="app-footer">◆ deadline: december 31, 2032 ◆</footer>
      </div>

      <div className="poster-col poster-right">
        <img src={posterAcadia} alt="Acadia National Park - Ranger Naturalist Service" className="poster-img" />
      </div>
    </div>
  );
}
