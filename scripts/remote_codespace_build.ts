// for when working in codespaces
// run this but live-server should be running in the bg
import { execSync } from "child_process";

execSync("yarn build", { stdio: "inherit"});
execSync("rm -rf build.zip && zip -r build.zip build");
console.log("done building");