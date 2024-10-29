export function createMenuIcon(
  img: string,
  name: string,
  cb: () => void | Promise<void>,
) {
  // img string attribute to url
  const imgElement = document.createElement("img");
  imgElement.src = img;
  imgElement.alt = name;
  imgElement.style.width = "30px";
  imgElement.style.height = "30px";
  const div = document.createElement("div");
  div.className = "p-peek_trigger";
  div.role = "none";
  div.id = "tab_rail_" + name.toLowerCase();
  const button = document.createElement("button");
  button.className =
    "c-button-unstyled p-tab_rail__button c-tabs__tab js-tab c-tabs__tab--full_width";
  button.id = name;
  button.setAttribute("aria-label", name);
  button.setAttribute("aria-haspopup", "false");
  button.setAttribute("role", "tab");
  button.setAttribute("aria-selected", "false");
  button.setAttribute("tabindex", "-1");
  button.type = "button";
  const span = document.createElement("span");
  span.className = "c-tabs__tab_content";
  const iconDiv = document.createElement("div");
  iconDiv.className = "p-tab_rail__button__icon";
  const innerDiv = document.createElement("div");
  innerDiv.style.position = "relative";
  const innerIconDiv = document.createElement("div");
  innerIconDiv.className = "p-tab_rail__button__icon_inner";
  const activityDiv = document.createElement("div");
  activityDiv.className =
    "p-activity_toast_ia2022__link__icon p-activity_toast_ia2022__link__activity";
  activityDiv.appendChild(imgElement);
  innerIconDiv.appendChild(activityDiv);
  innerDiv.appendChild(innerIconDiv);
  iconDiv.appendChild(innerDiv);
  span.appendChild(iconDiv);
  const labelDiv = document.createElement("div");
  labelDiv.className = "p-tab_rail__button__label";
  labelDiv.innerText = name;
  span.appendChild(labelDiv);
  const shortcutDiv = document.createElement("div");
  shortcutDiv.setAttribute("aria-hidden", "true");
  shortcutDiv.className = "p-tab_rail__shortcut_hint";
  shortcutDiv.innerText = "3";
  span.appendChild(shortcutDiv);
  button.appendChild(span);
  div.appendChild(button);
  button.onclick = cb;

  /**
   * <div class="p-peek_trigger" role="none"><button class="c-button-unstyled p-tab_rail__button c-tabs__tab js-tab c-tabs__tab--full_width" data-qa="tab_rail_activity_button" id="${name}" aria-label="Activity" aria-describedby="tab_rail_tab_item_description_activity" aria-haspopup="false" role="tab" aria-selected="false" tabindex="-1" type="button"><span class="c-tabs__tab_content"><div class="p-tab_rail__button__icon"><div style="position: relative;"><div class="p-tab_rail__button__icon_inner"><div class="p-activity_toast_ia2022__link__icon p-activity_toast_ia2022__link__activity"><svg data-0ko="true" data-qa="notifications" aria-hidden="true" viewBox="0 0 20 20" class="" style="--s: 20px;"><path fill="currentColor" fill-rule="evenodd" d="M9.357 3.256c-.157.177-.31.504-.36 1.062l-.05.558-.55.11c-1.024.204-1.691.71-2.145 1.662-.485 1.016-.736 2.566-.752 4.857l-.002.307-.217.217-2.07 2.077c-.145.164-.193.293-.206.374a.3.3 0 0 0 .034.199c.069.12.304.321.804.321h4.665l.07.672c.034.327.17.668.4.915.214.232.536.413 1.036.413.486 0 .802-.178 1.013-.41.227-.247.362-.588.396-.916l.069-.674h4.663c.5 0 .735-.202.804-.321a.3.3 0 0 0 .034-.199c-.013-.08-.061-.21-.207-.374l-2.068-2.077-.216-.217-.002-.307c-.015-2.291-.265-3.841-.75-4.857-.455-.952-1.123-1.458-2.147-1.663l-.549-.11-.05-.557c-.052-.558-.204-.885-.36-1.062C10.503 3.1 10.31 3 10 3s-.505.1-.643.256m-1.124-.994C8.689 1.746 9.311 1.5 10 1.5s1.31.246 1.767.762c.331.374.54.85.65 1.383 1.21.369 2.104 1.136 2.686 2.357.604 1.266.859 2.989.894 5.185l1.866 1.874.012.012.011.013c.636.7.806 1.59.372 2.342-.406.705-1.223 1.072-2.103 1.072H12.77c-.128.39-.336.775-.638 1.104-.493.538-1.208.896-2.12.896-.917 0-1.638-.356-2.136-.893A3 3 0 0 1 7.23 16.5H3.843c-.88 0-1.697-.367-2.104-1.072-.433-.752-.263-1.642.373-2.342l.011-.013.012-.012 1.869-1.874c.035-2.196.29-3.919.894-5.185.582-1.22 1.475-1.988 2.684-2.357.112-.533.32-1.009.651-1.383" clip-rule="evenodd"></path></svg></div></div></div></div><div class="p-tab_rail__button__label">Activity</div><div aria-hidden="true" class="p-tab_rail__shortcut_hint" data-qa="tab_rail_shortcut_hint">3</div></span></button></div>
   */
  try {
    document
      .querySelector(".p-tab_rail")
      ?.children[1].children[1].children[0].children[0].appendChild(div);
  } catch (e) {
    console.error(e);
  } finally {
    debugger;
  }
}
