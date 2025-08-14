const express = require("express");
const router = express.Router();
const panelController = require("../controllers/panelController");

router.get("/", panelController.getAllPanels);
router.get("/:id", panelController.getPanelById);
router.post("/", panelController.createPanel);
router.put("/:id", panelController.updatePanel);
router.delete("/:id", panelController.deletePanel);

module.exports = router;
