const axios = require("axios");
const URL = "http://localhost:3001/drivers";

module.exports = async (req, res) => {
  try {
    const { name } = req.query;

    const { data } = await axios(URL);

    const drivers = data;

    const filteredDrivers = drivers.filter((driver) => {
      const driverName = driver.name.forename;
      return driverName.toLowerCase() === name.toLowerCase();
    });

    const Drivers = filteredDrivers.slice(0, 15);

    if (Drivers.length === 0) {
      res.status(404).json({
        error: "No se encontraron drivers con el nombre especificado",
      });
    } else {
      res.status(200).json(Drivers);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
