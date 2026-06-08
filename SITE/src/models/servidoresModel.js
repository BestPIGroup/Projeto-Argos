var database = require("../database/config");

function cadastrar_servidor(alias, Mac, status, fk_unidade) {
    console.log("ACESSEI O MODEL DA UNIDADE \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_Unidade(): ")
    var instrucaoSql = `INSERT INTO servidor(alias,endereco_mac, status_servidor, fk_unidade) VALUES('${alias}','${Mac}', '${status}', '${fk_unidade}');`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscar_servidores(unidade) {

    console.log("ACESSEI O MODEL DA UNIDADE \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_Unidade(): ")
    var instrucaoSql = `select * from servidor where fk_unidade = ${unidade};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function buscar_limites(id){

    console.log("ACESSEI O MODEL DA UNIDADE \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_Unidade(): ")
    var instrucaoSql = `select * from componente_servidor where id_servidor = ${id} and (id_componente = 1 or id_componente = 6 or id_componente = 9 or id_componente = 12 or id_componente = 13);`;
    console.log("Executando a instrução SQL: \n" +   instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    cadastrar_servidor,
    buscar_servidores,
    buscar_limites

}