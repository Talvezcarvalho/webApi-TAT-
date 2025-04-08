import { veiculos } from "../models/index.js";

class VeiculoRepository {
  static async listarTodos() {
    return await veiculos.find().exec();
  }

  static async buscarComFiltros(busca) {
    const veiculosResultado = await veiculos.find(busca).exec();
    return veiculosResultado; // Retorna os resultados encontrados
  }

  static async listarPorId(id) {
    const veiculoResultado = await veiculos.findById(id).exec();
    return veiculoResultado;
  }

  static async cadastrarVeiculo(veiculo) {
    return await veiculos.create(veiculo);
  }
}

export default VeiculoRepository;
