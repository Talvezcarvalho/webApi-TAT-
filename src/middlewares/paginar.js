
async function paginar(req, res, next) {
    next();
    try {

        let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
    
        limite = parseInt(limite);
        pagina = parseInt(pagina);

        ordem = parseInt(ordem);
    
        let [campoOrdenacao, ordem] = ordenacao.split(":");
    
        const resultado = req.resultado;

        if(limite > 0 && pagina > 0) {
          const boletinsResultado = await resultado.find()
          .sort({ [campoOrdenacao]: ordem})
          .skip((pagina - 1) * limite)
          .limit(limite)
          .populate("Endereco", "Veiculo")
          .exec();
          res.status(200).json(boletinsResultado);
        }
    }
    catch (erro) {
        next(erro);
    }

}

export default paginar;