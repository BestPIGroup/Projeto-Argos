var express = require("express");
var router = express.Router();

var conexaoS3Controller = require ("../controllers/alertasS3Controller");

router.post("/buscar_registros_alertas", function (req, res) {
    conexaoS3Controller.buscarRegistrosAlertas(req,res);
});

module.exports = router;