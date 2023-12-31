const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Driver = sequelize.define(
    "Driver",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      forename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        isUrl: true,
        allowNull: false,
      },
      nationality: {
        type: DataTypes.ENUM(
          "Alemania",
          "Argentina",
          "Australia",
          "Austria",
          "Bélgica",
          "Brasil",
          "Canadá",
          "Chile",
          "China",
          "Colombia",
          "Corea del Sur",
          "Dinamarca",
          "Emiratos Árabes Unidos",
          "España",
          "Estados Unidos",
          "Finlandia",
          "Francia",
          "Hungría",
          "India",
          "Indonesia",
          "Irlanda",
          "Italia",
          "Japón",
          "Liechtenstein",
          "Luxemburgo",
          "Malasia",
          "Marruecos",
          "México",
          "Mónaco",
          "Noruega",
          "Nueva Zelanda",
          "Países Bajos",
          "Polonia",
          "Portugal",
          "Reino Unido",
          "República Checa",
          "República Popular China",
          "Rodesia",
          "Rusia",
          "Singapur",
          "Sudáfrica",
          "Suecia",
          "Suiza",
          "Tailandia",
          "Turquía",
          "Uruguay",
          "Venezuela"
        ),
        allowNull: false,
        unique: false,
      },
      dob: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  Driver.beforeCreate(async (driver, options) => {
    try {
      const maxId = await Driver.max("id");

      if (!driver.id) {
        driver.id = maxId ? maxId + 1 : 509;
      }
    } catch (error) {
      console.error("Error al obtener el máximo id:", error);
      throw error;
    }
  });
};
