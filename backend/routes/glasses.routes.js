const express = require("express");
const router = express.Router();
const glassController = require("../controllers/glassController");

router.get("/", glassController.getAllGlasses);
router.get("/:id", glassController.getGlassById);
router.post("/", glassController.createGlass);
router.put("/:id", glassController.updateGlass);
router.delete("/:id", glassController.deleteGlass);

module.exports = router;
