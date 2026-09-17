const categoryService = require("./category.service");

async function list(req, res) {
    try {
        res.json(await categoryService.findAll());
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        res.status(500).json({ error: "Erro ao buscar categorias" });
    }
}

module.exports = { list };
