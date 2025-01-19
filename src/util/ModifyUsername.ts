export async function watchUsersForNames() {
    // const inter = setInterval(() => {
    const d = Array.from(document.querySelectorAll("[data-message-sender]"));
    const ud = d.map((e) => {
      let d = {
        //@ts-expect-error
        display_name: e.innerText,
        id: e.getAttribute("data-message-sender"),
      };
      
      return d;
    });
    for (const badge of badges) {
      for (const e of d) {
        if (e.getAttribute("touched-by-surakku-2")) continue;
        e.setAttribute("touched-by-surakku-2", "true");
        if (badge.filter(ud[d.indexOf(e)])) {
       e.innerHTML = await badge.getName(ud[d.indexOf(e)]);
        }
      }
    }
  }
  export const badges: any = [];
  export function CreateUserNameModification(
    getName: (user: any) => string | Promise<string>,
    filter: (user: any) => boolean,
  ) {
    badges.push({
     getName,
        filter,
    });
  }