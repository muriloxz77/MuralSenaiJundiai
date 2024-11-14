const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    // Atualiza o ícone com base no tema
    const icon = themeToggleBtn.querySelector('.material-symbols-outlined');
    if (body.classList.contains('dark-theme')) {
        icon.textContent = 'brightness_5'; // Ícone de "sol" para tema claro
    } else {
        icon.textContent = 'contrast'; // Ícone de "lua" para tema escuro
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "/api/aviso/";
    const noticeMessage = document.querySelector(".notice-message");

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            noticeMessage.textContent = data.mensagem || "Nenhuma mensagem disponível";
        })
        .catch(error => {
            console.error("Erro ao carregar o aviso:", error);
            noticeMessage.textContent = "Erro ao carregar a mensagem";
        });
});




// static/meu_app/script.js

// Seleciona os elementos
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const form = modal.querySelector("form");
const noticeMessageContainer = document.querySelector(".notice-message");

// Abre a modal ao clicar no botão "Criar Aviso"
openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

// Fecha a modal ao clicar no "X"
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fecha a modal ao clicar fora do conteúdo da modal
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Envia o aviso via AJAX ao backend ao submeter o formulário
form.addEventListener("submit", (event) => {
    event.preventDefault();  // Evita o envio padrão do formulário

    const formData = new FormData(form);  // Obtém os dados do formulário

    // Envia os dados para a URL de criação de aviso
    fetch("/criar-aviso/", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "sucesso") {
            // Atualiza a mensagem de aviso na página com o novo aviso
            noticeMessageContainer.textContent = data.mensagem;

            // Limpa o formulário e fecha a modal
            form.reset();
            modal.style.display = "none";
        } else {
            alert("Erro ao criar aviso: " + data.mensagem);
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao enviar o aviso.");
    });
});

