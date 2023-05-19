const { Dog, Temperament } = require("../db");
const {
  createDog,
  getDogById,
  getAllDogs,
  getApi,
  getDB,
} = require("../controllers/dog-controllers");

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
  const { id } = req.params;
  console.log('el id desde el handler',id)
  const allDogs = await getAllDogs();
  try {
    const dogId = allDogs.filter((dog) => dog.id == id);
    if (dogId.length) {
      return res.status(200).json(dogId);
    }
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
};

const postNewDog = async (req, res) => {
  const {
    name,
    image,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    createdInDB,
    temperament,
  } = req.body;
  try {
    const dogFind = await Dog.findOne({
      where: { name },
    });
    if (dogFind) {
      return res.status(404).send("There is a dog with that name!");
    } else {
      const newDog = await Dog.create({
        name,
        image,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,
        createdInDB,
      });
      //por body me llega un array de temperamentos,deberia  recorrer ese array
      //recorro y pregunto si en el array , hay temperaments que coincidan en la db
      //

      for (let i = 0; i < temperament.length; i++) {
        const element = temperament[i];

        // hago la verificación y consulta en la db
        const result = await Temperament.findOne({ where: { name: element } });
        newDog.addTemperament(result);
      }

      return res.status(200).send("Successfully created!");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDogsHandler,
  getDogHandler,
  postNewDog,
};

//getGodHandler -> funcionando
//recibe id de request por params -> con destructuring
//primero se trae todos los perros con getAllDogs
//se hace un filter para encontrar al perro con el id recibido en la req
//si se encuentra, se envia como respuesta del servidor
//de lo contrario se muestra un mensaje de error