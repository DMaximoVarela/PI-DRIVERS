const axios = require("axios");
const URL = "http://localhost:5000/drivers";

module.exports = async (req, res) => {
  try {
    const { data } = await axios(URL);

    data.map((driver) => {
      if (driver.image.url === "") {
        driver.image = {
          url: "https://i.ibb.co/xXkGSF9/98-sin-t-tulo-20231215173819.png",
          imageby: "https://ibb.co/Cmcv5PC",
        };
      }
      return driver;
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
