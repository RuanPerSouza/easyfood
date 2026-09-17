const restaurantService = require("./restaurant.service");

async function list(req, res) {
    try {
        res.json(await restaurantService.findAll());
    } catch (error) {
        console.error("Erro ao buscar restaurantes:", error);
        res.status(500).json({ error: "Erro ao buscar restaurantes" });
    }
}

async function getById(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ error: "ID de restaurante inválido" });
    }

    try {
        const restaurant = await restaurantService.findById(id);

        if (!restaurant) {
            return res.status(404).json({ error: "Restaurante não encontrado" });
        }

        res.json(restaurant);
    } catch (error) {
        console.error("Erro ao buscar restaurante:", error);
        res.status(500).json({ error: "Erro ao buscar restaurante" });
    }
}

async function create(req, res) {
    const { name, category_id: categoryId, rating = 0 } = req.body;

    if (!name || !categoryId) {
        return res.status(400).json({ error: "Nome e categoria são obrigatórios" });
    }

    if (!Number.isFinite(Number(rating)) || Number(rating) < 0 || Number(rating) > 5) {
        return res.status(400).json({ error: "A avaliação deve estar entre 0 e 5" });
    }

    try {
        if (!await restaurantService.categoryExists(categoryId)) {
            return res.status(400).json({ error: "Categoria não encontrada" });
        }

        const restaurant = await restaurantService.create({
            name,
            categoryId,
            rating: Number(rating)
        });

        res.status(201).json(restaurant);
    } catch (error) {
        console.error("Erro ao cadastrar restaurante:", error);
        res.status(500).json({ error: "Erro ao cadastrar restaurante" });
    }
}

module.exports = { list, getById, create };