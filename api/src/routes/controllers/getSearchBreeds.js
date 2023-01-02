const axios = require("axios");
const { Dog } = require("../../db");
const { Op } = require("sequelize");

const getSearchBreeds = async (q) => {
  const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/`);

  const dogsData = [];
  if (data.length) {
    data.forEach(async (each) => {
      if (each.name.toLowerCase().includes(q.toLowerCase())) {
        const info = {};

        const temperaments = each.temperaments && each.temperament.split(",");

        info["image"] = each.image.url;
        info["id"] = each.id;
        info["name"] = each.name;
        info["weight"] = each.weight.metric;
        info["temperament"] = temperaments;
        dogsData.push(info);
      }
    });
  }
  const DBResponse = await Dog.findAll();
  const breedByName = DBResponse.filter((breed) =>
    breed.name.toLowerCase().includes(q.toLowerCase())
  );

  const allQueries = [...breedByName, ...dogsData];
  return allQueries;
};

module.exports = getSearchBreeds;
