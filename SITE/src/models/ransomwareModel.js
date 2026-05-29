// models/ransomwareModel.js
const AWS = require("aws-sdk");

async function buscarDadosRansomware(mac) {

    AWS.config.update({
        region:          process.env.AWS_REGION,
        accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken:    process.env.AWS_SESSION_TOKEN,
    });

    const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

    const resposta = await s3.getObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "client/ransomware.json",
    }).promise();

    const json = JSON.parse(resposta.Body.toString("utf-8"));

    if (!mac) return json;

    const dados = json[mac];
    if (!dados) return null;

    return dados;
}

module.exports = { buscarDadosRansomware };
