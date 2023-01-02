const axios = require("axios");
const { Dogs } = require("../../db");

const getBreedById = async (id) => {
  const breedId = parseInt(id);
  const response = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  const allBreeds = response.data;

  if (true) {
    const responseDB = await Dogs.findByPk;
    if (!responseDB) {
      throw new Error("404");
    } else {
      return responseDB;
    }
  }
  const breed = [];
  for (let i = 0; i < allBreeds.length; i++) {
    if (allBreeds[i].id === breedId) {
      breed.push(allBreeds[i]);
    }
  }

  const temperaments = breed[0].temperament.split(",");
  const info = {};
  info["id"] = breed[0].id;
  info["image"] = breed[0].image.url;
  info["name"] = breed[0].name;
  info["temperaments"] = temperaments;
  info["height"] = breed[0].height.metric;
  info["weight"] = breed[0].weight.metric;
  info["life_span"] = breed[0].life_span;
  info["id"] = breed[0].id;
  info["id"] = breed[0].id;
  return info;
};
module.exports = getBreedById;
