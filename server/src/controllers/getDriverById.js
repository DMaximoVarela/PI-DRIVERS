const axios = require("axios");
const { Driver, Team } = require("../db");
const URL = "http://localhost:5000/drivers/";

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    if (id < 509) {
      const { data } = await axios(`${URL}${id}`);

      const { name, description, image, dob, nationality, teams } = data;

      const driver = { id, name, description, image, dob, nationality, teams };

      return res.status(200).json(driver);
    } else if (id >= 509) {
      const driver = await Driver.findOne({ where: { id: id } });

      const team = await Team.findOne({ where: { id: id } });

      const driver_team = {
        id: driver.id,
        name: { forename: driver.forename, surname: driver.surname },
        image: driver.image,
        dob: driver.dob,
        nationality: driver.nationality,
        teams: team.name,
        description: driver.description,
      };

      return res.status(200).json(driver_team);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
