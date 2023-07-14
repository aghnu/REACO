import { version } from '@data/system.json';

const STORAGE_KEY_VERSION = 'version' as const;
const key = btoa(STORAGE_KEY_VERSION);
const value = btoa(version);

export function resetStorage() {
  localStorage.clear();
  localStorage.setItem(key, value);
}

export function handleStorageVersion() {
  const storageVersion = localStorage.getItem(key);
  if (storageVersion === value) return;
  resetStorage();
}
