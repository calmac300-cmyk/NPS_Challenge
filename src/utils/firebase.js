import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  writeBatch,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { SITES } from '../data/sites';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let db = null;

if (isConfigured) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

// Stable document ID from site name
export const siteKey = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Seed Firestore from initial dataset if the collection is empty
async function seedIfEmpty() {
  const metaRef = doc(db, '_meta', 'init');
  const metaSnap = await getDoc(metaRef);
  if (metaSnap.exists()) return;

  const BATCH_SIZE = 499;
  for (let i = 0; i < SITES.length; i += BATCH_SIZE) {
    const batch = writeBatch(db);
    SITES.slice(i, i + BATCH_SIZE).forEach((site) => {
      batch.set(doc(db, 'sites', siteKey(site.name)), site);
    });
    await batch.commit();
  }
  await setDoc(metaRef, { initialized: true, at: new Date().toISOString() });
}

/**
 * Subscribe to real-time site updates from Firestore.
 * Returns an unsubscribe function.
 *
 * If Firebase isn't configured, calls onUpdate immediately with the
 * local initial dataset and returns a no-op unsubscribe.
 */
export function subscribeSites(onUpdate, onError) {
  if (!isConfigured) {
    onUpdate(SITES);
    return () => {};
  }

  seedIfEmpty().catch(onError);

  const q = query(collection(db, 'sites'));
  return onSnapshot(
    q,
    (snap) => {
      const sites = snap.docs.map((d) => d.data());
      onUpdate(sites);
    },
    onError
  );
}

/**
 * Toggle cal or braden visit status for a site.
 * visitor = 'cal' | 'braden'
 */
export async function toggleVisit(siteName, visitor, currentValue) {
  if (!isConfigured || !db) return null;
  const ref = doc(db, 'sites', siteKey(siteName));
  await updateDoc(ref, { [visitor]: !currentValue });
}

/**
 * Add a brand-new site to Firestore.
 */
export async function addSite(site) {
  if (!isConfigured || !db) return null;
  const ref = doc(db, 'sites', siteKey(site.name));
  await setDoc(ref, site);
}
