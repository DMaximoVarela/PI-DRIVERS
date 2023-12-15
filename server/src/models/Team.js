const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Team = sequelize.define(
    "Team",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    },
    { timestamps: false }
  );

  Team.beforeCreate(async (team, options) => {
    try {
      const maxId = await Team.max("id");

      if (!team.id) {
        team.id = maxId ? maxId + 1 : 509;
      }
    } catch (error) {
      console.error("Error al obtener el máximo id:", error);
      throw error;
    }
  });
};
