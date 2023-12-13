const axios = require("axios");
const URL = "http://localhost:5000/drivers";
const { Team } = require("../db");

module.exports = async (req, res) => {
  try {
    const { data } = await axios(URL);
    const teams = data.map((driver) => {
      if (!driver.teams) return "This driver is not associated with any team.";
      else return driver.teams;
    });

    const teamsAsObjects = teams.map((team) => ({ name: team }));

    await Team.bulkCreate(teamsAsObjects);

    return res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
