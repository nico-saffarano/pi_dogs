const { Dog, Temperament } = require("../db");
const axios = require("axios");


const getApi = async () => {
  const dogsFromApi = await axios.get("https://api.thedogapi.com/v1/breeds");
  let dogsData = await dogsFromApi.data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      temperament: dog.temperament,
      weight_min: parseInt(dog.weight.metric.split("-")[0]),
      weight_max: parseInt(dog.weight.metric.split("-")[1]),
      height_min: parseInt(dog.height.metric.split("-")[0]),
      height_max: parseInt(dog.height.metric.split("-")[1]),
      life_span: dog.life_span,
      image: dog.image.url,
    };
  });
  return dogsData;
};

const getDB = async () => {
  try {
    const dogFromDb = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const dogsWithTemperaments = dogFromDb.map((dog) => {
      const temperaments = dog.Temperaments.map((temperament) => temperament.name);
      return {
        id: dog.id,
        name: dog.name,
        weight_min: dog.weight_min,
        weight_max: dog.weight_max,
        life_span: dog.life_span,
        image: dog.image,
        height_min: dog.height_min,
        height_max: dog.height_max,
        temperament: temperaments.length > 0 ? temperaments.join(",") : "There are no temperaments",
      };
    });

    return dogsWithTemperaments;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve dogs from the database.");
  }
};
const getAllDogs = async () => {
  let dbInfo = await getDB();
  let apiInfo = await getApi();
  let allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

module.exports = { getAllDogs, getApi, getDB };
