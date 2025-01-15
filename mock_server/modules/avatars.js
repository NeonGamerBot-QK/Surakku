// default template
// oh yea these all return 200 because ffs slack api i hate u
module.exports = (router, db) => {
  router.use(async (req, res, next) => {
    const visits = (await db.get("visits")) || 0;
    req.visits = visits;
    await db.set("visits", visits + 1);
    next();
  });

  router.get("/avatarHash/:userID", (req, res) => {
    const user = req.query.user;
    if (!user) return res.status(400).json({ message: "No user provided" });
  });
};
