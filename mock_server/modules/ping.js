// default template
module.exports = (router, db) => {
  router.use(async (req, res, next) => {
    const visits = (await db.get("visits")) || 0;
    req.visits = visits;
    await db.set("visits", visits + 1);
    next();
  });
  router.all("/", (req, res) => res.json("Hello, world!"));
  router.get("/key", async (req, res) => {
    const visits = req.visits;
    res.json({ visits });
  });
};