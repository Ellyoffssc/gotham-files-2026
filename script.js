const app = document.querySelector('.app-shell');
const screens = document.querySelectorAll('[data-screen]');

function showScreen(stage) {
    app.dataset.stage = stage;
    screens.forEach((screen) => { screen.hidden = screen.dataset.screen !== String(stage); });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelector('#identity-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const identity = document.querySelector('#identity-input').value.trim();
    const feedback = document.querySelector('#identity-feedback');
    if (identity.toLowerCase() === 'batman') {
        feedback.textContent = '> Identity confirmed. Welcome back, Batman.';
        feedback.className = 'feedback success';
        setTimeout(() => showScreen(2), 900);
    } else {
        feedback.textContent = '> Incorrect identity. Hint: you should already know who it is...';
        feedback.className = 'feedback error';
    }
});

const fileMessages = {
    '001': 'Começando a desconfiar de que estou saindo com o Batman... ',
    '002': 'O Batman tem cachorro?... Bom, eu tenho gatas.',
    '003': 'Eu sei que ele é o Batman, mas não posso contar pra ninguém. Afinal, tenho a minha identidade secreta também 🤫',
    '004': 'Olha esses músculos!! Não é o homem mais gato do mundo? 😍',
    '005': 'É canônico, o que é Catwoman sem seu Batman ❤️ ',
    '006': '😻​❤️​'
};
const fileImages = {
    '001': 'IMG_1398%20(a%C3%A7a%C3%AD).jpg',
    '002': 'ele%20e%20tobby.jpg',
    '003': 'IMG_4462%20(lendo%20o%20card%C3%A1pio).jpg',
    '004': 'ele%20de%20costas%20(piscina).jpg',
    '005': 'IMG_3387%20(piscina).jpg',
    '006': 'IMG_3376%20(kiss).jpg'
};
const openedFiles = new Set();
const fileModal = document.querySelector('#file-modal');
document.querySelector('#file-grid').addEventListener('click', (event) => {
    const file = event.target.closest('[data-file]');
    if (!file) return;
    openedFiles.add(file.dataset.file);
    file.classList.add('opened');
    document.querySelector('#file-modal-label').textContent = `FILE_${file.dataset.file}`;
    const fileImage = document.querySelector('#file-modal-image');
    fileImage.src = fileImages[file.dataset.file] || '';
    fileImage.hidden = !fileImages[file.dataset.file];
    fileImage.alt = fileImages[file.dataset.file] ? `Memória visual do FILE_${file.dataset.file}` : '';
    document.querySelector('#file-modal-text').textContent = fileMessages[file.dataset.file];
    fileModal.hidden = false;
    fileModal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.querySelector('.next-stage').disabled = openedFiles.size < 6;
});
document.querySelector('#close-file').addEventListener('click', () => { fileModal.hidden = true; });
document.querySelector('.next-stage').addEventListener('click', () => showScreen(3));

document.querySelector('#final-code').addEventListener('input', (event) => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
    event.target.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
});

document.querySelector('#code-entry').addEventListener('submit', (event) => {
    event.preventDefault();
    const code = document.querySelector('#final-code').value.trim();
    const feedback = document.querySelector('#code-feedback');
    if (code === '12/06' || code === '1206') {
        feedback.textContent = '> Código aceito. Mensagem recebida.';
        feedback.className = 'feedback success';
        setTimeout(() => startLetter(), 700);
    } else {
        feedback.textContent = '> Código recusado. A resposta estava nas pistas.';
        feedback.className = 'feedback error';
    }
});

const letter = 'Amorrr,\n\n Feliz aniversário, meu herói!! Eu quis manter como tradição a ideia de personalizar uma página html especialmente para você, mas quis dar um upgrade para tornar mais daora ainda, hehe.\n\n Eu te amo muito muito muito!!! Você é o amor da minha vida todinha, eu sou muito grata por dividir a vida com você, e fico muito feliz de poder comemorar a sua vida. \n\n Com amor, sua gatinha ❤️'; ;
function startLetter() {
    showScreen(4);
    const text = document.querySelector('#letter-text');
    const signature = document.querySelector('#letter-signature');
    const openFinal = document.querySelector('#open-final');
    let index = 0;
    text.textContent = '';
    signature.hidden = true;
    openFinal.hidden = true;
    const typing = setInterval(() => {
        text.textContent += letter[index];
        index += 1;
        if (index >= letter.length) {
            clearInterval(typing);
            signature.hidden = false;
            openFinal.hidden = false;
        }
    }, 24);
}
document.querySelector('#open-final').addEventListener('click', () => showScreen(5));
document.querySelector('#restart').addEventListener('click', () => window.location.reload());