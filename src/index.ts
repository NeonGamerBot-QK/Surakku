import internal from "./plugins/internal";
import * as utils from "./util";
// bind console.log to 
const log0 = console.log;
//@ts-ignore
console.log = (...arguments) => {
    log0(`[SURAKKU/${utils.getTime()}]`, ...arguments)
}
console.log(`Surakku LOADED :P`)
const plugins = [internal ];
for(const pluginCat of plugins) {
    for(const plugin of pluginCat) {
        plugin.execute()
    }
}