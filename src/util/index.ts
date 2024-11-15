// index is not loaded as neither content or bg script, its injected into the page.
export * from "./types";
export function getTime() {
  return new Date().toISOString();
}
export function getBuildTime() {
  return BUILD_TIMESTAMP;
}
export function getVersion() {
  return VERSION;
}
export function getLocalData() {
  return JSON.parse(localStorage.localConfig_v2)
}