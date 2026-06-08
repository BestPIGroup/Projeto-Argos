var express = require("express");
var router = express.Router();

var servidoresController = require ("../controllers/servidoresController");

router.post("/cadastrar_servidor",  function (req, res) {
    servidoresController.cadastrar_servidor(req, res);
})

router.post("/buscar_servidores", function(req,res){
    servidoresController.buscar_servidores(req,res);
})

router.post("/buscar_limites", function(req,res){
    servidoresController.buscar_limites(req,res);
})

module.exports = router;