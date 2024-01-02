const { Driver, Team } = require("../db");

module.exports = async (req, res) => {
  const { forename, surname, description, image, nationality, dob, teams } =
    req.body;
  try {
    if (
      !forename ||
      !surname ||
      !description ||
      !image ||
      !nationality ||
      !dob ||
      !teams
    )
      return res
        .status(400)
        .json({ error: "Por favor llenar todos los campos" });

    if (forename.length > 15)
      return res
        .status(400)
        .json({ error: "El nombre solo puede contener hasta 15 caracteres" });

    if (surname.length > 15)
      return res.status(400).json({
        error: "El apellido solo puede contener hasta 15 caracteres",
      });

    if (description.length > 100)
      return res.status(400).json({
        error: "La descripcion solo puede contener hasta 100 caracteres",
      });

    if (nationality.length > 30)
      return res.status(400).json({
        error:
          "La nacionalidad con mas caracteres tiene 30 caracteres, por lo que solo se permiten 30 caracteres",
      });

    if (!/^\d{4}\/\d{2}\/\d{2}$/.test(dob))
      return res.status(400).json({ error: "Formato de fecha invalido." });

    if (teams.length > 50)
      return res
        .status(400)
        .json({ error: "Solo se permiten hasta 50 caracteres" });

    const driver = await Driver.create({
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
    });

    const team = await Team.create({ name: teams });

    await driver.addTeam(team);

    const driver_team = {
      id: driver.id,
      name: { forename: driver.forename, surname: driver.surname },
      image: { url: driver.image, imageby: "User" },
      dob: driver.dob,
      nationality: driver.nationality,
      teams: team.name,
      description: driver.description,
    };

    return res.status(200).json(driver_team);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
