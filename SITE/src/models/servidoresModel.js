const database = require("../database/config");

const componentesPadraoCadastro = [
    { id: 1, limite: 85 },
    { id: 3, limite: 85 },
    { id: 6, limite: 80 },
    { id: 7, limite: 100 },
    { id: 8, limite: 100 }
];

function limparValorSql(valor) {
    return String(valor || "").replace(/'/g, "''");
}

function cadastrar_servidor(alias, mac, status, fk_unidade) {
    const instrucaoSql = `
        INSERT INTO servidor(alias, endereco_mac, status_servidor, fk_unidade)
        VALUES (
            '${limparValorSql(alias)}',
            '${limparValorSql(mac)}',
            '${limparValorSql(status)}',
            '${limparValorSql(fk_unidade)}'
        );
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar_componentes_servidor(mac) {
    const macLimpo = limparValorSql(mac);
    const valores = componentesPadraoCadastro.map(componente => `
        (
            (SELECT id_servidor FROM servidor WHERE endereco_mac = '${macLimpo}'),
            ${componente.id},
            ${componente.limite},
            1
        )`
    ).join(",");

    const instrucaoSql = `
        INSERT INTO componente_servidor(id_servidor, id_componente, limite_componente, exibir)
        VALUES ${valores};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar_servidores(fk_unidade) {
    const filtroUnidade = fk_unidade ? ` WHERE fk_unidade = '${limparValorSql(fk_unidade)}'` : "";
    const instrucaoSql = `
        SELECT
            id_servidor AS idServidor,
            alias,
            endereco_mac AS mac,
            status_servidor AS status,
            fk_unidade AS fkUnidade
        FROM servidor
        ${filtroUnidade}
        ORDER BY alias;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar_servidor,
    cadastrar_componentes_servidor,
    listar_servidores
};
