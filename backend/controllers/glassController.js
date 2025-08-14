const { Glass } = require("../models");

// Get all glasses (already done)
exports.getAllGlasses = async (req, res) => {
  try {
    const glasses = await Glass.findAll();
    res.json(glasses);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get a single glass by ID
exports.getGlassById = async (req, res) => {
  try {
    const glass = await Glass.findByPk(req.params.id);
    if (!glass) return res.status(404).json({ error: "Glass not found" });
    res.json(glass);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Create a new glass
exports.createGlass = async (req, res) => {
  try {
    const { width, height, depth, color_id, wardrobe_id } = req.body;
    const glass = await Glass.create({
      width,
      height,
      depth,
      color_id,
      wardrobe_id,
    });
    res.status(201).json(glass);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// Update an existing glass
exports.updateGlass = async (req, res) => {
  try {
    const { width, height, depth, color_id, wardrobe_id } = req.body;

    const glass = await Glass.findByPk(req.params.id);
    if (!glass) return res.status(404).json({ error: "Glass not found" });

    // Update this field only if the request actually contains a new value for it. Otherwise, keep the existing one
    glass.width = width ?? glass.width;
    glass.height = height ?? glass.height;
    glass.depth = depth ?? glass.depth;
    glass.color_id = color_id ?? glass.color_id;
    glass.wardrobe_id = wardrobe_id ?? glass.wardrobe_id;

    await glass.save();

    res.json(glass);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid data", details: err.message });
  }
};

// Delete a glass
exports.deleteGlass = async (req, res) => {
  try {
    const glass = await Glass.findByPk(req.params.id);
    if (!glass) return res.status(404).json({ error: "Glass not found" });

    await glass.destroy();
    res.json({ message: "Glass deleted" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
