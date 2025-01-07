/**
 * All patches for webpack are apperntly in
 */
export function getRawPatches() {
  // TODO?: Typings ?? /hj
  //@ts-expect-error
  return window.webpackChunkwebapp;
}
export function getPatches() {
  //@ts-ignore
  return getRawPatches().filter((patch) => patch[1].default?.getState);
}
// TODO: add LIGHT typings to webpack (ex: var names = :any)
export function getPatchInternals(): Promise<any> {
  return new Promise((res) => {
    window.webpackChunkwebapp.push([[Symbol()], {}, res]);
    window.webpackChunkwebapp.pop();
  });
}
