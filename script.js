const API_KEY = "SUA_CHAVE_DA_OPENAI_AQUI"; // Coloque sua chave aqui

// Lista de livros da TBR dela (adicione quantos quiser!)
const tbrList = [
    "Corte de Espinhos e Rosas",
    "A Hipótese do Amor",
    "Os Sete Maridos de Evelyn Hugo",
    "O Colecionador",
    "Orgulho e Preconceito",
    "É Assim que Acaba"
];

async function getRecommendation() {
    const mood = document.getElementById('moodInput').value;
    const btn = document.getElementById('btnSuggest');
    const loader = document.getElementById('loader');
    const resultDiv = document.getElementById('result');

    if (!mood) return alert("Me conta como você está se sentindo primeiro!");

    btn.disabled = true;
    loader.classList.remove('hidden');
    resultDiv.classList.add('hidden');

    const prompt = `Minha namorada quer ler algo baseado no humor: "${mood}". 
    Dessa lista de livros que ela tem (TBR): ${tbrList.join(", ")}, escolha o melhor.
    Escreva uma cartinha curta e romântica explicando por que esse livro combina com o que ela sente agora.
    Responda em formato JSON: {"livro": "Título", "mensagem": "Texto da carta"}`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        const content = JSON.parse(data.choices[0].message.content);

        document.getElementById('bookTitle').innerText = "📖 " + content.livro;
        document.getElementById('recommendationLetter').innerText = content.mensagem;
        
        resultDiv.classList.remove('hidden');
    } catch (error) {
        alert("Erro ao consultar o oráculo dos livros. Verifique a chave da API.");
    } finally {
        btn.disabled = false;
        loader.classList.add('hidden');
    }
}
