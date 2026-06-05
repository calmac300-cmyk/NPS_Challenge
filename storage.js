/**
 * Storage utility — wraps whatever persistence layer you wire up.
 *
 * In the Claude artifact context this uses window.storage (Anthropic's
 * key-value API). In a real React Native / web app, swap this out for:
 *   - AsyncStorage (React Native / Expo)
 *   - localStorage / IndexedDB (web)
 *   - a backend API (if you want shared state between Cal & Braden)
 *
 * All functions are async so the call sites don't need to change when
 * you swap the implementation.
 */

const STORAGE_KEY = 'nps_challenge_sites_v1';

export async function loadSites(fallback) {
  try {
    // Web/artifact: window.storage
    if (typeof window !== 'undefined' && window.storage) {
      const result = await window.storage.get(STORAGE_KEY);
      if (result && result.value) return JSON.parse(result.value);
    }
    // React Native: swap in AsyncStorage here
    // const raw = await AsyncStorage.getItem(STORAGE_KEY);
    // if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('loadSites failed, using fallback:', e);
  }
  return fallback;
}

export async function saveSites(sites) {
  try {
    if (typeof window !== 'undefined' && window.storage) {
      await window.storage.set(STORAGE_KEY, JSON.stringify(sites));
      return;
    }
    // React Native: swap in AsyncStorage here
    // await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
  } catch (e) {
    console.warn('saveSites failed:', e);
  }
}
