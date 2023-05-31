export function isKeyAllowed(key: string) {
  // eslint-disable-next-line
  const regex = /^([a-zA-Z0-9\/\s]|Backspace|Enter)$/g;
  if (key.match(regex) != null) return true;
  return false;
}
