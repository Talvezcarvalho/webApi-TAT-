import NaoEncontrado from "../erros/NaoEncontrado.js";
import BoletimService from "../services/BoletimService.js";
class BoletimController {

    static listarBoletins = async (req, res, next) => {
        try {
            BoletimService.listarTodos(next).then((boletinsResultado) => {
                res.status(200).send(boletinsResultado);
            })
        } catch (erro) {
            throw new Error("Erro ao listar boletins:" + erro.message) // Passa o erro para o manipulador de erro
        }
    }

    static listarBoletimPorId = async (req, res, next) => {
        try {
            BoletimService.listarPorId(req.params.id).then((boletimResultado) => {
                res.status(200).send(boletimResultado);
            }
            )
        } catch (erro) {
            next(erro);
        }
    }

    static cadastrarBoletim = async (req, res, next) => {
        try {
            const boletimResultado = await BoletimService.cadastrarBoletim(req.body); // Aguardar o retorno da promessa
            res.status(201).send(boletimResultado);
        } catch (erro) {
            next(erro);
        }
    }

    static atualizarBoletim = async (req, res, next) => {
        try {
            const id = req.params.id;
            await BoletimService.atualizarBoletim(id, { $set: req.body});
            res.status(200).send({ message: "Boletim atualizado com sucesso" });
        } catch (erro) {
            next(erro);
        }
    }

    static excluirBoletim = async (req, res, next) => {
        try {
            const id = req.params.id;

            await BoletimService.excluirBoletim(id);
            
            res.status(200).send({ message: "Boletim removido com sucesso" });
        } catch (erro) {
            next(erro);
        }
    }

    static buscarBoletim = async (req, res, next) => {
        try {
            const resultadoBoletim = await BoletimService.buscarPorParametros(req.query);
            if ( resultadoBoletim !== null) {
                console.log(resultadoBoletim);
                res.status(200).send(resultadoBoletim);
            }
            else {
                next( new NaoEncontrado("Boletim não encontrado"));
            }
        } catch (erro) {
            next(erro);
        }
    }
}



export default BoletimController;
