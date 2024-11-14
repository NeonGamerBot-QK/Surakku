/**
 * <button class="c-button-unstyled c-tabs__tab js-tab c-tabs__tab--full_width" id="t" aria-haspopup="false" role="tab" aria-selected="false" tabindex="-1" type="button"><div class="c-tabs__tab_icon--left" data-qa="tabs_item_render_icon"><svg data-0ko="true" data-qa="settings" aria-hidden="true" viewBox="0 0 20 20" class=""><path fill="currentColor" fill-rule="evenodd" d="" clip-rule="evenodd"></path></svg></div><span class="c-tabs__tab_content"><span class="">Test</span></span></button>
 */

export function createSettingsTabElement(id:string, name:string, icon:string) {
  //TODO: im eepy
  const settingsTab = document.createElement('button');
  settingsTab.classList.add('c-button-unstyled', 'c-tabs__tab', 'js-tab', 'c-tabs__tab--full_width');
  settingsTab.id = `settings-${id}`;
  settingsTab.setAttribute('aria-haspopup', 'false');
  settingsTab.setAttribute('role', 'tab');
  settingsTab.setAttribute('aria-selected', 'false');
  settingsTab.setAttribute('tabindex', '-1');
  settingsTab.setAttribute('type', 'button');
  const iconDiv = document.createElement('div');
  iconDiv.classList.add('c-tabs__tab_icon--left');
  iconDiv.setAttribute('data-qa', 'tabs_item_render_icon');
  const iconImg = document.createElement('img');
  iconImg.src = icon;
  iconDiv.appendChild(iconImg);
  const span = document.createElement('span');
  span.classList.add('c-tabs__tab_content');
  const spanText = document.createElement('span');
  spanText.textContent = name;
  span.appendChild(spanText);
  settingsTab.appendChild(iconDiv);
  settingsTab.appendChild(span);
  return settingsTab;
}
export interface SettingsTab { 
  name: string;
  id: string;
  icon?: string;
  // return a div with xyz content
  onOpen: () => HTMLDivElement | string;
}
export const patchedSettings:SettingsTab[] = [];
export function patchInSettingsElement(data: SettingsTab) {
  patchedSettings.push(data);
}
export function patchInSettingsElements(data: SettingsTab[]) {
  patchedSettings.push(...data);
}
export function watchForSettings() {
  const settingsTab = document.getElementById('notifications')?.parentElement
  if (!settingsTab) return;
  for (const d of patchedSettings) {
    const el = createSettingsTabElement(d.id, d.name, d.icon || '');
    el.addEventListener('click', () => {
      const content = d.onOpen();
      // if (typeof content === 'string') {
      //   settingsTab.innerHTML = content;
      // } else {
      //   settingsTab.innerHTML = '';
      //   settingsTab.appendChild(content);
      // }xy
    });
    settingsTab.append(el)
  }
  
}