const { Glass } = require("../models");

// Get all glasses in a wardrobe
exports.getAllGlasses = async (req, res) => {
  try {
    const { wardrobeId } = req.params;
    const glasses = await Glass.findAll({
      where: { wardrobe_id: wardrobeId },
    });
    res.json(glasses);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get a single glass by ID within a wardrobe
exports.getGlassById = async (req, res) => {
  try {
    const { id, wardrobeId } = req.params;
    const glass = await Glass.findOne({
      where: {
        id,
        wardrobe_id: wardrobeId,
      },
    });

    if (!glass)
      return res
        .status(404)
        .json({ error: "Glass not found in this wardrobe" });

    res.json(glass);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Create a new glass within a wardrobe
exports.createGlass = async (req, res) => {
  try {
    const { width, height, depth, color_id } = req.body;
    const { wardrobeId } = req.params;

    const glass = await Glass.create({
      width,
      height,
      depth,
      color_id,
      wardrobe_id: wardrobeId, // enforce wardrobe context
    });

    res.status(201).json(glass);
  } catch (err) {
    res.status(400).json({ error: "Invalid data", details: err.message });
  }
};

// Update an existing glass within a wardrobe
exports.updateGlass = async (req, res) => {
  try {
    const { id, wardrobeId } = req.params;
    const { width, height, depth, color_id } = req.body;

    const glass = await Glass.findOne({
      where: {
        id,
        wardrobe_id: wardrobeId,
      },
    });

    if (!glass)
      return res
        .status(404)
        .json({ error: "Glass not found in this wardrobe" });

    glass.width = width ?? glass.width;
    glass.height = height ?? glass.height;
    glass.depth = depth ?? glass.depth;
    glass.color_id = color_id ?? glass.color_id;

    await glass.save();

    res.json(glass);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid data", details: err.message });
  }
};

// Delete a glass within a wardrobe
exports.deleteGlass = async (req, res) => {
  try {
    const { id, wardrobeId } = req.params;

    const glass = await Glass.findOne({
      where: {
        id,
        wardrobe_id: wardrobeId,
      },
    });

    if (!glass)
      return res
        .status(404)
        .json({ error: "Glass not found in this wardrobe" });

    await glass.destroy();
    res.json({ message: "Glass deleted" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
