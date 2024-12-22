import express from "express";
import BoletimController from "../controllers/boletimController.js";
const router = express.Router();

router
  .get("/boletins", BoletimController.listarBoletins)
  .get("/boletins/busca", BoletimController.buscarBoletim)
  .get("/boletins/:id", BoletimController.listarBoletimPorId)
  .post("/boletins", BoletimController.cadastrarBoletim)
  .put("/boletins/:id", BoletimController.atualizarBoletim)
  .delete("/boletins/:id", BoletimController.excluirBoletim)

export default router;      