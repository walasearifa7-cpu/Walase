// Função para extrair texto da imagem com Tesseract.js
async function extrairTexto(file) {
    if (!file) return [];
    const { data: { text } } = await Tesseract.recognize(file, 'por', {
        logger: m => console.log(m) // mostra progresso no console
    });
    return text
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0);
}

// Comparar listas de itens
function compararListas(lista1, lista2) {
    const novos = lista2.filter(item => !lista1.includes(item));
    const faltando = lista1.filter(item => !lista2.includes(item));
    const iguais = lista1.filter(item => lista2.includes(item));

    return { novos, faltando, iguais };
}

// Evento de clique no botão
document.getElementById('comparar').addEventListener('click', async () => {
    const img1 = document.getElementById('imagem1').files[0];
    const img2 = document.getElementById('imagem2').files[0];
    const resultadoDiv = document.getElementById('resultado');

    if (!img1 || !img2) {
        alert("Por favor, selecione as duas imagens para comparar.");
        return;
    }

    resultadoDiv.innerHTML = "<p class='loading'>⏳ Processando imagens... Aguarde.</p>";

    try {
        // Extrai texto das imagens
        const texto1 = await extrairTexto(img1);
        const texto2 = await extrairTexto(img2);

        // Faz comparação
        const { novos, faltando, iguais } = compararListas(texto1, texto2);

        // Exibe resultados
        resultadoDiv.innerHTML = `
            <h3>Resultado da Comparação</h3>
            <p class="novo"><strong>Novos:</strong> ${novos.join(', ') || "Nenhum"}</p>
