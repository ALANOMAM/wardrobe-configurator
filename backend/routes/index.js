const express = require("express");
const router = express.Router();

router.use("/panel-types", require("./panel-types.routes"));
router.use("/colors", require("./colors.routes"));
router.use("/manufacturers", require("./manufacturers.routes"));

module.exports = router;
