import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import fs from "fs";
import csv from 'csv-parser';
import Boletim from "../models/BoletimFurtoVeiculo.js";
import Endereco from "../models/Endereco.js";  // Importando o modelo Endereco
import Veiculo from "../models/Veiculo.js";    // Importando o modelo Veiculo

//Roda apenas para iniciar a aplicação, não deve ser executada novamente

//mongoose.connect("mongodb+srv://admin:aluno@cluster0.0odcg.mongodb.net/", {
    useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000,  // Aumenta o tempo de conexão para 30 segundos
    socketTimeoutMS: 45000,
})
    .then(() => console.log("Conexão com o banco de dados estabelecida com sucesso"))
    .catch(erro => console.log("Erro na conexão", erro));

// Função para importar os dados do CSV
async function importarCSV(caminhoArquivo) {
    const boletins = [];
    // itera sobre as linhas do arquivo CSV
    fs.createReadStream(caminhoArquivo)
        .pipe(csv({ separator: '\t' }))
        .on('data', async (row) => {
            // console.log(row); // Verifique como os dados são mapeados
            const latitude = row.LATITUDE && row.LATITUDE.trim() === "" ? null : row.LATITUDE;
            const longitude = row.LONGITUDE && row.LONGITUDE.trim() === "" ? null : row.LONGITUDE;
            // Verificação para anoFabricacao
            let anoFabricacao = row.ANO_FABRICACAO && row.ANO_FABRICACAO.trim() !== ""
                ? Number(row.ANO_FABRICACAO.trim())
                : null;
            if (isNaN(anoFabricacao) || anoFabricacao <= 0) {
                anoFabricacao = null;
            }

            // Verificação para anoModelo
            let anoModelo = row.ANO_MODELO && row.ANO_MODELO.trim() !== ""
                ? Number(row.ANO_MODELO.trim())
                : null;

            if (isNaN(anoModelo) || anoModelo <= 0) {
                anoModelo = null;
            }
            // console.log('Valor de anoModelo:', anoModelo); // Para depuração
            // console.log('Valor de anoFabricacao:', anoFabricacao); // Para depuração


            const enderecoData = {
                rua: row.LOGRADOURO,
                numero: row.NUMERO,
                bairro: row.BAIRRO,
                cidade: row.CIDADE,
                uf: row.UF,
                latitude: latitude,
                longitude: longitude,
                descricaoLocal: row.DESCRICAOLOCAL
            };

            // Salvar o endereço
            const endereco = new Endereco(enderecoData);
            await endereco.save();

            const veiculoData = {
                placa: row.PLACA_VEICULO,
                ufVeiculo: row.UF_VEICULO,
                cidadeVeiculo: row.CIDADE_VEICULO,
                corVeiculo: row.DESCR_COR_VEICULO,
                marcaVeiculo: row.DESCR_MARCA_VEICULO,
                anoFabricacao: anoFabricacao,
                anoModelo: anoModelo,
                tipoVeiculo: row.DESCR_TIPO_VEICULO
            };

            // Salvar o veículo
            const veiculo = new Veiculo(veiculoData);
            await veiculo.save();

            const boletimData = {
                dataOcorrencia: new Date(row.DATAOCORRENCIA),
                periodoOcorrencia: row.PERIDOOCORRENCIA,
                localOcorrencia: endereco._id,  // Referência ao Endereço
                veiculoFurtado: veiculo._id,  // Referência ao Veículo
                tipoCrime: row.ESPECIE,
                descricaoCrime: row.RUBRICA
            };
            // Salvar o boletim associado ao veículo e ao endereço
            const boletim = new Boletim(boletimData);
            await boletim.save();
            boletins.push(boletim);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        })
        .on('error', (err) => {
            console.error("Erro ao processar o CSV", err);
        });
}


//importarCSV('../data/boletins.csv');  // Caminho do seu arquivo CSV
