export function patchButton(selector, cb) {
  document.querySelector(selector).addEventListener("click", cb);
}
