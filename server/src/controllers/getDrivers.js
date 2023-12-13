const axios = require("axios");
const URL = "http://localhost:5000/drivers";

module.exports = async (req, res) => {
  try {
    const { data } = await axios(URL);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
