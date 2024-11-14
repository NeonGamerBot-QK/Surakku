/**
 * <button class="c-button-unstyled c-tabs__tab js-tab c-tabs__tab--full_width" id="t" aria-haspopup="false" role="tab" aria-selected="false" tabindex="-1" type="button"><div class="c-tabs__tab_icon--left" data-qa="tabs_item_render_icon"><svg data-0ko="true" data-qa="settings" aria-hidden="true" viewBox="0 0 20 20" class=""><path fill="currentColor" fill-rule="evenodd" d="" clip-rule="evenodd"></path></svg></div><span class="c-tabs__tab_content"><span class="">Test</span></span></button>
 */

export function createSettingsTabElement(data: SettingsTab) {
  const { id, name, icon, onOpen } = data;
  //TODO: im eepy
  const settingsTab = document.createElement("button");
  settingsTab.classList.add(
    "c-button-unstyled",
    "c-tabs__tab",
    "js-tab",
    "c-tabs__tab--full_width",
  );
  settingsTab.id = `settings-${id}`;
  settingsTab.setAttribute("aria-haspopup", "false");
  settingsTab.setAttribute("role", "tab");
  settingsTab.setAttribute("aria-selected", "false");
  settingsTab.setAttribute("tabindex", "-1");
  settingsTab.setAttribute("type", "button");
  const iconDiv = document.createElement("div");
  iconDiv.classList.add("c-tabs__tab_icon--left");
  iconDiv.setAttribute("data-qa", "tabs_item_render_icon");
  if (icon) {
    const iconImg = document.createElement("img");
    iconImg.src = icon;
    if (!data.doNotShrinkIcon) {
      iconImg.style.width = "16px";
      iconImg.style.height = "16px";
    }
    iconDiv.appendChild(iconImg);
  }
  const span = document.createElement("span");
  span.classList.add("c-tabs__tab_content");
  const spanText = document.createElement("span");
  spanText.textContent = name;
  span.appendChild(spanText);
  settingsTab.appendChild(iconDiv);
  settingsTab.appendChild(span);
  return settingsTab;
}
export interface SettingsTab {
  name: string;
  id: string;
  doNotShrinkIcon?: boolean;
  icon?: string;
  // return a div with xyz content
  onOpen: () => HTMLDivElement | string;
}
export const patchedSettings: SettingsTab[] = [];
export function patchInSettingsElement(data: SettingsTab) {
  patchedSettings.push(data);
}
export function patchInSettingsElements(data: SettingsTab[]) {
  patchedSettings.push(...data);
}
export function watchForSettings() {
  const settingsTab = document.getElementById("notifications")?.parentElement;
  if (!settingsTab) return;
  for (const d of patchedSettings) {
    if (document.getElementById(`settings-${d.id}`)) continue;
    const el = createSettingsTabElement(d);
    el.addEventListener("click", () => {
      const content = d.onOpen();
      // first, lets go to the notifications tab
      document.getElementById("notifications")?.click();
      // then clear active tab classname
      document.querySelector("#notifications")!.className =
        "c-button-unstyled c-tabs__tab js-tab c-tabs__tab--full_width";
      const el = document.querySelector(`[data-qa="prefs_section_container"]`)!;
      if (typeof content === "string") {
        el.innerHTML = content;
      } else {
        el.innerHTML = "";
        el.append(content);
        // settingsTab.innerHTML = '';
        // settingsTab.appendChild(content);
      }
    });
    settingsTab.append(el);
  }
}
