// src/services/VeiculoService.js
import VeiculoRepository from "../repositories/VeiculoRepository.js";
import EnderecoRepository from "../repositories/enderecoRepository.js"; // Se necessário
import BoletimRepository from "../repositories/boletimRepository.js"; // Caso precise de boletins associados

class VeiculoService {
    constructor(veiculoRepository, enderecoRepository, boletimRepository) {
        this.veiculoRepository = veiculoRepository;
        this.enderecoRepository = enderecoRepository;
        this.boletimRepository = boletimRepository; 
    }

    async listarTodos() {
        return await this.veiculoRepository.listarTodos();
    }

    async buscarPorParametros(parametros) {
        try {
            const busca = await processaBusca(parametros, this.enderecoRepository);
            if (busca !== null) {
                return await this.veiculoRepository.buscarComFiltros(busca );
            }
            
        } catch (error) {
            throw new Error(error);
       
    }
    }
    async listarPorId(id) {
        return await this.veiculoRepository.listarPorId(id);
    }

    async cadastrarVeiculo(veiculo) {
        try {
            // Verificar se o local já existe, caso contrário cria um novo
            let local = await this.enderecoRepository.buscarComFiltros({ cidade: veiculo.localFurto.cidade, rua: veiculo.localFurto.rua });
            if (!local) {
                local = await this.enderecoRepository.cadastrarEndereco(veiculo.localFurto);
            }

            // Salvar o veículo
            const novoVeiculo = await this.veiculoRepository.cadastrarVeiculo(veiculo, local._id);

            return novoVeiculo; // Retornar o veículo criado
        } catch (error) {
            console.error("Erro ao criar veículo:", error);
            throw error;
        }
    }
}

// Função de busca adaptada para veículos
async function processaBusca(parametros) {
    const { placa, cor, tipoVeiculo } = parametros;

    // Criação de expressões regulares para filtros de cidade
    const regexCor = cor ? new RegExp(cor, "i") : null;

    let busca = {};
    if (placa) {
        busca.placa = placa;
    }
    if (regexCor) 
        busca.corVeiculo = regexCor;

    if (tipoVeiculo) {
        busca.tipoVeiculo = tipoVeiculo;
    }
    
    return busca;
}

const veiculoService = new VeiculoService(VeiculoRepository, EnderecoRepository, BoletimRepository);

export default veiculoService;
