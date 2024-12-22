import veiculoService from "../services/VeiculosService.js";

class VeiculoController {

    static listarVeiculos = async (req, res, next) => {
      try {
        const listaVeiculos = await veiculoService.listarTodos();
        res.status(200).send(listaVeiculos);
        } catch (erro) {
        next(erro);
      }
    }

    static buscarVeiculo = async (req, res, next) => {
        try {
          const veiculosResultado = await veiculoService.buscarPorParametros(req.query, next);
            res.status(200).send(veiculosResultado);
        } catch (erro) {
          next(erro);
        }
      }
    }

export default VeiculoController;   