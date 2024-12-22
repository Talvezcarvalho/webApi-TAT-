import ErroBase from "./ErroBase.js";

class RequicaoIncorreta extends ErroBase {
  constructor(mensagem = "Um ou mais campos estão inválidos") {
    super(mensagem, 400);
  }
  
}

export default RequicaoIncorreta;