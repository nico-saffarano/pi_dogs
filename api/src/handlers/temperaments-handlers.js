const { Temperament } = require("../db");
const axios = require("axios");

const getTemperamentsHandler = async (req, res) => {
  try {
    const { data } = await axios("https://api.thedogapi.com/v1/breeds/");

    const temperamentsStr = data.map((dog) => dog.temperament);

    let temperamentsSplit = await temperamentsStr.join().split(",");

    let temperamentsTrim = await temperamentsSplit.map((temp) => temp.trim());

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

/* Documentacion
getTemperamentsHandler -> funcionando
Este handler se encarga de obtener la lista de temperamentos de perros.
Usa un try catch para el manejo de errores
En el try, me quedo con la respuesta de axios a traves del destructuring de data
Se extrae el arreglo de temperamentos de los datos recibidos utilizando el método map en el arreglo data. 
Cada elemento del array data contiene la info completa de un perro, asique en temperamentStr extraigo la propiedad temperament
Los temperamentos vienen en un string, separados por comas

Luego, se obtiene una lista de temperamentos sin duplicados y sin espacios adicionales a traves de los metodos:
join -> para unir todos los elementos del array temperamentsStr en un string separado por comas 
split -> para dividir el string en un arreglo de temperamentos usando la coma para separar.
map -> para recorrer cada elemento del array 
trim -> para eliminar espacios adicionales
El resultado se guarda en temperamentsTrim.
Con un bucle forEach async se recorre cada temperamento en el array
Si el length del temperamento > 0 (no está vacío) se usa el método findOrCreate para buscar el temperamento en la db
Si no existe, se crea un nuevo registro con el nombre del temperamento
se usa el metodo findAll del modelo Temperament para guardar todos los registros de temperamentos de la db en allTemperament
se devuelve una respuesta con estado 200 (éxito) y se envía la lista de temperamentos como respuesta.
Si hay error,se devuelve una respuesta con estado 404 (not found)
*/