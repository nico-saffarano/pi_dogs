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
      origin:dog.origin,
      bredFor:dog.bred_for,
      image_id:dog.image.id
      
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


/* Documentacion
getApi -> funcionando
Usa axios para hacer una peticion de tipo get a la api
La respuesta contiene información sobre diferentes razas de perros 
Se realiza un mapeo de los datos recibidos
Se extraen los atributos que pidieron ->id,nombre,temperamento,peso mínimo y máximo,altura mínima y máxima,esperanza de vida,imagen
Todos los datos se guardan en un objeto y se devuelven en un array de objetos

getDB -> funcionando
Usa el metodo findAll del modelo Dog para hacer una consulta a la db para obtener información de los perros guardados
Trae todos los atributos básicos del perro, y los temperamentos asociados
Se mapean los resultados obtenidos para guardar en un objeto los datos 
Los temperamentos asociados se guardan como un string separado por comas
Si un perro no tiene temperamentos asociados, se muestra el mensaje "There are no temperaments"  
Devuelve un array de objetos 

getAllDogs -> funcionando
Este controller combina los array obtenidos en getApi y getDB
Se llama a getDB para obtener los datos de perros de la db 
Se llama a getApi para obtener los perros de la api
Sn allInfo se concatenan ambos array para obtener un unico array con todos los perros
Se devuelve el array unico
*/
