const { Panel } = require("../models");

// Get all panels (already done)
exports.getAllPanels = async (req, res) => {
  try {
    const panels = await Panel.findAll();
    res.json(panels);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get a single panel by ID
exports.getPanelById = async (req, res) => {
  try {
    const panel = await Panel.findByPk(req.params.id);
    if (!panel) return res.status(404).json({ error: "Panel not found" });
    res.json(panel);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Create a new panel
exports.createPanel = async (req, res) => {
  try {
    const { width, height, depth, color_id, wardrobe_id, panel_type_id } =
      req.body;
    const panel = await Panel.create({
      width,
      height,
      depth,
      color_id,
      wardrobe_id,
      panel_type_id,
    });
    res.status(201).json(panel);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// Update an existing panel
exports.updatePanel = async (req, res) => {
  try {
    const { width, height, depth, color_id, wardrobe_id, panel_type_id } =
      req.body;

    const panel = await Panel.findByPk(req.params.id);
    if (!panel) return res.status(404).json({ error: "Panel not found" });

    // Update this field only if the request actually contains a new value for it. Otherwise, keep the existing one
    panel.width = width ?? panel.width;
    panel.height = height ?? panel.height;
    panel.depth = depth ?? panel.depth;
    panel.color_id = color_id ?? panel.color_id;
    panel.wardrobe_id = wardrobe_id ?? panel.wardrobe_id;
    panel.panel_type_id = panel_type_id ?? panel.panel_type_id;

    await panel.save();

    res.json(panel);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid data", details: err.message });
  }
};

// Delete a panel
exports.deletePanel = async (req, res) => {
  try {
    const panel = await Panel.findByPk(req.params.id);
    if (!panel) return res.status(404).json({ error: "Panel not found" });

    await panel.destroy();
    res.json({ message: "Panel deleted" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
