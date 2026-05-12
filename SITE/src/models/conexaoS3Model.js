const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const client = new S3Client({
  region: "us-east-1",
  credentials: {
    aws_access_key_id:"ASIAR25BJDHCYUJHIEK5",
    aws_secret_access_key:"/e3Wo3gCpG0fyViLJWG9t5P5y1i9FhU8h8B1ZkPi",
    aws_session_token:"IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIAF8cn/1r+7wNDdGAPQnqAPJ0JS/7uTNoXUAYC0RKT8UAiAzhTKyl3h5YiTXuU5FaCxnJxInZplvf9/MHirwPJtjyiq1AggkEAAaDDEyNjUwMjkwMjIxMyIMH6CWH7Ng6iCcw/tCKpICR2R7HKcPVAlXfOehPEzs0bjHC9jCl0DOo3cG0ew7YGn6ujM+HhKa13LabQoKGKJeH+nkrCS3Je+u4Ib7a7ocF37GPZUerDTQuikdvEPz/1wblyaL3NmgNBaZNEtr3YMHhSf61vcQcfl/d/ilgPbMenv5KlTXnyD87ngzfbErGCIjZ41NoeiiHO33AmzTcM1PufKQ2P6kzNqcj9nh9En94pUMvqylznqzFoKGhby3YqWAwbKRPiVCIk/XTPUbBimnpS7DXPDbB3tMboJBQNUSUaD+jvJ9iEPkRYBgrc6zlAHLyeN+l/nuQs2my+aFFjm7zXbsBDCblGiDRLjJ9F+nVuDUoZkakjvgPpK87fR+Q3OoozC2rIrQBjqeAd3DvfAnZNoHf/yaPyvo2rzeac7cf4cRWvxDL8pJJbwDBuE6DJRNVXOaIL2eoQHXDmQzoXKrFP0IS4e7Q4Yn77Ij3ilFmPvOn1MPZxxDtahbkKNmR8fC0XclFzkMMe/7tmjSS/G55M07g2BtK2JkLSRX2jKc6qqz/E31/305zxDhVOx1tqefMX6RtB4693zSs//XJcgumD7CMRdCkhUL"
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