const express = require("express");
const { readdirSync } = require("fs");
const app = express();
class MemDB {
    // in the real inf express api it will be using an async db but im not adding it here so
    constructor() {
        this.store = {}
    }
    async get(key) {
        return this.store[key]
    }
    async set(key, value) {
        this.store[key] = value
    }
    async delete(key) {
        delete this.store[key]
    }
}
const db = new MemDB() 
for(const module of readdirSync("./modules")){
    const mod = require(`./modules/${module}`)
    const name = module.split(".")[0]
    const router = express();
    router.on("mount", () => {
      console.log(`[${module}] Endpoint ${name} mounted on /api/${name}`);
    });
    router.use((req, res, next) => {
      res.setHeader("X-Endpoint-Name", name);
      next();
    });
    // router.use()
    // run NON-async setup
    mod(router, db);
    app.use(`/api/${name}`, router);
}
app.listen(3000, () => {
console.log(`Test server listening on port 3000`)
})
