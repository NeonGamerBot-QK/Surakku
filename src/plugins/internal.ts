import { devs } from "../util/devs";
import { CreateUserBadge } from "../util/UserBadge";
import mydevbadge from "../assets/dev.svg";
import icon from "../assets/icon_tiny.png";
import banner from "../assets/banner.png";
import { patchInSettingsElement, SettingsTab } from "../api/Settings";
import { Plugin } from "../util";
import { useStoreFunc } from "../api/DataStore";

/**
 * All plugins exported here are internal plugins.
 * When building on your own you can configure them here.
 * For default build, these will all be FORCED turned on and cant be turned off.
 */
export default [
  {
    name: "Owner Badges",
    description: "Adds a little cool badge to the owner of this plugin :P",
    author: [devs.neon],
    async execute() {
      // what Actually code should look like
      /**
       * CreateAdditonalUserBadge(':crown:', 'Owner', 'This plugin is owned by the owner of this plugin :P', (e) => e.user.displayName ==  )
       */
      console.log("Owner Badges Plugin Loaded");
      CreateUserBadge(mydevbadge, `Owner`, `test`, (e) => {
        return e.id == "U07L45W79E1";
      });
    },
  },
  {
    name: "Settings Patch",
    description: "The settings for surakku",
    author: [devs.neon],
    async execute() {
      patchInSettingsElement({
        name: "Surakku",
        id: "surakku",
        icon: icon,
        onOpen() {
          const div = document.createElement("div");
          div.style.padding = "10px";
          const bannerImg = document.createElement("img");
          bannerImg.src = banner;
          bannerImg.style.width = "90%";
          const h1 = document.createElement("h1");
          h1.innerText = "Surakku Settings";
          div.appendChild(bannerImg);
          div.appendChild(h1);
          const version = document.createElement("span");
          version.innerText = `Version: ${VERSION || import.meta.env.VERSION}`;
          div.appendChild(version);
          const plugins = document.createElement("div");
          const pluginsH1 = document.createElement("h2");
          pluginsH1.innerText = "Plugins";
          plugins.appendChild(pluginsH1);
          const innerPlugins = document.createElement("div");
          innerPlugins.style.grid = "flex";
          innerPlugins.style.display = "grid";
          innerPlugins.style.gridTemplateColumns = "1fr 1fr";
          //@ts-ignore
          for (const cat of window.Surakku.plugins
            .sort((a, b) => {
              const x = a.required_for_startup;
              const y = b.required_for_startup;
              return x === y ? 0 : x ? -1 : 1;
            })
            .reverse() as Plugin[][]) {
            for (const plugin of cat) {
              const pluginDiv = document.createElement("div");
              pluginDiv.style.margin = "5px";
              pluginDiv.style.padding = "5px";
              pluginDiv.style.width = "50%";
              pluginDiv.style.border = "1px solid black";
              pluginDiv.style.background = "0 0";
              pluginDiv.className =
                "c-button-unstyled p-prefs_modal__channel_overrides_row__details";

              const pluginName = document.createElement("h3");
              const pluginDesc = document.createElement("p");
              pluginName.style.fontWeight = "bold";
              pluginName.style.fontSize = "1.5em";
              pluginName.innerText = plugin.name;
              pluginDesc.innerText = plugin.description;
              // switch for enabling plugin
              // all plugins are disabled be default
              const switchEl = document.createElement("input");
              switchEl.type = "checkbox";
              switchEl.checked =
                localStorage.getItem("plugins__" + plugin.name + "_enabled") ==
                "true";
              switchEl.addEventListener("change", (e) => {
                localStorage.setItem(
                  "plugins__" + plugin.name + "_enabled",
                  switchEl.checked.toString(),
                );
              });
              if (plugin.required_for_startup) {
                pluginDiv.style.opacity = "0.8";
                switchEl.disabled = true;
                switchEl.checked = true;
              }
              if (plugin.setupOptions) {
                const optionsButton = document.createElement("button");
                optionsButton.innerText = "Options";
                let optionsOpened = false;
                let modalDiv: any = null;
                optionsButton.addEventListener("click", async () => {
                  if (optionsOpened && modalDiv) {
                    modalDiv?.remove();
                    optionsOpened = false;
                    return;
                  } else if (!optionsOpened && modalDiv) {
                    plugins.appendChild(modalDiv);
                    optionsOpened = true;
                  } else {
                    modalDiv = document.createElement("div");
                    modalDiv.style.position = "fixed";
                    modalDiv.style.top = "0";
                    modalDiv.style.left = "0";
                    modalDiv.style.right = "0";
                    modalDiv.style.bottom = "0";
                    modalDiv.style.display = "flex";
                    modalDiv.style.alignItems = "center";
                    modalDiv.style.justifyContent = "center";
                    modalDiv.style.zIndex = "9999";
                    modalDiv.style.background =
                      "rgba(var(--sk_primary_background,255,255,255),1)";
                    // on click oob close modal
                    modalDiv.addEventListener("click", (e) => {
                      if (e.target === modalDiv) {
                        modalDiv.remove();
                        optionsOpened = false;
                      }
                    });
                    plugins.appendChild(await plugin.setupOptions!());
                    document.body.appendChild(modalDiv);
                    optionsOpened = true;
                  }
                });
                pluginDiv.appendChild(optionsButton);
              }
              pluginDiv.appendChild(pluginName);
              pluginDiv.appendChild(pluginDesc);
              pluginDiv.appendChild(switchEl);
              innerPlugins.appendChild(pluginDiv);
            }
          }
          plugins.appendChild(innerPlugins);
          div.appendChild(plugins);
          return div;
        },
      } satisfies SettingsTab);
    },
  },
  {
    name: "Custom CSS",
    description: "Use custom CSS (maybe)",
    author: [devs.neon],
    execute() {
      const css = document.createElement("style");
      css.innerText = `
       .c-wysiwyg_container__footer, .p-bookmarks_bar, .p-view_header, .p-message_input__input_container_unstyled, .p-message_pane_input, .c-message_kit__gutter, .c-virtual_list__scroll_container {
       background: transparent !important;
       }
      `; // TODO: config system
      document.head.appendChild(css);
    },
  },
  {
    name: "Use slack app",
    description:
      "you want all app oauth slack features? paste your token from this app!",
    author: [devs.neon],
    async execute() {
      // this... actually does not have to do much
      // just attach some properties to window
      // get store
      const store = useStoreFunc("slack-data");
      this.custom_properties = {
        token: store.get("token") || null,
        is_authed: Boolean(store.get("token")),
      };
    },
    setupOptions() {
      const div = document.createElement("div");
      const btnForTest = document.createElement("button");
      btnForTest.innerText = "Test";
      btnForTest.addEventListener("click", () => {
        console.log("Test");
      });
      div.appendChild(btnForTest);
      return div;
    },
    custom_properties: {},
  },
  {
    name: "Bypass CSP (extension)",
    description: "Bypass CSP (extension)",
    author: [devs.neon],
    async execute() {
      let instance = null;
      try {
        instance = browser;
      } catch (e) {}
      try {
        instance = chrome;
      } catch (e) {}
      if (instance) {
        console.log(instance.runtime, `runtime`, chrome.runtime);
        //  window.onmessage = (e) => {
        //   console.log(e)
        //   debugger;
        //  }
        //@ts-ignore
        window.send_fetch = (url: string, options?: any) => {
          console.log(`ipinfo`);
          return new Promise((res, rej) => {
            window.onmessage = (e) => {
              if (e.data.type && e.data.type == "fetch-result") {
                // console.log(e.data, `runtime return`)
                res(e.data.text);
              }
            };
            window.postMessage(
              {
                type: "fetch",
                url,
                options,
              },
              "*",
            );
          });
        };

        //@ts-ignore
        this.custom_properties.fetch = window.send_fetch;

        //       //@ts-ignore
        // window.send_fetch = (url:string,options:any) => {
        //   console.log(instance)
        //   //@ts-ignore
        //  return instance.runtime.sendMessage({
        //     action: "fetchData",
        //     url,
        //     options,
        //   })
        // }
      }
    },
    custom_properties: {},
  },
] satisfies Plugin[];
