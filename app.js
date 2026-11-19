import "dotenv/config";
import express from "express";
import cors from "cors";
import conexao from "./db.js";

import { tratarErro } from "./src/middlewares/tratarErro.js";
import categoriasRoutes from "./src/routes/categoriasRoutes.js";

const app = express();
const PORTA = Number(process.env.PORTA || 3000);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ mensagem: "API EcoFashion funcionando" });
});

app.use("/categorias", categoriasRoutes);

app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});
app.use(tratarErro);

conexao.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar ao banco:", erro.code || erro.message);
        process.exit(1);
    }
    console.log("Conectado ao banco de dados EcoFashion");
    app.listen(PORTA, () => {
        console.log(`Servidor iniciado em http://localhost:${PORTA}`);
    });
});