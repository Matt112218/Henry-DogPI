const { Router } = require("express");
const axios = require("axios");
const { Temperament } = require("../db");
const { where, UUIDV4 } = require("sequelize");

const temperament = Router();

temperament.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds`);

    const temperaments = [];

    data.forEach(async (each) => {
      if (each.hasOwnProperty("temperament")) {
        const tempByBreed = each.temperament.split(",");
        temperaments.push(tempByBreed);
      }
    });
    const flated = temperaments.flat();
    const trimmed = flated.map((each) => {
      return each.trim();
    });
    const set = [...new Set(trimmed)];

    const objTemps = [];
    set.forEach((each) => {
      objTemps.push({ name: each });
    });

    await objTemps.forEach(async (each) => {
      await Temperament.findOrCreate({ where: { name: each.name } });
    });

    const allTemps = await Temperament.findAll();

    res.status(200).send(allTemps);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = temperament;
