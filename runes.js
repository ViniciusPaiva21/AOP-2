<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('runesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;

  const runes = [];
  const runeChars = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚺ','ᚾ','ᛁ','ᛇ','ᛈ','ᛉ','ᛋ'];
  const rand = (min, max) => Math.random() * (max - min) + min;

  // Mais runas na tela
  function createRunes() {
    runes.length = 0;
    const runeCount = (W * H) / 15000; // dobra a densidade
    for (let i = 0; i < runeCount; i++) {
      runes.push({
        x: rand(0, W),
        y: rand(-H, 0),
        // AQUI está a velocidade (antes era até 1.3)
        vy: rand(1.2, 3.5), // mais rápido
        size: rand(16, 36),
        char: runeChars[Math.floor(rand(0, runeChars.length))],
        alpha: rand(0.3, 0.6),
        glowOffset: rand(0, Math.PI * 2)
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const time = Date.now() / 300;

    runes.forEach(r => {
      r.y += r.vy;
      if (r.y > H + 40) {
        r.y = -40;
        r.x = rand(0, W);
      }

      const pulse = 0.5 + Math.sin(time + r.glowOffset) * 0.5;
      const alpha = r.alpha * (0.7 + pulse * 0.5);

      ctx.globalAlpha = alpha;
      ctx.font = `${r.size}px 'Segoe UI Symbol', serif`;

      // vermelho vibrante e brilho forte
      ctx.fillStyle = `rgba(255, 30, 30, 1)`; 
      ctx.shadowColor = `rgba(255, 0, 0, ${0.9 + pulse * 0.3})`;
      ctx.shadowBlur = 35 + pulse * 30;
      ctx.fillText(r.char, r.x, r.y);
    });

    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    createRunes();
  });

  createRunes();
  draw();
});
 
=======
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
>>>>>>> 0e708079977badb70e70d3a5c6208af489593538
