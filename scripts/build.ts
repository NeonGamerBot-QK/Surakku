// compile in ts
// then build to correct stuff for chrome ext
import fs from "fs";
import esbuild, { Format } from "esbuild";
import { exec, execSync } from "child_process";
// @ts-ignore
import path from "path";
// first build ../src
const buildDirs = [path.join(__dirname, "..", "build/app"), path.join(__dirname, "..", "build/userscript")];
// const tscBuildOut = execSync("yarn tsc:build").toString()
// console.log(tscBuildOut)
// create ../build
for (const buildDir of buildDirs) {
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  } else {
    fs.rmSync(buildDir, { recursive: true });
    fs.mkdirSync(buildDir);
  }
}
const commonOpts: esbuild.BuildOptions = {
  globalName: "Surakku",
  define: {
    NODE_ENV: "production",
    VERSION: JSON.stringify(require("../package.json").version),
    BUILD_TIMESTAMP: JSON.stringify(new Date().toISOString()),
  },
  loader: {
    ".png": "dataurl",
    ".svg": "dataurl",
  },
  format: "iife",
  target: ["esnext"],
  minify: true,
  bundle: true,
  // plugins: [esbHeaders()]
};

Promise.all([
  esbuild.build({
    ...commonOpts,
    outdir: "build/app",
    entryPoints: [path.join(__dirname, "..", "src", "index.ts")],
    // platform: "browser",
  }),
  esbuild.build({
    ...commonOpts,
    entryPoints: [path.join(__dirname, "..", "src", "index.ts")],
    outfile: "build/userscript/surakku.user.js",
    // platform: "browser",
  }),
]).then((d) => {
  console.log(d);
  // return;
  // copy public folder contents to ../build
  exec("cp -r ./public/* ./build/app", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });

});
