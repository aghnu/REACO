const keydowns = new Set();

document.addEventListener('keydown', (e: KeyboardEvent) => {
  keydowns.add(e.key);
});

document.addEventListener('keyup', (e: KeyboardEvent) => {
  keydowns.delete(e.key);
});

window.addEventListener('blur', () => {
  keydowns.clear();
});

window.addEventListener('focus', () => {
  keydowns.clear();
});

export function isKeyDown(key: string | string[]): boolean {
  if (typeof key === 'string') return keydowns.has(key);

  for (let i = 0; i < key.length; i++) {
    if (keydowns.has(key[i])) return true;
  }

  return false;
}
