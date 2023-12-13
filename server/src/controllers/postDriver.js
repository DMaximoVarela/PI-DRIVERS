const { Driver, Team } = require("../db");

module.exports = async (req, res) => {
  try {
    const { forename, surname, description, image, nationality, dob, teams } =
      req.body;

    const [teamsCreated] = await Team.findOrCreate({ where: { name: teams } });

    const [driver] = await Driver.findOrCreate({
      where: {
        forename,
        surname,
        description,
        image,
        nationality,
        dob,
      },
    });

    const driver_team = {
      id: driver.id,
      name: { forename: driver.forename, surname: driver.surname },
      image: driver.image,
      dob: driver.dob,
      nationality: driver.nationality,
      teams: teamsCreated.name,
      description: driver.description,
    };

    return res.status(200).json(driver_team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
