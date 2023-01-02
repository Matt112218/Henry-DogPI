const axios = require("axios");
const { Dog } = require("../../db");
const { Temperament } = require("../../db");

const getAllBreeds = async () => {
  const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds`);

  const dogsData = [];
  data.map(async (each) => {
    const info = {};
    if (each.hasOwnProperty("temperament")) {
      const temperaments = each.temperament.split(",");
      const trimmed = temperaments.map((each) => {
        return each.trim();
      });
      info["id"] = each.id;
      info["name"] = each.name;
      info["temperament"] = trimmed;
      info["image"] = each.image.url;
      info["weight"] = parseInt(each.weight.metric);
      dogsData.push(info);
    }
  });

  const responseDB = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  const allBreeds = [...dogsData, ...responseDB];

  return allBreeds;
};

module.exports = getAllBreeds;
