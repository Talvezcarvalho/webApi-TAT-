import { boletins } from "../models/index.js";
class BoletimRepository {
  
  static async listarTodos() {
    const buscaBoletins = await boletins.find()
    .populate("localOcorrencia") 
    .populate("veiculoFurtado")
    return buscaBoletins
}

  static async buscarComFiltros(busca) {
    const boletinsResultado = await boletins.find(busca).populate("localOcorrencia")
    .populate("veiculoFurtado")
    .exec();  
    return boletinsResultado;
}

static async listarPorId(id) {
    const boletimResultado = await boletins.findById(id)
    .populate("localOcorrencia")
    .populate("veiculoFurtado")
    .exec();
    return boletimResultado;
}

static async cadastrarBoletim(boletimData, localOcorrenciaId, veiculoFurtadoId) {
    console.log(boletimData, localOcorrenciaId, veiculoFurtadoId);
    const boletim = new boletins({
        dataOcorrencia: boletimData.dataOcorrencia,
        periodoOcorrencia: boletimData.periodoOcorrencia,
        tipoCrime: boletimData.tipoCrime,
        descricaoCrime: boletimData.descricaoCrime,
        localOcorrencia: localOcorrenciaId, // Referência ao localOcorrencia
        veiculoFurtado: veiculoFurtadoId // Referência ao veiculoFurtado
      });
  
      // Salvar o boletim no banco de dados
      await boletim.save();
      return boletim;
}

static async atualizarBoletim(id, boletim) {
    return await boletins.findByIdAndUpdate(id, boletim, { new: true });
}
static async excluirBoletim(id) {
    return await boletins.findByIdAndDelete(id);
}

}
export default BoletimRepository;