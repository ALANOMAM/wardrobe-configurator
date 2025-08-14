"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Glass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 1-glass has one color at the time
      Glass.belongsTo(models.Color, {
        foreignKey: "color_id",
        as: "color", //alias,optional but might be usefull in certain cases
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      });

      //2-glass belongs to one wardrobe at a given time
      Glass.belongsTo(models.Wardrobe, {
        foreignKey: "wardrobe_id",
        as: "wardrobe",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Glass.init(
    {
      width: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      depth: DataTypes.INTEGER,
      color_id: DataTypes.INTEGER,
      wardrobe_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Glass",
    }
  );
  return Glass;
};
