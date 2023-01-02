const { Router } = require("express");
const dogs = require("./dogRouter");
const temperament = require("./temperamentRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use("/dogs", dogs);
router.use("/temperament", temperament);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
