import mongoose from "mongoose";

const VeiculoSchema = new mongoose.Schema({
  placa: { type: String, required: true },
  ufVeiculo: { type: String, required: false },
  cidadeVeiculo: { type: String, required: true },
  corVeiculo: { type: String, required: true },
  marcaVeiculo: { type: String, required: true },
  anoFabricacao: { type: Number, required: true },
  anoModelo: { type: Number, required: false },
  tipoVeiculo: { type: String, required: true }
}, { versionKey: false });

const veiculos = mongoose.model('veiculos', VeiculoSchema);

export default veiculos;
