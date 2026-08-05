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
      return isDark 
        ? { primary: '#38bdf8', line: '#475569', particle: '#64748b' }
        : { primary: '#0ea5e9', line: '#cbd5e1', particle: '#94a3b8' };
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
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.8 + 1.1,
        phase: Math.random() * Math.PI * 2
      };
    }

    function createParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.1 + 0.5,
        life: 160 + Math.random() * 100,
        maxLife: 160 + Math.random() * 100
      };
    }

    function init() {
      nodes = [];
      particles = [];
      const nodeCount = Math.min(48, Math.floor((width * height) / 22000));
      for (let i = 0; i < nodeCount; i++) nodes.push(createNode());
      for (let i = 0; i < 14; i++) particles.push(createParticle());
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      colors = getColors();

      // Extremely subtle connections
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.06;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.globalAlpha = (1 - dist / 130) * 0.07;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes - very delicate
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = colors.primary;
      nodes.forEach(n => {
        const s = Math.sin(n.phase) * 0.35 + 0.65;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * s, 0, Math.PI * 2);
        ctx.fill();
      });

      // Floating particles (very faint)
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = colors.particle;
      particles.forEach(p => {
        ctx.globalAlpha = (p.life / p.maxLife) * 0.18;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    }

    function update(delta) {
      const dt = Math.min(delta / 16, 1.8);

      nodes.forEach(n => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.phase += 0.015 * dt;

        if (n.x < 25 || n.x > width - 25) n.vx *= -1;
        if (n.y < 25 || n.y > height - 25) n.vy *= -1;
      });

      particles.forEach(p => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 0.95;

        if (p.life <= 0) {
          const src = nodes[Math.floor(Math.random() * nodes.length)];
          if (src) {
            p.x = src.x + (Math.random() - 0.5) * 55;
            p.y = src.y + (Math.random() - 0.5) * 55;
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

    const resizeHandler = () => {
      resize();
      init();
    };

    const themeObserver = new MutationObserver(() => {
      colors = getColors();
    });
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

  return (
    <canvas 
      ref={canvasRef} 
      id="ai-bg-canvas" 
      aria-hidden="true" 
    />
  );
};

export default AIBackground;
