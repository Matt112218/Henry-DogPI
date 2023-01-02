const { Router } = require("express");
const getAllBreeds = require("./controllers/getAllBreeds");
const axios = require("axios");
const { Dog } = require("../db");
const getSearchBreeds = require("./controllers/getSearchBreeds");
const postDogs = require("./controllers/postDogs");
const dogs = Router();

dogs.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      const dogsData = await getAllBreeds();

      return res.status(200).send(dogsData);
    } else {
      const dogsData = await getSearchBreeds(name);
      if (!dogsData.length) {
        return res.status(200).send({ error: "Breed not found" });
      }
      return res.status(200).send(dogsData);
    }
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
});

dogs.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const allBreeds = response.data;

    if (isNaN(id)) {
      const responseDB = await Dog.findAll({ where: { id } });
      if (!responseDB) {
        return res.status(404).send({ error: "Breed not found" });
      } else {
        return res.status(200).send(responseDB);
      }
    } else {
      const breedId = parseInt(id);
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

      res.status(200).send(info);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

dogs.post("/", async (req, res) => {
  try {
    const { temperaments } = req.body;
    const newBreed = await postDogs(req.body);
    if (typeof newBreed === "string") {
      res.status(201).send(newBreed);
    } else {
      newBreed.addTemperaments(temperaments);
      res.status(201).send(`${newBreed.name} was created succesfully`);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = dogs;
