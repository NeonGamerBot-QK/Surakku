import internal from "./plugins/internal";
import misc from "./plugins/misc";
import * as utils from "./util";
import JsCookie from "js-cookie";
// bind console.log to
const log0 = console.log;
//@ts-ignore
console.log = (...arguments) => {
  log0(`[SURAKKU/${utils.getTime()}]`, ...arguments);
};
console.log(`Surakku LOADED :P`);

// remove CSP
document.querySelector('meta[http-equiv]')?.remove()
// console.log(JsCookie.get());
//@ts-ignore
// console.log(
//   browser.cookies.get({
//     name: "d",
//     url: "https://app.slack.com",
//   }),
// );
const plugins = [internal, misc];
window.addEventListener('load', () => {
  for (const pluginCat of plugins) {
    for (const plugin of pluginCat) {
      plugin.execute();
    }
  }  
})