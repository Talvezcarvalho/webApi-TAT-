import express from "express";
import VeiculoController from "../controllers/veiculosController.js";
const router = express.Router();

router
  .get("/veiculos", VeiculoController.listarVeiculos)
  .get("/veiculos/busca", VeiculoController.buscarVeiculo)

export default router;      