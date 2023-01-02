const { Dog } = require("../../db");

const postDogs = async (arguments) => {
  const { name, height, weight } = arguments;
  if (!name || !height || !weight) {
    throw new Error("Missing Information");
  }
  const findBreed = await Dog.findAll({ where: { name } });
  if (!findBreed.length) {
    const createdBreed = await Dog.create(arguments);
    return createdBreed;
  } else {
    return "Breed already exists";
  }
};

module.exports = postDogs;
