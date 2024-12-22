import express from "express";
import Boletins from "./boletinsRoutes.js"
import Veiculos from "./veiculosRoutes.js"

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Api online"});
    });
    
    //define as rotas
    app.use(
        express.json(),
        Boletins,
        Veiculos,
    )

}
export default routes;