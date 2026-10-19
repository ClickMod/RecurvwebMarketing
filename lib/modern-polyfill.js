// Replaces Next.js polyfill-module. Chrome 111+ and Safari 16.4+ already
// implement the other APIs in that file. URL.canParse arrived in Chrome 120
// and Safari 17, which is below Next's stated browser floor.
if (typeof URL !== "undefined" && typeof URL.canParse !== "function") {
  URL.canParse = function canParse(url, base) {
    try {
      return Boolean(new URL(url, base));
    } catch {
      return false;
    }
  };
}
