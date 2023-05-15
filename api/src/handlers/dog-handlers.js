const { Dog, Temperament } = require("../db");
const {
  createDog,
  getDogById,
  getAllDogs,
  getApi,
  getDB,
} = require("../controllers/dog-controllers");
const axios = require("axios");

const getDogsHandler = async (req, res) => {
  const { name } = req.query;
  const allDogs = await getAllDogs(); //traigo todos los perros
  try {
    if (name) {
      //si existe name
      const dogSelected = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      dogSelected.length
        ? res.status(200).json(dogSelected)
        : res.status(404).send({ error: "No hay perros con ese nombre!" });
    } else {
      return res.status(201).json(allDogs);
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const getDogHandler = async (req, res) => {
   const { idRaza } = req.params;
  const allDogs = await getAllDogs();
  try {
    const dogId = allDogs.filter((dog) => dog.id == idRaza);
    if (dogId.length) {
      return res.status(200).send(dogId);
    }
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
};

const postNewDog = async (req, res) => {
  //recibo por body todas las propiedades que necesito
  const {
    name,
    image,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    temperament,
  } = req.body;
  try {
    // me fijo si existe ya un perro con el nombre que pensaba ponerle
    const dogFind = await Dog.findOne({
      where: { name: name },
    });
    //si encuentra, arroja un error con un mensaje
    if (dogFind) {
      return res.status(404).send("The dog already exist");
    } else {
      //si no existe, lo crea en la base de datos
      const newDog = await createDog(
        name,
        image,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,
        temperament
      );
      //busco en la tabla de temperaments de la bdd todos los temperaments que coincidan con los mios
      let temperamentFromDb = await Temperament.findAll({
        where: { name: temperament },
      });
      //agrego la relacion
      newDog.addTemperament(temperamentFromDb);
      return res.status(200).send("Creaste un perro exitosamente!");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getDogsHandler,
  getDogHandler,
  postNewDog,
};

/*  GET | /dogs
Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.*/

//la funcion trae a todos los perros, tanto de la api como de la base de datos
//tengo que crear una funcion que traiga los perros de la api
//tambien tengo que crear una funcion que traiga los perros de la base de datos
//y luego unificar los perros de ambas funciones en un arreglo completo
//puede que me envien un name por query
//entonces tengo que preguntar si llega algun name por query
//si existe una query-> traer solo a los perros que tengan ese name
//si no existe una query->traer a todos
