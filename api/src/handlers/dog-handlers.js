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
        : res.status(404).send({ error: "There's not dogs with that name!" });
    } else {
      return res.status(200).json(allDogs);
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const getDogHandler = async (req, res) => {
  const { id } = req.params;
  
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
  try {
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

    // Crear la raza de perro en la base de datos
    const newDog = await Dog.create({
      name,
      image,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span,
      CreatedInDB: createdInDB,
    });

    // Relacionar el perro con los temperamentos indicados
    const temperamentRecords = await Temperament.findAll({
      where: { name: temperament },
    });

    await newDog.addTemperaments(temperamentRecords);

    res.status(201).json(newDog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getDogsHandler,
  getDogHandler,
  postNewDog,
};



/* Documentacion

getDogsHandler -> funcionando
Este handler se encarga de obtener una lista de perros
Primero, recibe la consulta name desde el objeto req.query
A continuación, llama a la función getAllDogs para obtener todos los perros de la base de datos
Si recibo un name por query, filtra la lista de perros para obtener los perros coincidentes con el name
Si se encuentran perros que coincidan con el name, devuelve una respuesta con estado 200(exit) y envía la lista de perros encontrados
Si no se encuentran perros que coincidan con el name, devuelve una respuesta con estado 404 (not found) y responde con un msj de error
Si no llega ningun name, devuelve una respuesta con estado 201 (creado) y envía la lista completa de perros


 getGodHandler-> funcionando
Este handler se encarga de obtener un perro específico por su ID.
Recibe el id por params usando destructuring
Llama a la función getAllDogs para obtener todos los perros
Filtra la lista de perros para encontrar aquellos cuyo id coincide con el id recibido
Si se encuentra un perro que coincida, devuelve una respuesta con estado 200 (exit) y envía el perro como respuesta.
Si no se encuentra ningún perro, no envío nada como respuesta 

postNewDog -> funcionando
Este handler se encarga de crear un nuevo perro en la base de datos.
Recibe los datos del perro por body
Creo un nuevo perro en la db con los datos recibidos con el metodo create del modelo Dog
Busca los registros de temperamentos correspondientes a los temperamentos que se reciben en body.
Asocia los temperamentos encontrados con el nuevo perro con el metodo addTemperaments.
Si el perro se creó bien, devuelve una respuesta con estado 201 (created) y envía el objeto del nuevo perro como respuesta.
Si hay algun error, se devuelve una respuesta un estado 500 (error interno del servidor) y el mensaje de error 
*/