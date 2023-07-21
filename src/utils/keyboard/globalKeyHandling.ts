const keydowns = new Set();

document.addEventListener('keydown', (e: KeyboardEvent) => {
  keydowns.add(e.key);
});

document.addEventListener('keyup', (e: KeyboardEvent) => {
  keydowns.delete(e.key);
});

document.addEventListener('blur', () => {
  keydowns.clear();
});

export function isKeyDown(key: string): boolean {
  return keydowns.has(key);
}
