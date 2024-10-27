// index is not loaded as neither content or bg script, its injected into the page.
export function getTime() {
  return new Date().toISOString();
}
