export const inters: any[] = [];
export function addWatcher(inter: any) {
  inters.push(inter);
}
export async function listenForAllInters() {
  for (const inter of inters) {
    try {
      await inter();
    } catch (e) {
      console.error(e);
    }
  }
  setTimeout(listenForAllInters, 50);
}
