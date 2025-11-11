// Arquivo: runes.js
// VERSÃO FINAL: Corrigida, limpa e com runas VERMELHAS.

// Espera o HTML carregar antes de rodar o script
document.addEventListener('DOMContentLoaded', (event) => {

    // 1. A "Tela" (Verifica se o HTML tem o <canvas>)
    const canvas = document.getElementById('runesCanvas');
    if (!canvas) {
        console.error('ERRO: Canvas "runesCanvas" não encontrado! Verifique seu HTML.');
        return; 
    }

    // 2. O "Pincel"
    const ctx = canvas.getContext('2d');
    let W = canvas.width = innerWidth;
    let H = canvas.height = innerHeight;

    const runes = [];
    const runeChars = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚺ','ᚾ','ᛁ','ᛇ','ᛈ','ᛉ','ᛋ'];

    // Função de número aleatório
    function rand(min, max){ return Math.random() * (max - min) + min }

    // Função para criar as runas
    function createRunes() {
        runes.length = 0; // Limpa o array
        let runeCount = (W * H) / 30000; // Densidade
        
        for (let i = 0; i < runeCount; i++) {
            runes.push({
                x: rand(0, W),
                y: rand(-H, 0), // Começa acima da tela
                vy: rand(0.5, 1.5), // Velocidade positiva (cai)
                size: rand(12, 28),
                char: runeChars[Math.floor(rand(0, runeChars.length))],
                alpha: rand(0.1, 0.3) 
            });
        }
    }

    // 3. A "Animação" (O Loop de desenho)
    function draw() {
        ctx.clearRect(0, 0, W, H); // Limpa a tela
        runes.forEach(r => {
            r.y += r.vy; // Move a runa para baixo
            
            // Se a runa saiu da tela, reseta ela no topo
            if (r.y > H + 40) {
                r.y = -40;
                r.x = rand(0, W); 
            }
            
            ctx.globalAlpha = r.alpha;
            ctx.font = `${r.size}px serif`;
            
            // <<< A COR VERMELHA QUE VOCÊ PEDIU! >>>
            // (Baseado no seu --accent-color: #B71C1C)
            ctx.fillStyle = 'rgba(183, 28, 28, 0.7)'; 
            
            // (Bônus: Adiciona um brilho vermelho)
            ctx.shadowColor = 'rgba(255, 0, 0, 0.9)';
            ctx.shadowBlur = 10;
            
            // Pinta a runa (SÓ UMA VEZ!)
            ctx.fillText(r.char, r.x, r.y);
        });
        
        // Zera o brilho para o próximo loop
        ctx.shadowBlur = 0; 
        requestAnimationFrame(draw);
    }

    // 4. O "Ajustador" (Se a janela mudar de tamanho)
    window.addEventListener('resize', () => {
        W = canvas.width = innerWidth;
        H = canvas.height = innerHeight;
        createRunes(); // Recria as runas para o novo tamanho
    });

    // 5. O "Play"
    createRunes();
    draw();
});