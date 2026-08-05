import React, { useRef, useEffect } from 'react';

const AIBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);
  const particlesRef = useRef([]);
  const labelsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let lastTime = performance.now();
    let isPaused = false;

    const CONFIG = {
      maxNodes: 82,
      connectionDist: 165,
      particleCount: 32,
      labelCount: 9,
      driftSpeed: 0.16,
      lineOpacity: 0.26,
      nodeOpacity: 0.78,
      labelOpacity: 0.52,
      colors: {
        primary: '#149ddd',
        accent: '#37b3ed',
        cyan: '#5ce1e6',
        violet: '#8b5cf6',
        teal: '#14b8a6',
        green: '#10b981',
        orange: '#f59e0b',
        white: '#e0f2fe'
      }
    };

    const NODE_TYPES = [
      { type: 'llm', label: 'LLM', color: CONFIG.colors.primary },
      { type: 'rag', label: 'RAG', color: CONFIG.colors.accent },
      { type: 'agent', label: 'Agent', color: CONFIG.colors.cyan },
      { type: 'vector', label: 'Vector', color: CONFIG.colors.violet },
      { type: 'embed', label: 'Embed', color: CONFIG.colors.teal },
      { type: 'graph', label: 'KG', color: CONFIG.colors.green },
      { type: 'python', label: 'Py', color: CONFIG.colors.orange },
      { type: 'fastapi', label: 'API', color: CONFIG.colors.primary },
      { type: 'azure', label: 'Azure', color: '#0078d4' },
      { type: 'cloud', label: 'Cloud', color: CONFIG.colors.accent }
    ];

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
      const typeInfo = NODE_TYPES[Math.floor(Math.random() * NODE_TYPES.length)];
      const isCore = Math.random() < 0.32;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * CONFIG.driftSpeed * (isCore ? 0.65 : 1.15),
        vy: (Math.random() - 0.5) * CONFIG.driftSpeed * (isCore ? 0.65 : 1.15),
        radius: isCore ? (Math.random() * 3.6 + 4.4) : (Math.random() * 2.3 + 2.0),
        type: typeInfo.type,
        label: typeInfo.label,
        color: typeInfo.color,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.85 + Math.random() * 1.0,
        isCore,
        cluster: typeInfo.type === 'agent' ? Math.floor(Math.random() * 4) : -1,
        satellites: (typeInfo.type === 'vector' || typeInfo.type === 'embed') ? Math.floor(Math.random() * 3) + 1 : 0,
        satAngle: Math.random() * Math.PI * 2
      };
    }

    function createParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        size: Math.random() * 1.5 + 0.8,
        life: 120 + Math.random() * 95,
        maxLife: 120 + Math.random() * 95,
        color: [CONFIG.colors.cyan, CONFIG.colors.primary, CONFIG.colors.teal, CONFIG.colors.accent][Math.floor(Math.random() * 4)]
      };
    }

    function createLabel() {
      const terms = ['LLM', 'RAG', 'Agent', 'Multi-Agent', 'Embedding', 'Vector DB', 'Semantic', 'FastAPI', 'Azure AI', 'Prompt', 'Python'];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        text: terms[Math.floor(Math.random() * terms.length)],
        size: 9 + Math.random() * 3.2,
        alpha: CONFIG.labelOpacity * (0.7 + Math.random() * 0.3),
        phase: Math.random() * Math.PI * 2,
        life: 0
      };
    }

    function init() {
      nodesRef.current = [];
      particlesRef.current = [];
      labelsRef.current = [];

      const targetNodes = Math.min(CONFIG.maxNodes, Math.floor((width * height) / 15500) + 36);
      for (let i = 0; i < targetNodes; i++) {
        nodesRef.current.push(createNode());
      }
      for (let i = 0; i < CONFIG.particleCount; i++) {
        particlesRef.current.push(createParticle());
      }
      for (let i = 0; i < CONFIG.labelCount; i++) {
        labelsRef.current.push(createLabel());
      }
    }

    function drawNode(node) {
      const pulse = Math.sin(node.pulse) * 0.5 + 0.5;
      const r = node.radius + (node.isCore ? pulse * 1.3 : pulse * 0.6);

      // Glow
      const grad = ctx.createRadialGradient(node.x, node.y, r * 0.2, node.x, node.y, r * 2.7);
      grad.addColorStop(0, node.color + '33');
      grad.addColorStop(0.65, node.color + '11');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = node.color;
      ctx.globalAlpha = CONFIG.nodeOpacity * (node.isCore ? 0.95 : 0.8);
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fill();

      // Highlight
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.22;
      ctx.beginPath();
      ctx.arc(node.x - r * 0.32, node.y - r * 0.32, r * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Hex / special shapes
      if (node.type === 'agent' || node.type === 'graph') {
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1.1;
        ctx.globalAlpha = 0.6 + pulse * 0.25;
        ctx.beginPath();
        const sides = node.type === 'agent' ? 6 : 5;
        for (let s = 0; s < sides; s++) {
          const ang = (s / sides) * Math.PI * 2 + node.pulse * 0.35;
          const px = node.x + Math.cos(ang) * (r * 1.4);
          const py = node.y + Math.sin(ang) * (r * 1.4);
          s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Satellites
      if (node.satellites > 0) {
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 0.85;
        ctx.globalAlpha = 0.5;
        const satR = r * 0.52;
        for (let s = 0; s < node.satellites; s++) {
          const ang = node.satAngle + (s * (Math.PI * 2 / node.satellites));
          const sx = node.x + Math.cos(ang) * (r * 2.05);
          const sy = node.y + Math.sin(ang) * (r * 2.05);
          ctx.beginPath();
          ctx.arc(sx, sy, satR, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // Tiny label
      if (node.isCore) {
        ctx.fillStyle = '#f1f5f9';
        ctx.font = '500 8px Poppins, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.globalAlpha = 0.32 + pulse * 0.12;
        ctx.fillText(node.label, node.x, node.y + node.radius + 10);
        ctx.globalAlpha = 1;
      }
    }

    function drawConnection(n1, n2, mod = 1) {
      const dx = n2.x - n1.x;
      const dy = n2.y - n1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > CONFIG.connectionDist || dist < 6) return;

      const alpha = Math.max(0.05, (1 - dist / CONFIG.connectionDist) * CONFIG.lineOpacity * mod);
      ctx.strokeStyle = CONFIG.colors.white;
      ctx.lineWidth = (n1.isCore && n2.isCore) ? 1.0 : 0.7;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function drawParticle(p) {
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = (p.life / p.maxLife) * 0.82;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawLabel(label) {
      ctx.save();
      const alpha = label.alpha * (0.72 + Math.sin(label.phase) * 0.28);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = CONFIG.colors.white;
      ctx.font = `500 ${label.size}px Poppins, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(label.text, label.x, label.y);
      ctx.restore();
    }

    function update(delta) {
      const dt = Math.min(delta / 16.67, 1.7);

      nodesRef.current.forEach((n, i) => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.pulse += n.pulseSpeed * 0.017 * dt;

        const pad = 30;
        if (n.x < pad) { n.x = pad; n.vx *= -0.82; }
        if (n.x > width - pad) { n.x = width - pad; n.vx *= -0.82; }
        if (n.y < pad) { n.y = pad; n.vy *= -0.82; }
        if (n.y > height - pad) { n.y = height - pad; n.vy *= -0.82; }

        // Agent clustering
        if (n.cluster >= 0) {
          nodesRef.current.forEach((o, j) => {
            if (j > i && o.cluster === n.cluster) {
              const dx = o.x - n.x;
              const dy = o.y - n.y;
              const d = Math.sqrt(dx * dx + dy * dy) || 1;
              if (d < 195) {
                const f = 0.011 / d;
                n.vx += dx * f * dt;
                n.vy += dy * f * dt;
              }
            }
          });
        }

        if (n.satellites > 0) n.satAngle += 0.012 * dt;

        // Light wander
        if (Math.random() < 0.03) {
          n.vx += (Math.random() - 0.5) * 0.022;
          n.vy += (Math.random() - 0.5) * 0.022;
        }

        const sp = Math.hypot(n.vx, n.vy);
        if (sp > 0.85) {
          n.vx *= 0.88 / sp;
          n.vy *= 0.88 / sp;
        }
      });

      labelsRef.current.forEach(lab => {
        lab.x += lab.vx * dt;
        lab.y += lab.vy * dt;
        lab.phase += 0.015 * dt;
        lab.life += 0.55 * dt;
        if (lab.x < 8 || lab.x > width - 8) lab.vx *= -0.9;
        if (lab.y < 10 || lab.y > height - 10) lab.vy *= -0.9;
      });

      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx * dt * 0.92;
        p.y += p.vy * dt * 0.92;
        p.life -= dt * 0.9;

        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          const src = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
          if (src) {
            p.x = src.x + (Math.random() - 0.5) * 32;
            p.y = src.y + (Math.random() - 0.5) * 32;
          } else {
            p.x = Math.random() * width;
            p.y = Math.random() * height;
          }
          p.vx = (Math.random() - 0.5) * 1.05;
          p.vy = (Math.random() - 0.5) * 1.05;
          p.life = p.maxLife;
        }
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Subtle grid
      ctx.strokeStyle = '#1e2937';
      ctx.lineWidth = 0.45;
      ctx.globalAlpha = 0.055;
      const grid = 68;
      for (let x = grid; x < width; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = grid; y < height; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Connections
      const nodes = nodesRef.current;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          drawConnection(nodes[i], nodes[j]);
        }
      }

      // Nodes
      nodes.forEach(drawNode);

      // Particles
      particlesRef.current.forEach(drawParticle);

      // Labels
      labelsRef.current.forEach(drawLabel);

      // Reasoning pulse
      if (Math.random() < 0.28 && nodes.length > 3) {
        const src = nodes[Math.floor(Math.random() * nodes.length)];
        if (src.isCore || src.type === 'agent' || src.type === 'llm') {
          const ring = ((Date.now() % 1900) / 1900);
          ctx.strokeStyle = src.color;
          ctx.globalAlpha = 0.11 * (1 - ring);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(src.x, src.y, src.radius * 3.3 + ring * 28, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    function animate(timestamp = performance.now()) {
      if (isPaused) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const delta = timestamp - lastTime;
      lastTime = timestamp;

      update(delta);
      render();

      animationRef.current = requestAnimationFrame(animate);
    }

    function handleVisibility() {
      const onChange = () => {
        isPaused = document.hidden;
      };
      document.addEventListener('visibilitychange', onChange);
      return () => document.removeEventListener('visibilitychange', onChange);
    }

    function handleResize() {
      resize();
      init();
    }

    // Init
    resize();
    init();
    render();

    const cleanupVisibility = handleVisibility();

    window.addEventListener('resize', handleResize);

    // Start
    lastTime = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      cleanupVisibility();
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
