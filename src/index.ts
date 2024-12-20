import "./util/disable-meta"
import internal from "./plugins/internal";
import misc from "./plugins/misc";
import hackclub from "./plugins/hackclub";
import * as utils from "./util";
//@ts-ignore
import { createMenuIcon } from "./util/MenuIcon";
import { getPatchInternals } from "./util/patches";
import { watchUsersForBadges } from "./util/UserBadge";
import { watchSideBarChannels } from "./api/ChannelPatch";
import { addWatcher, listenForAllInters } from "./util/DontLeakRam";
import {
  createSettingsTabElement,
  patchInSettingsElement,
  SettingsTab,
  watchForSettings,
} from "./api/Settings";
// bind console.log to
const log0 = console.log;
//@ts-ignore
console.log = (...arguments) => {
  log0(`[SURAKKU/${utils.getTime()}]`, ...arguments);
};
console.log(`Surakku LOADED :P`);

// remove CSP
document.querySelector("meta[http-equiv]")?.remove();
// console.log(JsCookie.get());
//@ts-ignore
// console.log(
//   browser.cookies.get({
//     name: "d",
//     url: "https://app.slack.com",
//   }),
// );
const plugins: utils.Plugin[][] = [
  internal.map((d: utils.Plugin) => {
    d.required_for_startup = true;
    return d;
  }) as utils.Plugin[],
  misc,
  hackclub,
];
window.addEventListener("load", async () => {
  //@ts-ignore
  window.Surakku = {
    plugins,
  };
  for (const pluginCat of plugins) {
    for (const plugin of pluginCat.filter(
      (plugin) =>
        localStorage.getItem("plugins__" + plugin.name + "_enabled") ==
          "true" || plugin.required_for_startup,
    )) {
      console.log(
        `Loading Plugin: ${plugin.name} ${localStorage.getItem("plugins__" + plugin.name + "_enabled") ? "(Enabled)" : "(Disabled)"}`,
      );
      plugin.execute();
    }
  }
  //@ts-ignore
  window.wbp = await getPatchInternals();
  // watchUsersForBadges();
  // watchSideBarChannels();

  // setTimeout(() => {
  //   console.log("Creating menu icon...");
  //   createMenuIcon(zeonAvatar, "Activity", () => {
  //     const div = document.createElement("div");

  //     // div.onclick = () => {
  //     //   div.remove();
  //     // };
  //     document.body.appendChild(div);
  //   });
  // }, 5000);

  addWatcher(watchUsersForBadges);
  addWatcher(watchSideBarChannels);
  addWatcher(watchForSettings);
  listenForAllInters();
});
