const axios = require("axios");
const URL = "http://localhost:5000/drivers/";

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios(`${URL}${id}`);

    const { name, description, image, dob, nationality, teams } = data;

    const driver = { id, name, description, image, dob, nationality, teams };

    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
