// index is not loaded as neither content or bg script, its injected into the page.
export * from "./types"
export function getTime() {
  return new Date().toISOString();
}
