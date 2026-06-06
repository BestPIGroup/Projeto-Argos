var conexaoS3Model = require("../models/alertasS3Model");

function buscarRegistrosAlertas(req,res){ 
    var mac = req.body.MacServers;

    if (mac == undefined){
        res.status(400).send("Mac indefinido");
    }else{

        conexaoS3Model.buscarRegistrosAlertas(mac)
            .then(

                function(resultado){

                    res.send(resultado);

                }

            ).catch(

                function(erro){

                    console.log(erro);
                    console.log("Não foi possível ler o csv");
                    res.status(500).json(erro);

                }

            )

    }

}

module.exports = {
    buscarRegistrosAlertas
}   