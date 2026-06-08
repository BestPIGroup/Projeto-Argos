var servidoresModel = require("../models/servidoresModel");

function cadastrar_servidor(req, res) {

    var Mac = req.body.MacServer;
    var status = req.body.statusServer;
    var fk_unidade = req.body.fk_unidadeServer;
    var alias = req.body.aliasServer;

    if (Mac == undefined) {
        res.status(400).send("Seu Mac está undefined!");
    } else if (status == undefined) {
        res.status(400).send("Seu status está undefined!");
    }else if (alias == undefined){
        res.status(400).send("Seu status está undefined!");
    } else {
        servidoresModel.cadastrar_servidor(alias,Mac, status, fk_unidade)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do servidor! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscar_servidores(req,res){

    var unidade = req.body.fkUnidade;

    if(unidade == null){
        res.status(400).send("Unidade inexistente");
    }else{

        servidoresModel.buscar_servidores(unidade)
        .then(
            function(resultado){
                console.log(resultado)
                res.json(resultado);
            }
        ).catch(
            function (erro){

                console.log("Erro na busca dos servidores"+erro)
                res.status(500).json(erro.sqlMessage);
            
            }
        )

    }

}

function buscar_limites(req,res){

    var id = req.body.id;
    
    if(id == undefined){

        res.status(400).send("mac inexiste")

    }else{

        servidoresModel.buscar_limites(id)
        .then(

            function (resultado){

                console.log("dsklfnsdfbsdfnsdkjfsdkjfsdfjksdf");
                res.json(resultado);

            }

        )
        .catch(

            function(erro){

                console.log("Erro na busca dos limites: ", erro);
                res.status(500).json(erro.sqlMessage);

            }            

        )

    }

}

module.exports = {
    cadastrar_servidor,
    buscar_servidores,
    buscar_limites
}