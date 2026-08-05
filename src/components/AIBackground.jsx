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
    let connections = [];
    let particles = [];
    let lastTime = performance.now();

    // Tech labels representing AI engineering domain (sparse)
    const techLabels = ['LLM', 'RAG', 'Agent', 'Vector', 'Embed', 'Py', 'Azure', 'KG', 'API'];

    const getColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || !document.documentElement.hasAttribute('data-theme');
      if (isDark) {
        return {
          node: '#475569',
          nodeCore: '#64748b',
          line: '#334155',
          glow: '#22d3ee',
          particle: '#64748b',
          label: '#94a3b8'
        };
      } else {
        return {
          node: '#94a3b8',
          nodeCore: '#64748b',
          line: '#cbd5e1',
          glow: '#0ea5e9',
          particle: '#64748b',
          label: '#475569'
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

    function createNode(i) {
      const isCore = Math.random() < 0.35;
      const hasLabel = isCore && Math.random() < 0.55;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isCore ? 0.018 : 0.035),
        vy: (Math.random() - 0.5) * (isCore ? 0.018 : 0.035),
        r: isCore ? 2.8 + Math.random() * 1.6 : 1.1 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0008 + Math.random() * 0.0014,
        isCore,
        label: hasLabel ? techLabels[i % techLabels.length] : null,
        id: i
      };
    }

    function createParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: 0.7 + Math.random() * 1.1,
        life: 80 + Math.random() * 60,
        maxLife: 80 + Math.random() * 60
      };
    }

    function init() {
      nodes = [];
      particles = [];
      // Sparse elegant graph — clean background look (reference style)
      const nodeCount = Math.min(38, Math.max(22, Math.floor((width * height) / 38000)));
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(createNode(i));
      }
      // Few flowing particles
      for (let i = 0; i < 14; i++) {
        particles.push(createParticle());
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      colors = getColors();

      // === Graph connections (code graph / knowledge graph style) ===
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 0.7;
      ctx.globalAlpha = 0.045;

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy);
          
          if (dist < 135 && dist > 12) {
            const alpha = (1 - dist / 135) * 0.065;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // === Nodes: clean graph nodes ===
      nodes.forEach(n => {
        const pulse = Math.sin(n.phase) * 0.25 + 0.75;
        const r = n.r * pulse;

        // Soft outer glow (subtle)
        ctx.globalAlpha = n.isCore ? 0.08 : 0.035;
        ctx.fillStyle = colors.glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3.6, 0, Math.PI * 2);
        ctx.fill();

        // Main node
        ctx.globalAlpha = n.isCore ? 0.28 : 0.16;
        ctx.fillStyle = n.isCore ? colors.nodeCore : colors.node;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Inner highlight
        ctx.globalAlpha = 0.15;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(n.x - r * 0.35, n.y - r * 0.35, r * 0.35, 0, Math.PI * 2);
        ctx.fill();

        // Very faint label on some core nodes (graph nodes style)
        if (n.label) {
          ctx.globalAlpha = 0.09;
          ctx.fillStyle = colors.label;
          ctx.font = '9.5px Inter, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, n.x, n.y + r + 13);
        }
      });

      // === Particles: faint data flow (like edges in graph) ===
      particles.forEach(p => {
        const alpha = (p.life / p.maxLife) * 0.26;
        ctx.globalAlpha = Math.max(0.02, alpha);
        ctx.fillStyle = colors.particle;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // trailing effect
        if (p.life > p.maxLife * 0.5) {
          ctx.globalAlpha = alpha * 0.45;
          ctx.beginPath();
          ctx.arc(p.x - p.vx * 2.8, p.y - p.vy * 2.8, p.size * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
    }

    function update(delta) {
      const dt = Math.min(delta / 15, 1.1);

      nodes.forEach(n => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.phase += n.speed * dt;

        const pad = 55;
        if (n.x < pad) { n.x = pad; n.vx = Math.abs(n.vx) * 0.72; }
        if (n.x > width - pad) { n.x = width - pad; n.vx = -Math.abs(n.vx) * 0.72; }
        if (n.y < pad) { n.y = pad; n.vy = Math.abs(n.vy) * 0.72; }
        if (n.y > height - pad) { n.y = height - pad; n.vy = -Math.abs(n.vy) * 0.72; }
      });

      particles.forEach(p => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 0.9;

        if (p.life <= 0) {
          const src = nodes[Math.floor(Math.random() * nodes.length)];
          if (src) {
            p.x = src.x + (Math.random() - 0.5) * 32;
            p.y = src.y + (Math.random() - 0.5) * 32;
          } else {
            p.x = Math.random() * width;
            p.y = Math.random() * height;
          }
          p.life = p.maxLife;
          p.vx = (Math.random() - 0.5) * 0.32;
          p.vy = (Math.random() - 0.5) * 0.32;
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
    const rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      themeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} id="ai-bg-canvas" aria-hidden="true" />;
};

export default AIBackground;
