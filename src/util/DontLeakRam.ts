export const inters: any[] = [];
export function addWatcher(inter: any) {
  inters.push(inter);
}
export async function listenForAllInters() {
  let i = 0;
  const inter = async () => {
    // await new Promise(r => setTimeout(r, 100))
    console.debug(`#mutation`);
    inters[i]();
    i++;
    if (i >= inters.length) {
      i = 0;
    }
  };
  // most of these are on changes in DOM anyways..
  // add events cuz why not
  window.document.addEventListener("click", inter);
  window.document.addEventListener("focus", inter);
  window.document.addEventListener("blur", inter);
  window.document.addEventListener("input", inter);
  window.document.addEventListener("keydown", inter);
  window.document.addEventListener("keyup", inter);
  window.document.addEventListener("scroll", inter);
  window.document.addEventListener("touchstart", inter);
  window.document.addEventListener("touchend", inter);
  window.document.addEventListener("touchmove", inter);
  window.document.addEventListener("wheel", inter);

  const mutationObserver = new MutationObserver(inter);
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });
}
