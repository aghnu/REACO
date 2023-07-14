import { version } from '@data/system.json';
import { Base64 } from 'js-base64';

const STORAGE_KEY_VERSION = 'version' as const;
const key = Base64.encode(STORAGE_KEY_VERSION);
const value = Base64.encode(version);

export function resetStorage() {
  localStorage.clear();
  localStorage.setItem(key, value);
}

export function handleStorageVersion() {
  const storageVersion = localStorage.getItem(key);
  if (storageVersion === value) return;
  resetStorage();
}
