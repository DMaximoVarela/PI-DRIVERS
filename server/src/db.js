require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`,
  {
    logging: false,
    native: false,
  }
);

// Nombre base del archivo actual
const basename = path.basename(__filename);

// Array para almacenar los definers del modelo
const modelDefiners = [];

// Lee los archivos del directorio /models, filtra los archivos que no son modelos y agrega los archivos restantes al array modelDefiners.
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Llama al metodo model(), en cada uno de los modelos del array modelDefiners, pasando el obj sequelize.
modelDefiners.forEach((model) => model(sequelize));

// Obtiene un array de todas las parejas clave-valor en el objeto sequelize.models
let entries = Object.entries(sequelize.models);

// Crea un nuevo array donde las claves estan en mayusculas.
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

// Actualiza el objeto sequelize.models con las nuevas claves en mayusculas.
sequelize.models = Object.fromEntries(capsEntries);

const { Driver, Team } = sequelize.models;

// Aca vendrian las relaciones
Driver.belongsToMany(Team, { through: "driver_team" });
Team.belongsToMany(Driver, { through: "driver_team" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
