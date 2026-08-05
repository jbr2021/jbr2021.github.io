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
    let lastTime = performance.now();

    const getColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      return isDark 
        ? { dot: '#475569', line: '#334155' }
        : { dot: '#cbd5e1', line: '#e2e8f0' };
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
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        r: Math.random() * 1.6 + 0.8,
        phase: Math.random() * Math.PI * 2
      };
    }

    function init() {
      nodes = [];
      // Much fewer nodes for subtlety
      const count = Math.min(24, Math.floor((width * height) / 42000));
      for (let i = 0; i < count; i++) nodes.push(createNode());
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      colors = getColors();

      // Extremely faint connections
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.022;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 92) {
            ctx.globalAlpha = (1 - dist / 92) * 0.025;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Very soft nodes (like distant stars / neurons)
      ctx.globalAlpha = 0.045;
      ctx.fillStyle = colors.dot;
      nodes.forEach(n => {
        const s = Math.sin(n.phase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * s, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    }

    function update(delta) {
      const dt = Math.min(delta / 16, 1.3);

      nodes.forEach(n => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.phase += 0.007 * dt;

        if (n.x < 50 || n.x > width - 50) n.vx *= -1;
        if (n.y < 50 || n.y > height - 50) n.vy *= -1;
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
