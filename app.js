// 1. Identifica o jogo gravado na Tag NFC (ex: ?jogo=topgear)
const urlParams = new URLSearchParams(window.location.search);
const jogoAtual = urlParams.get('jogo');

const titleEl = document.getElementById('game-title');
const mainMenuEl = document.getElementById('main-menu');
const multiMenuEl = document.getElementById('multiplayer-menu');
const statusEl = document.getElementById('status-message');

// Verifica se a tag NFC é válida
if (jogoAtual) {
    titleEl.innerText = jogoAtual.toUpperCase();
} else {
    titleEl.innerText = "ERRO DE LEITURA NFC";
    mainMenuEl.style.display = 'none';
    statusEl.innerText = "Por favor, aproxime o celular do cartucho novamente.";
}

// 2. Navegação entre os menus
document.getElementById('btn-multi-menu').addEventListener('click', () => {
    mainMenuEl.style.display = 'none';
    multiMenuEl.style.display = 'block';
});

document.getElementById('btn-back').addEventListener('click', () => {
    multiMenuEl.style.display = 'none';
    mainMenuEl.style.display = 'block';
});

// 3. Ações dos Botões
document.getElementById('btn-solo').addEventListener('click', () => {
    statusEl.innerText = "Iniciando jogo offline...";
    setTimeout(() => { window.location.href = `game.html?jogo=${jogoAtual}`; }, 300);
});

document.getElementById('btn-create').addEventListener('click', () => {
    // Gera uma senha de 5 letras para a sala
    const roomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    statusEl.innerText = `Gerando sala secreta...`;
    setTimeout(() => { window.location.href = `game.html?jogo=${jogoAtual}&room=${roomCode}&isHost=true`; }, 500);
});

document.getElementById('btn-join').addEventListener('click', () => {
    const roomCode = document.getElementById('room-code').value.trim().toUpperCase();
    if (roomCode.length < 5) {
        statusEl.innerText = "Código inválido!";
        return;
    }
    statusEl.innerText = `Buscando sala...`;
    setTimeout(() => { window.location.href = `game.html?jogo=${jogoAtual}&room=${roomCode}&isHost=false`; }, 500);
});