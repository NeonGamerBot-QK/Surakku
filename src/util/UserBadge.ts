export function watchUsersForBadges() {
    const inter = setInterval(() => {
        const d = Array.from(document.querySelectorAll('[data-message-sender]'))
        const ud = d.map(e => {
            let d =  {
                //@ts-expect-error
                display_name: e.innerText,
                id: e.getAttribute('data-message-sender'),
            }
try {
    //@ts-ignore
   d.avatar = e.parentElement?.parentElement?.parentElement?.parentElement?.children[0]?.querySelector('img').src

} catch (e) {}
            return d;
        });
        for (const badge of badges) {
            for(const e of d) {
                if(e.getAttribute('touched-by-surakku')) continue;
            e.setAttribute('touched-by-surakku', "true");
            if(badge.filter(ud[d.indexOf(e)])) {
            e.innerHTML += ` <img src='${badge.emojiImage}' />`
            }
            }
        }
    }, 50)
    return inter;
}
export const badges:any = []
export function CreateUserBadge(emojiImage:string, tooltip:string, desc:string, filter: (user:any) => boolean) {
badges.push({
    desc,
    filter,
 emojiImage,
 tooltip   
})
}