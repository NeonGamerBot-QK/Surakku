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
import { watchForSettings } from "./api/Settings";
import { watchForMessageModal } from "./util/MessageButton";
import { watchUsersForNames } from "./util/ModifyUsername";
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

  addWatcher(watchUsersForBadges);
  addWatcher(watchSideBarChannels);
  addWatcher(watchForSettings);
  addWatcher(watchForMessageModal);
  addWatcher(watchUsersForNames)
  console.log(0);
  listenForAllInters();
  console.log(1);
});
