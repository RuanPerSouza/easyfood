const API_BASE_URL = window.location.protocol === "file:"
    ? "http://localhost:3000"
    : "";
const API_URL = `${API_BASE_URL}/restaurants`;
const CATEGORIES_URL = `${API_BASE_URL}/categories`;

let restaurantes = [];
let categoriaSelecionada = "Todos";


// ==========================================
// CARREGAR RESTAURANTES
// ==========================================

async function carregarRestaurantes() {

    try {

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro na API de restaurantes");
        }

        restaurantes = await resposta.json();

        console.log("Restaurantes carregados:", restaurantes);

        mostrarRestaurantes();

    } catch (erro) {

        console.error("Erro ao carregar restaurantes:", erro);

        document.getElementById("restaurant-list").innerHTML = `
            <p>Erro ao carregar restaurantes.</p>
        `;
    }
}


// ==========================================
// CARREGAR CATEGORIAS
// ==========================================

async function carregarCategorias() {

    try {

        const resposta = await fetch(CATEGORIES_URL);

        if (!resposta.ok) {
            throw new Error("Erro na API de categorias");
        }

        const categorias = await resposta.json();

        console.log("Categorias carregadas:", categorias);

        const select = document.getElementById("category");

        select.innerHTML = `
            <option value="">Selecione uma categoria</option>
        `;

        categorias.forEach(categoria => {

            const option = document.createElement("option");

            option.value = categoria.id;
            option.textContent = categoria.name;

            select.appendChild(option);
        });

    } catch (erro) {

        console.error("Erro ao carregar categorias:", erro);

        document.getElementById("category").innerHTML = `
            <option value="">Erro ao carregar categorias</option>
        `;
    }
}


// ==========================================
// MOSTRAR RESTAURANTES
// ==========================================

function mostrarRestaurantes() {

    const lista = document.getElementById("restaurant-list");

    const busca = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtrados = restaurantes.filter(restaurante => {

        const nomeCorresponde =
            restaurante.name.toLowerCase().includes(busca);

        const categoriaCorresponde =
            categoriaSelecionada === "Todos" ||
            restaurante.category === categoriaSelecionada;

        return nomeCorresponde && categoriaCorresponde;
    });


    lista.innerHTML = "";


    if (filtrados.length === 0) {

        lista.innerHTML = `
            <p>Nenhum restaurante encontrado.</p>
        `;

        return;
    }


    filtrados.forEach(restaurante => {

        const card = document.createElement("div");

        card.classList.add("restaurant-card");

        card.innerHTML = `
            <h3>${restaurante.name}</h3>

            <p>
                Categoria: ${restaurante.category}
            </p>

            <p>
                ⭐ ${restaurante.rating}
            </p>
        `;

        lista.appendChild(card);
    });
}


// ==========================================
// SELECIONAR CATEGORIA
// ==========================================

function selecionarCategoria(categoria) {

    categoriaSelecionada = categoria;

    document
        .querySelectorAll(".category-button")
        .forEach(botao => {
            botao.classList.remove("active");
        });


    document
        .querySelectorAll(".category-button")
        .forEach(botao => {

            if (botao.textContent.includes(categoria)) {
                botao.classList.add("active");
            }

        });


    mostrarRestaurantes();
}


// ==========================================
// PESQUISA
// ==========================================

document
    .getElementById("search")
    .addEventListener("input", mostrarRestaurantes);


// ==========================================
// CADASTRAR RESTAURANTE
// ==========================================

document
    .getElementById("restaurant-form")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const nome = document
            .getElementById("name")
            .value;

        const categoria = document
            .getElementById("category")
            .value;

        const avaliacao = document
            .getElementById("rating")
            .value;


        if (!nome || !categoria) {

            alert("Preencha o nome e a categoria.");

            return;
        }


        try {

            const resposta = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: nome,
                    category_id: Number(categoria),
                    rating: avaliacao
                        ? Number(avaliacao)
                        : 0
                })
            });


            const dados = await resposta.json();


            if (!resposta.ok) {

                alert(dados.error || "Erro ao cadastrar restaurante");

                return;
            }


            alert("Restaurante cadastrado com sucesso!");


            document
                .getElementById("restaurant-form")
                .reset();


            await carregarRestaurantes();

        } catch (erro) {

            console.error("Erro:", erro);

            alert("Não foi possível conectar ao servidor.");
        }

    });


// ==========================================
// INICIAR SISTEMA
// ==========================================

console.log("EasyFood JavaScript iniciado!");

carregarRestaurantes();
carregarCategorias();