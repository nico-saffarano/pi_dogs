const { Temperament } = require("../db");
const axios = require("axios");

const getTemperamentsHandler = async (req, res) => {
  try {
    const { data } = await axios("https://api.thedogapi.com/v1/breeds/");

    //aca en esta variable,mapeo data quedandome solo con la propiedad temperament de cada perro
    //el resultado es un array de strings con todos los temperaments
    const temperamentsStr = data.map((dog) => dog.temperament);

    //tengo que recorrer ese array y por cada elemento , spliteo por comas
    let temperamentsSplit = await temperamentsStr.join().split(",");
    //como los strings tienen espacios, los elimino con trim
    let temperamentsTrim = await temperamentsSplit.map((temp) => temp.trim());

    //guardo en la base de datos
    //recorro cada element del array temperamentsTrim
    //Si el length del element > 0, busco o creo en la tabla Temperaments a element
    await temperamentsTrim.forEach(async (element) => {
      if (element.length > 0) {
        await Temperament.findOrCreate({
          where: { name: element },
        });
      }
    });
    const allTemperament = await Temperament.findAll();
    return res.status(200).json(allTemperament);
  } catch (error) {
    res.status(404).send({ error: 'No se encuentran temperamentos!' });
  }

};

module.exports = { getTemperamentsHandler };
