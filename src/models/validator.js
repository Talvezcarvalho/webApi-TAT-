import mongoose from "mongoose";

// Implementar validação de campos obrigatórios para personalizar mensagens de erros
mongoose.Schema.Types.String.set("validate", {
    validator: (valor) => valor.trim !== "",
    message:  () =>"O campo {PATH} não pode ser vazio"
})