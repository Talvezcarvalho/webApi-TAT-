import mongoose from "mongoose";

const BoletimFurtoVeiculoSchema = new mongoose.Schema({
    dataOcorrencia: {type: String, required: true},
    periodoOcorrencia: {type: String, required: true},
    localOcorrencia: {type: mongoose.Schema.Types.ObjectId, ref: 'enderecos', required: true}, // Referência ao Endereço
    veiculoFurtado: {type: mongoose.Schema.Types.ObjectId, ref: 'veiculos', required: true}, // Referência ao Veículo
    tipoCrime: {type: String, required: true},
    descricaoCrime: {type: String}

}, {versionKey: false});

    const boletins = mongoose.model('BoletimFurtoVeiculo', BoletimFurtoVeiculoSchema);

    export default boletins;