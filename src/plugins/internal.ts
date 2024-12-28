import { devs } from "../util/devs";
import { CreateUserBadge } from "../util/UserBadge";
import mydevbadge from "../assets/dev.svg";
import icon from "../assets/icon_tiny.png";
import banner from "../assets/banner.png";
import { createPopup } from "../util/popup";
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
                optionsButton.innerHTML = `<svg data-y0c="true" data-qa="settings" aria-hidden="true" viewBox="0 0 20 20" class=""><path fill="currentColor" fill-rule="evenodd" d="m9.151 3.676.271-1.108a2.5 2.5 0 0 1 1.156 0l.271 1.108a2 2 0 0 0 3.022 1.252l.976-.592a2.5 2.5 0 0 1 .817.817l-.592.975a2 2 0 0 0 1.252 3.023l1.108.27c.09.38.09.777 0 1.157l-1.108.27a2 2 0 0 0-1.252 3.023l.592.975a2.5 2.5 0 0 1-.817.818l-.976-.592a2 2 0 0 0-3.022 1.251l-.271 1.109a2.5 2.5 0 0 1-1.156 0l-.27-1.108a2 2 0 0 0-3.023-1.252l-.975.592a2.5 2.5 0 0 1-.818-.818l.592-.975a2 2 0 0 0-1.252-3.022l-1.108-.271a2.5 2.5 0 0 1 0-1.156l1.108-.271a2 2 0 0 0 1.252-3.023l-.592-.975a2.5 2.5 0 0 1 .818-.817l.975.592A2 2 0 0 0 9.15 3.676m2.335-2.39a4 4 0 0 0-2.972 0 .75.75 0 0 0-.45.518l-.372 1.523-.004.018a.5.5 0 0 1-.758.314l-.016-.01-1.34-.813a.75.75 0 0 0-.685-.048 4 4 0 0 0-2.1 2.1.75.75 0 0 0 .047.685l.814 1.34.01.016a.5.5 0 0 1-.314.759l-.018.004-1.523.372a.75.75 0 0 0-.519.45 4 4 0 0 0 0 2.971.75.75 0 0 0 .519.45l1.523.373.018.004a.5.5 0 0 1 .314.758l-.01.016-.814 1.34a.75.75 0 0 0-.048.685 4 4 0 0 0 2.101 2.1.75.75 0 0 0 .685-.048l1.34-.813.016-.01a.5.5 0 0 1 .758.314l.004.018.372 1.523a.75.75 0 0 0 .45.518 4 4 0 0 0 2.972 0 .75.75 0 0 0 .45-.518l.372-1.523.004-.018a.5.5 0 0 1 .758-.314l.016.01 1.34.813a.75.75 0 0 0 .685.049 4 4 0 0 0 2.101-2.101.75.75 0 0 0-.048-.685l-.814-1.34-.01-.016a.5.5 0 0 1 .314-.758l.018-.004 1.523-.373a.75.75 0 0 0 .519-.45 4 4 0 0 0 0-2.97.75.75 0 0 0-.519-.45l-1.523-.373-.018-.004a.5.5 0 0 1-.314-.759l.01-.015.814-1.34a.75.75 0 0 0 .048-.685 4 4 0 0 0-2.101-2.101.75.75 0 0 0-.685.048l-1.34.814-.016.01a.5.5 0 0 1-.758-.315l-.004-.017-.372-1.524a.75.75 0 0 0-.45-.518M8 10a2 2 0 1 1 4 0 2 2 0 0 1-4 0m2-3.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7" clip-rule="evenodd"></path></svg>`;
                optionsButton.style.color = `var(--dt_color-content-pry)`;
                optionsButton.addEventListener("click", async () => {
                  createPopup(await plugin.setupOptions!());
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
      css.innerText = `    `; // TODO: config system
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
      alert(this.custom_properties!.token || "No token??");
      const div = document.createElement("div");
      const btnForTest = document.createElement("button");
      const optionForToken = document.createElement("input");
      optionForToken.type = "text";
      optionForToken.value = this.custom_properties!.token;

      btnForTest.innerText = "Update/Set token";
      btnForTest.addEventListener("click", () => {
        console.log("Test");
        this.custom_properties!.token = optionForToken.value;
      });
      div.appendChild(optionForToken);
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
          // console.log(`ipinfo`);
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
