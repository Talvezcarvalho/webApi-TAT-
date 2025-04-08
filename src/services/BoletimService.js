import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import BoletimRepository from "../repositories/boletimRepository.js";
import EnderecoRepository from "../repositories/enderecoRepository.js";
import VeiculoRepository from "../repositories/VeiculoRepository.js";

class BoletimService {
    constructor(boletimRepository, enderecoRepository, veiculoRepository) {
        this.boletimRepository = boletimRepository;
        this.enderecoRepository = enderecoRepository;
        this.veiculoRepository = veiculoRepository;
    }


    async listarTodos(next) {
        try {
            return await this.boletimRepository.listarTodos();
        } catch (error) {
            next(error);
        }
    }

    async buscarPorParametros(parametros) {
        const parametrosValidos =  [ 'periodoOcorrencia', 'cidade' ]
        const parametrosRecebidos = Object.keys(parametros);
        const parametrosInvalidos = parametrosRecebidos.filter(parametro => !parametrosValidos.includes(parametro));
        if (parametrosInvalidos.length > 0) {
            throw new RequicaoIncorreta("Parâmetros inválidos para busca de boletins");
        }
        try {
            const busca = await processaBusca(parametros, this.enderecoRepository);
            if (!busca) {
                throw new NaoEncontrado("Parâmetros não resultaram em nenhum boletim"); // Lança erro
            }
            else if (busca !== null) {
                const resultado = await this.boletimRepository.buscarComFiltros(busca);

                if (!busca || Object.keys(busca).length === 0){
                    throw new NaoEncontrado("Boletim não encontrado"); // Lança erro caso não haja boletins
                }

                if (!resultado || resultado.length === 0) {
                    throw new NaoEncontrado("Nenhum boletim encontrado.");
                }
                    return resultado; // Retorna o resultado da busca
                
            }   

        } catch (error) {
            if (error instanceof NaoEncontrado) {
                throw error;
            }
            else {
                console.error("Erro ao buscar boletins:", error); 
                throw new Error("Erro interno ao buscar boletins")
            }
        }
    }

    async listarPorId(id) {
        return await this.boletimRepository.listarPorId(id);
    }

    async cadastrarBoletim(boletim) {
        try {  
                let local = await this.enderecoRepository.cadastrarEndereco(boletim.localOcorrencia);
                console.log("Local criado", local);
            
                let veiculo = await this.veiculoRepository.cadastrarVeiculo(boletim.veiculoFurtado);
                        
            // Salvar o boletim
            const novoBoletim = await this.boletimRepository.cadastrarBoletim(boletim,local._id, veiculo._id);

            return novoBoletim;
        }catch (error) {
            console.error("Erro ao criar boletim:", error);
            throw error;
         }
        }
    
    

    async atualizarBoletim(id, boletim) {
        try {
        return await this.boletimRepository.atualizarBoletim(id, boletim);
        }
        catch (error) {
            console.error("Erro ao atualizar boletim:", error);
            throw error;
        }
    }

    async excluirBoletim(id) {
        try {
            return await this.boletimRepository.excluirBoletim(id);
        } catch (error) {
            console.error("Erro ao excluir boletim:", error);
            throw error;
        }
    }
}


async function processaBusca(parametros, enderecoRepository) {
    const { cidade, periodoOcorrencia } = parametros;

    // Criação de expressões regulares para filtros de cidade
    const regexCidade = cidade ? new RegExp(cidade, "i") : null; 

    const regexPeriodo = periodoOcorrencia ? new RegExp(periodoOcorrencia, "i") : null;

    let busca = {};

    if (regexPeriodo) busca.periodoOcorrencia = regexPeriodo;
    if (regexCidade) {
        console.log(cidade);
        const enderecos = await enderecoRepository.buscarComFiltros({ cidade: regexCidade })


        if (!enderecos || enderecos.length === 0) {
            console.log("Nenhum endereço encontrado para a cidade:", cidade);
            return null;
        }
        else if (enderecos && enderecos.length > 0) {
            busca.localOcorrencia = enderecos.map(endereco => endereco._id); // Mapear para pegar os _id
        }
    }
    return busca;
}

const boletimService = new BoletimService(BoletimRepository, EnderecoRepository, VeiculoRepository);

export default boletimService;
