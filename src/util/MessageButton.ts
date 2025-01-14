interface MButtonEntry{
    icon?:string
    name:string
    onClick:()=>void
}
const list_of_buttons:MButtonEntry[] = []
export function CreateMessageButton(icon:string,name:string,onClick:()=>void){
    list_of_buttons.push({icon,name,onClick})
}
export function watchForMessageModal() {
    // if(document.querySelector('[id="send_blocks"]')) return;
    if(!document.querySelector('[data-qa="menu_items"]')) return;
    if(!document.querySelector('[data-qa="attach-canvas-wrapper"]')) return;
    const parent = document.querySelector('[data-qa="menu_items"]')!
 for(const meta_info_of_btn of list_of_buttons){
    if(document.getElementById(`${btoa(meta_info_of_btn.name)}`)) return;
    const el = document.createElement("div")
    el.id = btoa(meta_info_of_btn.name)
    const btn = document.createElement("button")
    btn.className = `c-button-unstyled c-menu_item__button`
    btn.type = "button"
    btn.tabIndex = -1
    btn.role = "menuitem"
    btn.onclick = meta_info_of_btn.onClick
    const label = document.createElement("div")
    const icon = document.createElement("div")
    label.className =`c-menu_item__label`
    label.innerText = meta_info_of_btn.name
    icon.className = `c-menu_item__icon`
    icon.innerHTML = meta_info_of_btn.icon || `<svg data-y0c="true" data-qa="play" aria-hidden="true" viewBox="0 0 20 20" class="is-inline" style="--s: 20px;"><path fill="currentColor" fill-rule="evenodd" d="M5.128 3.213A.75.75 0 0 0 4 3.861v12.277a.75.75 0 0 0 1.128.647l10.523-6.138a.75.75 0 0 0 0-1.296zM2.5 3.861c0-1.737 1.884-2.819 3.384-1.944l10.523 6.139c1.488.868 1.488 3.019 0 3.887L5.884 18.08c-1.5.875-3.384-.207-3.384-1.943z" clip-rule="evenodd"></path></svg>`
    btn.appendChild(icon)
    btn.appendChild(label)
    el.appendChild(btn)
    el.className=`c-menu_item__li`
    // fyi i tried to make it look cool over hover but it didnt work :(
    parent.appendChild(el)
 }
}