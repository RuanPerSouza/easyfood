const path = require("path");
const express = require("express");
const cors = require("cors");
const restaurantRoutes = require("./modules/restaurants/restaurant.routes");
const categoryRoutes = require("./modules/categories/category.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api", (req, res) => {
    res.json({ message: "EasyFood API funcionando!" });
});

app.get("/test-db", async (req, res) => {
    const pool = require("./database/connection");

    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            message: "PostgreSQL conectado!",
            horario: result.rows[0].now
        });
    } catch (error) {
        console.error("Erro ao testar conexão com o banco:", error);
        res.status(500).json({ error: "Erro ao conectar ao PostgreSQL" });
    }
});

app.use("/restaurants", restaurantRoutes);
app.use("/categories", categoryRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;