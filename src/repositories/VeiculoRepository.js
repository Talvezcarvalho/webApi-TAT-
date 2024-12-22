import { veiculos } from "../models/index.js";

class VeiculoRepository {


  static async listarTodos() {
    return await veiculos.find().exec();
  }

  static async buscarComFiltros(busca) {
    try {
        const veiculosResultado = await veiculos.find(busca).exec();

        if (veiculosResultado.length > 0) {
            return veiculosResultado; // Retorna os resultados encontrados
        } 
    } catch (error) {
        throw new Error(error); 
    }
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
