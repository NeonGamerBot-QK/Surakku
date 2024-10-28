import internal from "./plugins/internal";
import * as utils from "./util";
import JsCookie from "js-cookie";
// bind console.log to
const log0 = console.log;
//@ts-ignore
console.log = (...arguments) => {
  log0(`[SURAKKU/${utils.getTime()}]`, ...arguments);
};
console.log(`Surakku LOADED :P`);
console.log(JsCookie.get());
//@ts-ignore
console.log(
  browser.cookies.get({
    name: "d",
    url: "https://app.slack.com",
  }),
);
const plugins = [internal];
for (const pluginCat of plugins) {
  for (const plugin of pluginCat) {
    plugin.execute();
  }
}
