// replace() polyfill
export default function (oldToken, newToken) {
  if (this.contains(oldToken)) {
    this.remove(oldToken);
    this.add(newToken);
    return true;
  }
  return false;
}
