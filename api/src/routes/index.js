const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getDogsHandler,
  getDogHandler,
  postNewDog,
} = require("../handlers/dog-handlers");
const { getTemperamentsHandler } = require("../handlers/temperaments-handlers");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", getDogsHandler);

router.get("/dogs/:id", getDogHandler);

router.post("/dogs", postNewDog);

router.get("/temperaments", getTemperamentsHandler);

module.exports = router;
