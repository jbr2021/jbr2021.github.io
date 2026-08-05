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

    // Subtle tech keywords for a few core nodes (visible only very faintly)
    const techLabels = ['LLM', 'RAG', 'Agent', 'Vector', 'Embed', 'Py', 'Azure', 'KG'];

    const getColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        return {
          dot: '#64748b',
          line: '#475569',
          glow: '#38bdf8',
          particle: '#94a3b8',
          label: '#94a3b8'
        };
      } else {
        return {
          dot: '#475569',
          line: '#cbd5e1',
          glow: '#0ea5e9',
          particle: '#64748b',
          label: '#475569'
        };
      }
    };

    let colors = getColors();
    let globalPhase = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createNode(index) {
      const isCore = Math.random() < 0.32;
      const hasLabel = isCore && Math.random() < 0.65;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isCore ? 0.012 : 0.026),
        vy: (Math.random() - 0.5) * (isCore ? 0.012 : 0.026),
        baseR: isCore ? (Math.random() * 2.4 + 1.6) : (Math.random() * 1.35 + 0.65),
        phase: Math.random() * Math.PI * 2,
        speed: 0.0009 + Math.random() * 0.0016,
        isCore,
        label: hasLabel ? techLabels[index % techLabels.length] : null,
        cluster: Math.floor(Math.random() * 4)
      };
    }

    function createParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        size: Math.random() * 0.9 + 0.35,
        life: 120 + Math.random() * 65,
        maxLife: 120 + Math.random() * 65
      };
    }

    function init() {
      nodes = [];
      particles = [];
      // Elegant sparse background: visible but non-overwhelming
      const count = Math.min(29, Math.max(18, Math.floor((width * height) / 47000)));
      for (let i = 0; i < count; i++) nodes.push(createNode(i));
      // Subtle particles representing data/embedding flows
      for (let i = 0; i < 11; i++) particles.push(createParticle());
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      colors = getColors();
      globalPhase += 0.003;

      // === Soft connections (knowledge graph / multi-agent / neural links) ===
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 0.65;
      ctx.globalAlpha = 0.032;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 98 && dist > 6) {
            const alpha = (1 - dist / 98) * 0.052;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // === Elegant nodes: soft glow + breathing pulse ===
      nodes.forEach((n) => {
        const pulse = Math.sin(n.phase) * 0.28 + 0.72 + Math.sin(globalPhase * 0.6 + n.cluster) * 0.04;
        const r = n.baseR * pulse;

        // Soft glow ring (AI node representation)
        ctx.globalAlpha = n.isCore ? 0.065 : 0.028;
        ctx.fillStyle = colors.glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3.35, 0, Math.PI * 2);
        ctx.fill();

        // Core node dot
        ctx.globalAlpha = n.isCore ? 0.21 : 0.105;
        ctx.fillStyle = colors.dot;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Tiny bright core highlight
        ctx.globalAlpha = 0.13;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(n.x - r * 0.28, n.y - r * 0.28, Math.max(0.6, r * 0.28), 0, Math.PI * 2);
        ctx.fill();

        // Very subtle tech label (LLM / RAG / Agent / Vector / Azure / etc.)
        if (n.label) {
          ctx.globalAlpha = 0.07;
          ctx.fillStyle = colors.label;
          ctx.font = '10px Inter, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, n.x, n.y + n.baseR + 12.5);
        }
      });

      // === Faint flowing particles (data flows, embeddings, token streams) ===
      particles.forEach(p => {
        const alpha = (p.life / p.maxLife) * 0.22;
        ctx.globalAlpha = Math.max(0.018, alpha);
        ctx.fillStyle = colors.particle;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // soft trailing dot for motion
        if (p.life > p.maxLife * 0.55) {
          ctx.globalAlpha = alpha * 0.42;
          ctx.beginPath();
          ctx.arc(p.x - p.vx * 3.2, p.y - p.vy * 3.2, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;
    }

    function update(delta) {
      const dt = Math.min(delta / 15.5, 1.05);

      nodes.forEach(n => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.phase += n.speed * dt;

        // Soft boundary bounce with padding
        const pad = 48;
        if (n.x < pad) { n.x = pad; n.vx = Math.abs(n.vx) * 0.65; }
        if (n.x > width - pad) { n.x = width - pad; n.vx = -Math.abs(n.vx) * 0.65; }
        if (n.y < pad) { n.y = pad; n.vy = Math.abs(n.vy) * 0.65; }
        if (n.y > height - pad) { n.y = height - pad; n.vy = -Math.abs(n.vy) * 0.65; }
      });

      particles.forEach(p => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 0.95;

        if (p.life <= 0) {
          // Respawn near a random node for "flow from AI nodes"
          const src = nodes[Math.floor(Math.random() * nodes.length)];
          if (src) {
            p.x = src.x + (Math.random() - 0.5) * 38;
            p.y = src.y + (Math.random() - 0.5) * 38;
          } else {
            p.x = Math.random() * width;
            p.y = Math.random() * height;
          }
          p.life = p.maxLife;
          // gentle new direction
          p.vx = (Math.random() - 0.5) * 0.26;
          p.vy = (Math.random() - 0.5) * 0.26;
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
    const raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      themeObserver.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} id="ai-bg-canvas" aria-hidden="true" />;
};

export default AIBackground;
