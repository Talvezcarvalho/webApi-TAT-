import mongoose from "mongoose";

const EnderecoSchema = new mongoose.Schema({
  rua: { type: String, required: true },
  numero: { type: String, required: false },
  bairro: { type: String, required: true }, // Não obrigatório
  cidade: { type: String, required: true },
  uf: { type: String, required: true }, // Não obrigatório
  latitude: { type: String, required: false },
  longitude: { type: String, required: false },
  descricaoLocal: { type: String, required: false }


}, {versionKey: false});

    const enderecos = mongoose.model('enderecos', EnderecoSchema);

    export default enderecos;