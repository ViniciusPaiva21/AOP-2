document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('runesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;

  const runes = [];
  const runeChars = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚺ','ᚾ','ᛁ','ᛇ','ᛈ','ᛉ','ᛋ'];
  const rand = (min, max) => Math.random() * (max - min) + min;

  function createRunes() {
    runes.length = 0;
    const runeCount = (W * H) / 15000;
    for (let i = 0; i < runeCount; i++) {
      runes.push({
        x: rand(0, W),
        y: rand(-H, 0),
        vy: rand(1.2, 3.5),
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
 
