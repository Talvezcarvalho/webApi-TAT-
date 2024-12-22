import { enderecos } from "../models/index.js";

// Repositório de endereços
class EnderecoRepository {
  static async listarTodos() {
    const buscaEnderecos = await enderecos.find().exec();
    return buscaEnderecos;
  }

  static async buscarComFiltros(busca) {
    const enderecosResultado = await enderecos.find(busca).exec();
    return enderecosResultado;
  }

  static async listarPorId(id) {
    const enderecoResultado = await enderecos.findById(id).exec();
    return enderecoResultado;
  }

    static async cadastrarEndereco(endereco) {
        return await enderecos.create(endereco);
    }

}

export default EnderecoRepository;
