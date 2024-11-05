import internal from "./plugins/internal";
import misc from "./plugins/misc";
import * as utils from "./util";
import JsCookie from "js-cookie";
//@ts-ignore
import zeonAvatar from "./assets/zeon.png";
import { createMenuIcon } from "./util/MenuIcon";
import { getPatchInternals } from "./util/patches";
import { watchUsersForBadges } from "./util/UserBadge";
import { watchSideBarChannels } from "./api/ChannelPatch";
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
const plugins = [internal, misc];
window.addEventListener("load", async () => {
  for (const pluginCat of plugins) {
    for (const plugin of pluginCat) {
      plugin.execute();
    }
  }
  //@ts-ignore
  window.wbp = await getPatchInternals();
  watchUsersForBadges();
  watchSideBarChannels();
  setTimeout(() => {
    console.log("Creating menu icon...");
    createMenuIcon(
      zeonAvatar,
      "Activity",
      () => alert("todo: popup-window"),
    );
  }, 5000);
});
