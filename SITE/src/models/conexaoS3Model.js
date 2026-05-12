const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const client = new S3Client({
  region: "",
  credentials: {
    aws_access_key_id:"",
    aws_secret_access_key:"",
    aws_session_token:""
  }

});

async function buscarRegistros(mac,linhas){

    try {

        const comando = new GetObjectCommand({

            Bucket: "bucket-teste-2026-06-04-murilo",
            Key: "client/client.csv"
        
        });

        const resposta = client.send(comando);

        const conteudo = await resposta.Body.transformToString();

        const rows = await conteudo.split('\n');
        
        var respostaLista = []

        var count = 0

        for (const row in rows){

            rowSep = row.split(",");

            if(rowSep[0] == mac){

                respostaLista.push(row)
                count ++;

            }

            if(count == linhas){

                break;

            }

        }

        print(respostaLista);

        return(respostaLista);

        } catch (error) {

            console.error(error);
        
        }

}

module.exports = {
    buscarRegistros
};