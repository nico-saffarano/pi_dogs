const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo Temperament
  sequelize.define("Temperament", {
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
