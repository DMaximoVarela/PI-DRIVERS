const axios = require("axios");
const { Driver, Team } = require("../db");
const URL = "http://localhost:3001/drivers";
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const { Name } = req.query;

    const { data: apiDrivers } = await axios(URL);

    const filteredApiDrivers = apiDrivers.filter((driver) => {
      const driverName = driver.name.forename;
      return driverName.toLowerCase() === Name.toLowerCase();
    });

    const driversDB = await Driver.findAll({
      where: { forename: { [Op.iLike]: Name } },
      raw: true,
    });

    const idDrivers = driversDB.map((driver) => {
      return driver.id;
    });

    const teamsDB = await Team.findAll({
      where: { id: idDrivers },
      raw: true,
    });

    const dbDriverArray = driversDB.map((driver) => {
      const relatedTeams = teamsDB
        .filter((team) => team.id === driver.id)
        .map((team) => team.name);

      return {
        id: driver.id,
        name: { forename: driver.forename, surname: driver.surname },
        image: { url: driver.image },
        dob: driver.dob,
        nationality: driver.nationality,
        teams: relatedTeams.shift(),
        description: driver.description,
      };
    });

    const allDrivers = [...filteredApiDrivers, ...dbDriverArray];

    if (allDrivers.length === 0) {
      res.status(404).json({
        error: "No se encontraron drivers con el nombre especificado",
      });
    } else {
      res.status(200).json(allDrivers);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
