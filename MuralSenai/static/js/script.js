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
