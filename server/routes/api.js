const router = require("express").Router();
const uploads = require("./uploads");

router.get("/", (req, res) => {
  res.sendStatus(200);
});
router.use("/uploads", uploads);
module.exports = router;
