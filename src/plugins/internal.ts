import { devs } from "../util/devs";
import { CreateUserBadge } from "../util/UserBadge";
import mydevbadge from "../assets/dev.svg";
import zeonAvatar from "../assets/zeon.png";

import { patchInSettingsElement, SettingsTab } from "../api/Settings";
import { Plugin } from "../util";

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
        icon: zeonAvatar,
        onOpen() {
          const div = document.createElement("div");
          div.style.padding = "10px";
          const h1 = document.createElement("h1");
          h1.innerText = "Surakku Settings";
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
          for (const cat of window.Surakku.plugins as Plugin[][]) {
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
] satisfies Plugin[];
