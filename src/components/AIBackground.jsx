import React, { useRef, useEffect } from 'react';

const AIBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let nodes = [];
    let particles = [];
    let lastTime = performance.now();

    const getColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        return {
          dot: '#64748b',
          line: '#475569',
          glow: '#38bdf8',
          particle: '#94a3b8'
        };
      } else {
        return {
          dot: '#64748b',
          line: '#94a3b8',
          glow: '#0ea5e9',
          particle: '#64748b'
        };
      }
    };

    let colors = getColors();

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createNode() {
      const isCore = Math.random() < 0.28;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isCore ? 0.022 : 0.045),
        vy: (Math.random() - 0.5) * (isCore ? 0.022 : 0.045),
        baseR: isCore ? (Math.random() * 3.1 + 1.55) : (Math.random() * 1.8 + 0.75),
        phase: Math.random() * Math.PI * 2,
        speed: 0.0016 + Math.random() * 0.0028,
        isCore,
        cluster: Math.floor(Math.random() * 3)
      };
    }

    function createParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        size: Math.random() * 1.35 + 0.55,
        life: 155 + Math.random() * 80,
        maxLife: 155 + Math.random() * 80
      };
    }

    function init() {
      nodes = [];
      particles = [];
      // Good elegant density - visible as background
      const count = Math.min(42, Math.floor((width * height) / 26000));
      for (let i = 0; i < count; i++) nodes.push(createNode());
      for (let i = 0; i < 15; i++) particles.push(createParticle());
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      colors = getColors();

      // Soft elegant connections (knowledge graph / multi-agent / neural)
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 0.7;
      ctx.globalAlpha = 0.055;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 118) {
            ctx.globalAlpha = (1 - dist / 118) * 0.075;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Beautiful nodes with soft glow + breathing pulse
      nodes.forEach(n => {
        const pulse = Math.sin(n.phase) * 0.32 + 0.68;
        const r = n.baseR * pulse;

        // Soft glow
        ctx.globalAlpha = n.isCore ? 0.14 : 0.07;
        ctx.fillStyle = colors.glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 2.7, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.globalAlpha = n.isCore ? 0.32 : 0.20;
        ctx.fillStyle = colors.dot;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Flowing particles — visible but tasteful (data / embeddings / RAG)
      particles.forEach(p => {
        const alpha = (p.life / p.maxLife) * 0.30;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = colors.particle;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    }

    function update(delta) {
      const dt = Math.min(delta / 16, 1.15);

      nodes.forEach(n => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.phase += n.speed * dt;

        const pad = 62;
        if (n.x < pad) { n.x = pad; n.vx = Math.abs(n.vx) * 0.78; }
        if (n.x > width - pad) { n.x = width - pad; n.vx = -Math.abs(n.vx) * 0.78; }
        if (n.y < pad) { n.y = pad; n.vy = Math.abs(n.vy) * 0.78; }
        if (n.y > height - pad) { n.y = height - pad; n.vy = -Math.abs(n.vy) * 0.78; }
      });

      particles.forEach(p => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 0.88;

        if (p.life <= 0) {
          const src = nodes[Math.floor(Math.random() * nodes.length)];
          if (src) {
            p.x = src.x + (Math.random() - 0.5) * 45;
            p.y = src.y + (Math.random() - 0.5) * 45;
          }
          p.life = p.maxLife;
        }
      });
    }

    function loop(ts = performance.now()) {
      const delta = ts - lastTime;
      lastTime = ts;
      update(delta);
      draw();
      requestAnimationFrame(loop);
    }

    const resizeHandler = () => { resize(); init(); };

    const themeObserver = new MutationObserver(() => { colors = getColors(); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    resize();
    init();
    draw();

    window.addEventListener('resize', resizeHandler);
    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} id="ai-bg-canvas" aria-hidden="true" />;
};

export default AIBackground;
