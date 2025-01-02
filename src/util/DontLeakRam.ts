export const inters: any[] = [];
export function addWatcher(inter: any) {
  inters.push(inter);
}
export async function listenForAllInters() {
  // most of these are on changes in DOM anyways..
  let i = 0;
  const mutationObserver = new MutationObserver(async (mutations) => {
    // await new Promise(r => setTimeout(r, 100))
    console.debug(`#mutation`);
    inters[i]();
    i++;
    if (i >= inters.length) {
      i = 0;
    }
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}
