/**
 * AI Engineering Background Animation
 * Premium, performant, visible canvas animation representing:
 * AI Agents, Multi-Agent Systems, LLMs, RAG, Embeddings, Vector DBs,
 * Knowledge Graphs, Python, FastAPI, Azure AI, Cloud, Semantic Search, etc.
 * 
 * Uses pure Canvas + JS (no heavy libs). ~60fps. Responsive.
 * Respects prefers-reduced-motion and tab visibility.
 */

(function() {
  'use strict';

  const canvas = document.getElementById('ai-bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap for perf
  let animationFrame = null;
  let lastTime = 0;
  let isPaused = false;
  let reducedMotion = false;

  // Config
  const CONFIG = {
    maxNodes: 92,
    connectionDist: 168,
    agentClusterDist: 210,
    particleCount: 38,
    labelCount: 11,
    driftSpeed: 0.18,
    pulseSpeed: 0.0028,
    lineOpacity: 0.28,
    nodeOpacity: 0.82,
    labelOpacity: 0.55,
    colors: {
      primary: '#149ddd',
      accent: '#37b3ed',
      cyan: '#5ce1e6',
      violet: '#8b5cf6',
      teal: '#14b8a6',
      green: '#10b981',
      orange: '#f59e0b',
      white: '#e0f2fe',
      dim: '#64748b'
    }
  };

  // Node types representing technologies
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
    { type: 'cloud', label: 'Cloud', color: CONFIG.colors.accent },
    { type: 'search', label: 'Search', color: CONFIG.colors.violet }
  ];

  let nodes = [];
  let particles = [];
  let floatingLabels = [];
  let connections = []; // dynamic connections for perf

  // Check reduced motion
  function checkReducedMotion() {
    try {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      reducedMotion = media.matches;
      media.addEventListener('change', (e) => {
        reducedMotion = e.matches;
        if (reducedMotion) pauseAnimation();
        else if (!isPaused) resumeAnimation();
      });
    } catch (e) {}
  }

  // Resize handler
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Re-init on extreme resize (mobile orientation)
    if (nodes.length > 0) {
      repositionNodes();
    }

    // Dynamically adjust node count for mobile/desktop
    const idealCount = Math.min(CONFIG.maxNodes, Math.floor((width * height) / 14200) + 36);
    if (nodes.length > idealCount + 12) {
      nodes.length = idealCount;
    } else if (nodes.length < idealCount - 8 && width > 480) {
      while (nodes.length < idealCount) nodes.push(createNode());
    }
  }

  function repositionNodes() {
    nodes.forEach(node => {
      node.x = Math.random() * width;
      node.y = Math.random() * height;
      node.vx = (Math.random() - 0.5) * CONFIG.driftSpeed * 1.4;
      node.vy = (Math.random() - 0.5) * CONFIG.driftSpeed * 1.4;
    });
    floatingLabels.forEach(lab => {
      lab.x = Math.random() * width;
      lab.y = Math.random() * height;
    });
  }

  // Create a node
  function createNode() {
    const typeInfo = NODE_TYPES[Math.floor(Math.random() * NODE_TYPES.length)];
    const isCore = Math.random() < 0.35; // Some are "core" AI nodes (larger)

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * CONFIG.driftSpeed * (isCore ? 0.7 : 1.2),
      vy: (Math.random() - 0.5) * CONFIG.driftSpeed * (isCore ? 0.7 : 1.2),
      radius: isCore ? (Math.random() * 3.8 + 4.6) : (Math.random() * 2.4 + 2.1),
      type: typeInfo.type,
      label: typeInfo.label,
      color: typeInfo.color,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.9 + Math.random() * 1.1,
      isCore: isCore,
      // Special agent behavior: cluster id
      cluster: typeInfo.type === 'agent' ? Math.floor(Math.random() * 4) : -1,
      // For vector/embed: small orbiting satellites
      satellites: (typeInfo.type === 'vector' || typeInfo.type === 'embed') ? Math.floor(Math.random() * 3) + 2 : 0,
      satAngle: Math.random() * Math.PI * 2,
      // Neural layer hint
      layer: Math.floor(Math.random() * 4)
    };
  }

  // Create floating tech label (very subtle)
  function createFloatingLabel() {
    const terms = [
      'LLM', 'RAG', 'Agent', 'Multi-Agent', 'Embedding', 'Vector DB', 'Semantic',
      'FastAPI', 'Azure AI', 'GPT', 'Prompt', 'Knowledge Graph', 'Python',
      'Retrieval', 'Neural', 'Pipeline', 'Cloud', 'Secure AI', 'GenAI'
    ];
    const term = terms[Math.floor(Math.random() * terms.length)];
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.09,
      vy: (Math.random() - 0.5) * 0.09,
      text: term,
      size: 9.5 + Math.random() * 3.5,
      alpha: CONFIG.labelOpacity * (0.65 + Math.random() * 0.35),
      phase: Math.random() * Math.PI * 2,
      life: 0
    };
  }

  // Create data-flow particle (API, embeddings, search results)
  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.1,
      vy: (Math.random() - 0.5) * 1.1,
      size: Math.random() * 1.6 + 0.85,
      life: 140 + Math.random() * 110,
      maxLife: 140 + Math.random() * 110,
      color: [CONFIG.colors.cyan, CONFIG.colors.primary, CONFIG.colors.teal, CONFIG.colors.accent][Math.floor(Math.random() * 4)],
      // Occasionally attach to a line
      attached: Math.random() < 0.3
    };
  }

  function initNodes() {
    nodes = [];
    const target = Math.min(CONFIG.maxNodes, Math.floor((width * height) / 14500) + 38);
    for (let i = 0; i < target; i++) {
      nodes.push(createNode());
    }
  }

  function initParticles() {
    particles = [];
    const pCount = Math.min(CONFIG.particleCount, Math.floor(width / 28));
    for (let i = 0; i < pCount; i++) {
      particles.push(createParticle());
    }
  }

  function initLabels() {
    floatingLabels = [];
    const lCount = Math.min(CONFIG.labelCount, Math.floor(width / 115) + 4);
    for (let i = 0; i < lCount; i++) {
      floatingLabels.push(createFloatingLabel());
    }
  }

  // Draw a single node (circle + subtle glow + occasional shape)
  function drawNode(node) {
    const pulse = Math.sin(node.pulse) * 0.5 + 0.5;
    const r = node.radius + (node.isCore ? pulse * 1.35 : pulse * 0.65);

    ctx.save();

    // Glow
    const grad = ctx.createRadialGradient(
      node.x, node.y, r * 0.2,
      node.x, node.y, r * 2.8
    );
    grad.addColorStop(0, node.color + '44');
    grad.addColorStop(0.6, node.color + '14');
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(node.x, node.y, r * 2.6, 0, Math.PI * 2);
    ctx.fill();

    // Core node
    ctx.fillStyle = node.color;
    ctx.globalAlpha = CONFIG.nodeOpacity * (node.isCore ? 0.96 : 0.82);
    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
    ctx.fill();

    // Inner highlight for premium feel
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.arc(node.x - r * 0.35, node.y - r * 0.35, r * 0.38, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;

    // Agent hexagons for special types
    if (node.type === 'agent' || node.type === 'graph') {
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 1.15;
      ctx.globalAlpha = 0.65 + pulse * 0.25;
      ctx.beginPath();
      const sides = node.type === 'agent' ? 6 : 5;
      for (let s = 0; s < sides; s++) {
        const ang = (s / sides) * Math.PI * 2 + node.pulse * 0.4;
        const px = node.x + Math.cos(ang) * (r * 1.45);
        const py = node.y + Math.sin(ang) * (r * 1.45);
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Vector / embedding small satellites
    if (node.satellites > 0) {
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 0.9;
      ctx.globalAlpha = 0.55;
      const satR = r * 0.55;
      for (let s = 0; s < node.satellites; s++) {
        const ang = node.satAngle + (s * (Math.PI * 2 / node.satellites));
        const sx = node.x + Math.cos(ang) * (r * 2.15);
        const sy = node.y + Math.sin(ang) * (r * 2.15);
        ctx.beginPath();
        ctx.arc(sx, sy, satR, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Very subtle label on some nodes
    if (node.isCore && Math.random() < 0.7) {
      ctx.fillStyle = '#f1f5f9';
      ctx.font = '500 8.5px "Poppins", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.globalAlpha = 0.35 + pulse * 0.15;
      ctx.fillText(node.label, node.x, node.y + node.radius + 11);
    }

    ctx.restore();
  }

  // Draw connection line between two nodes
  function drawConnection(n1, n2, alphaMod = 1) {
    const dx = n2.x - n1.x;
    const dy = n2.y - n1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > CONFIG.connectionDist || dist < 8) return;

    const alpha = Math.max(0.06, (1 - dist / CONFIG.connectionDist) * CONFIG.lineOpacity * alphaMod);

    ctx.save();
    ctx.strokeStyle = CONFIG.colors.white;
    ctx.lineWidth = n1.isCore && n2.isCore ? 1.05 : 0.75;
    ctx.globalAlpha = alpha;

    // Main line
    ctx.beginPath();
    ctx.moveTo(n1.x, n1.y);
    ctx.lineTo(n2.x, n2.y);
    ctx.stroke();

    // Accent for important tech flows (RAG, Agents, Vector)
    const isImportant = (n1.type === 'agent' || n1.type === 'rag' || n1.type === 'vector' ||
                         n2.type === 'agent' || n2.type === 'rag' || n2.type === 'vector');
    if (isImportant) {
      ctx.strokeStyle = n1.color;
      ctx.globalAlpha = alpha * 0.75;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.stroke();
    }

    ctx.restore();
  }

  // Draw animated data particle on a connection
  function drawFlowParticle(p) {
    ctx.save();
    ctx.fillStyle = p.color;
    ctx.globalAlpha = (p.life / p.maxLife) * 0.85;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    // tiny trail
    ctx.globalAlpha = (p.life / p.maxLife) * 0.35;
    ctx.beginPath();
    ctx.arc(p.x - p.vx * 2.2, p.y - p.vy * 2.2, p.size * 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Draw floating label
  function drawFloatingLabel(label) {
    ctx.save();
    const alpha = label.alpha * (0.75 + Math.sin(label.phase) * 0.25);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = CONFIG.colors.white;
    ctx.font = `500 ${label.size}px "Poppins", system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(label.text, label.x, label.y);

    // subtle underline for tech feel
    ctx.strokeStyle = CONFIG.colors.primary;
    ctx.lineWidth = 0.6;
    ctx.globalAlpha = alpha * 0.45;
    const tw = ctx.measureText(label.text).width;
    ctx.beginPath();
    ctx.moveTo(label.x - tw * 0.5, label.y + 2.5);
    ctx.lineTo(label.x + tw * 0.5, label.y + 2.5);
    ctx.stroke();
    ctx.restore();
  }

  // Draw neural network layers (background structure - always visible)
  function drawNeuralLayers() {
    const layers = 4;
    const layerSpacing = height / (layers + 1);
    const nodesPerLayer = [5, 7, 8, 5];

    ctx.save();
    ctx.strokeStyle = CONFIG.colors.dim;
    ctx.lineWidth = 0.6;
    ctx.globalAlpha = 0.13;

    for (let l = 0; l < layers; l++) {
      const y = layerSpacing * (l + 1);
      const count = nodesPerLayer[l];
      const xSpacing = width / (count + 1);

      // Layer nodes
      for (let n = 0; n < count; n++) {
        const x = xSpacing * (n + 1);
        const pulse = Math.sin(Date.now() * 0.0013 + l * 1.3 + n) * 0.5 + 0.5;

        ctx.fillStyle = CONFIG.colors.primary;
        ctx.globalAlpha = 0.08 + pulse * 0.07;

        ctx.beginPath();
        ctx.arc(x, y, 2.8 + pulse * 1.4, 0, Math.PI * 2);
        ctx.fill();

        // Connect to next layer
        if (l < layers - 1) {
          const nextY = layerSpacing * (l + 2);
          const nextCount = nodesPerLayer[l + 1];
          const nextSpacing = width / (nextCount + 1);

          for (let nn = 0; nn < nextCount; nn++) {
            const nx = nextSpacing * (nn + 1);
            // Only some connections
            if ((n + nn) % 2 === 0 || Math.random() < 0.6) {
              ctx.strokeStyle = CONFIG.colors.accent;
              ctx.globalAlpha = 0.07;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(nx, nextY);
              ctx.stroke();
            }
          }
        }
      }
    }
    ctx.restore();
  }

  // Update all entities
  function update(delta) {
    const dt = Math.min(delta / 16.67, 1.8); // normalize to ~60fps

    // Update nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx * dt;
      n.y += n.vy * dt;
      n.pulse += n.pulseSpeed * 0.018 * dt;

      // Gentle boundary bounce + wrap for large screens
      const pad = 32;
      if (n.x < pad) { n.x = pad; n.vx = Math.abs(n.vx) * 0.85; }
      if (n.x > width - pad) { n.x = width - pad; n.vx = -Math.abs(n.vx) * 0.85; }
      if (n.y < pad) { n.y = pad; n.vy = Math.abs(n.vy) * 0.85; }
      if (n.y > height - pad) { n.y = height - pad; n.vy = -Math.abs(n.vy) * 0.85; }

      // Very slight attraction between same-cluster agents (multi-agent collaboration)
      if (n.cluster >= 0) {
        for (let j = i + 1; j < nodes.length; j++) {
          const o = nodes[j];
          if (o.cluster === n.cluster) {
            const dx = o.x - n.x;
            const dy = o.y - n.y;
            const d = Math.sqrt(dx * dx + dy * dy) || 1;
            if (d < CONFIG.agentClusterDist) {
              const force = 0.012 / d;
              n.vx += dx * force * dt;
              n.vy += dy * force * dt;
              o.vx -= dx * force * dt;
              o.vy -= dy * force * dt;
            }
          }
        }
      }

      // Satellites spin
      if (n.satellites > 0) {
        n.satAngle += 0.014 * dt;
      }

      // Light random walk
      if (Math.random() < 0.035) {
        n.vx += (Math.random() - 0.5) * 0.025;
        n.vy += (Math.random() - 0.5) * 0.025;
      }

      // Speed limit
      const sp = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      if (sp > 0.9) {
        n.vx *= 0.9 / sp;
        n.vy *= 0.9 / sp;
      }
    }

    // Update floating labels
    for (let i = 0; i < floatingLabels.length; i++) {
      const lab = floatingLabels[i];
      lab.x += lab.vx * dt;
      lab.y += lab.vy * dt;
      lab.phase += 0.016 * dt;
      lab.life += 0.6 * dt;

      if (lab.x < 10 || lab.x > width - 10) lab.vx *= -0.92;
      if (lab.y < 12 || lab.y > height - 12) lab.vy *= -0.92;

      // Occasionally respawn label far away
      if (lab.life > 2100 && Math.random() < 0.008) {
        lab.x = Math.random() * width;
        lab.y = Math.random() * height * 0.9;
        lab.life = 0;
        lab.vx = (Math.random() - 0.5) * 0.09;
        lab.vy = (Math.random() - 0.5) * 0.09;
      }
    }

    // Update particles (data flow)
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx * dt * 0.95;
      p.y += p.vy * dt * 0.95;
      p.life -= dt * 0.92;

      // Wrap or respawn
      if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
        // Respawn near a random node (simulate pipeline flow)
        if (nodes.length > 0) {
          const src = nodes[Math.floor(Math.random() * nodes.length)];
          p.x = src.x + (Math.random() - 0.5) * 38;
          p.y = src.y + (Math.random() - 0.5) * 38;
        } else {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }
        p.vx = (Math.random() - 0.5) * 1.15;
        p.vy = (Math.random() - 0.5) * 1.15;
        p.life = p.maxLife;
      }
    }

    // Occasionally inject a "search" or "API" particle from an agent node
    if (Math.random() < 0.04 && particles.length < CONFIG.particleCount * 1.3) {
      particles.push(createParticle());
    }
  }

  // Main render
  function render() {
    ctx.clearRect(0, 0, width, height);

    if (reducedMotion) {
      // Simplified static-ish view for accessibility
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = CONFIG.colors.primary;
      for (let i = 0; i < nodes.length; i += 2) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      return;
    }

    // Background subtle grid / knowledge lattice
    ctx.strokeStyle = '#1e2937';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.06;
    const grid = 72;
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

    // Neural layers (always present - core concept)
    drawNeuralLayers();

    // Draw connections (only between close nodes)
    ctx.lineCap = 'round';
    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < CONFIG.connectionDist * CONFIG.connectionDist) {
          // Draw with distance fade
          drawConnection(n1, n2, 1);

          // Extra pulsing connections for agent clusters
          if (n1.cluster >= 0 && n1.cluster === n2.cluster) {
            const pulse = Math.sin(Date.now() * 0.0025 + i) * 0.5 + 0.5;
            drawConnection(n1, n2, 0.55 + pulse * 0.45);
          }
        }
      }
    }

    // Draw nodes
    for (let i = 0; i < nodes.length; i++) {
      drawNode(nodes[i]);
    }

    // Draw particles (flowing data / embeddings / API requests)
    for (let i = 0; i < particles.length; i++) {
      drawFlowParticle(particles[i]);
    }

    // Draw floating labels (tech terms)
    for (let i = 0; i < floatingLabels.length; i++) {
      drawFloatingLabel(floatingLabels[i]);
    }

    // Occasional "reasoning" pulse rings (AI thinking)
    if (Math.random() < 0.32 && nodes.length > 5) {
      const src = nodes[Math.floor(Math.random() * nodes.length)];
      if (src.isCore || src.type === 'agent' || src.type === 'llm') {
        ctx.save();
        const ringPulse = (Date.now() % 2100) / 2100;
        ctx.strokeStyle = src.color;
        ctx.globalAlpha = 0.13 * (1 - ringPulse);
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(src.x, src.y, src.radius * 3.5 + ringPulse * 32, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  // Main animation loop
  function animate(timestamp = 0) {
    if (isPaused || reducedMotion) {
      animationFrame = requestAnimationFrame(animate);
      return;
    }

    const delta = timestamp - lastTime;
    lastTime = timestamp;

    update(delta);
    render();

    animationFrame = requestAnimationFrame(animate);
  }

  function pauseAnimation() {
    isPaused = true;
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  function resumeAnimation() {
    if (!isPaused) return;
    isPaused = false;
    lastTime = performance.now();
    animationFrame = requestAnimationFrame(animate);
  }

  // Visibility / tab handling
  function setupVisibility() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        pauseAnimation();
      } else {
        resumeAnimation();
      }
    });

    // Pause on very low battery or high load heuristics (optional)
    window.addEventListener('blur', pauseAnimation);
    window.addEventListener('focus', resumeAnimation);
  }

  // Interaction: subtle mouse interaction (attract nodes lightly)
  function setupMouseInteraction() {
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseActive = false;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;

      // Gentle attraction
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 12 && dist < 220) {
          const force = 0.028 / (dist + 8);
          n.vx += dx * force;
          n.vy += dy * force;
        }
      }
    };

    const handleLeave = () => {
      mouseActive = false;
    };

    canvas.addEventListener('mousemove', handleMove, { passive: true });
    canvas.addEventListener('mouseleave', handleLeave, { passive: true });

    // Touch support for mobile (light interaction)
    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        mouseActive = true;
        for (let i = 0; i < nodes.length; i += 2) {
          const n = nodes[i];
          const dx = mouseX - n.x;
          const dy = mouseY - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 20 && dist < 170) {
            n.vx += dx * 0.011;
            n.vy += dy * 0.011;
          }
        }
      }
    }, { passive: true });

    // Periodic subtle global drift (cloud-native feel)
    setInterval(() => {
      if (!isPaused && !reducedMotion && nodes.length > 0) {
        const dir = Math.random() * Math.PI * 2;
        const strength = 0.035;
        for (let i = 0; i < nodes.length; i += 3) {
          nodes[i].vx += Math.cos(dir) * strength;
          nodes[i].vy += Math.sin(dir) * strength;
        }
      }
    }, 12500);
  }

  // Initial setup
  function init() {
    checkReducedMotion();
    resizeCanvas();

    initNodes();
    initParticles();
    initLabels();

    // Seed some initial clustering for agents
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].cluster >= 0) {
        nodes[i].x = width * (0.15 + (nodes[i].cluster % 3) * 0.28);
        nodes[i].y = height * (0.22 + Math.floor(nodes[i].cluster / 3) * 0.26);
      }
    }

    setupVisibility();
    setupMouseInteraction();

    // Initial render
    render();

    // Start animation loop
    lastTime = performance.now();
    if (!reducedMotion) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      // One-time render for reduced motion
      render();
    }

    // Responsive resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const oldW = width;
        const oldH = height;
        resizeCanvas();
        if (Math.abs(width - oldW) > 120 || Math.abs(height - oldH) > 120) {
          // Reposition intelligently when major resize
          repositionNodes();
          // Re-init particles/labels only on very large change
          if (particles.length < 10) initParticles();
          if (floatingLabels.length < 3) initLabels();
        }
      }, 140);
    }, { passive: true });

    // Occasional respawn of a few particles for continuous feel
    setInterval(() => {
      if (!isPaused && !reducedMotion && particles.length < CONFIG.particleCount * 1.1) {
        for (let k = 0; k < 2; k++) {
          particles.push(createParticle());
        }
      }
    }, 18500);

    // Keyboard accessibility hint (does nothing visual but good practice)
    window.addEventListener('keydown', (e) => {
      if (e.key === '?' && document.activeElement.tagName === 'BODY') {
        // Could pause but no need
      }
    });

    // Expose minimal control (for debugging / future)
    window.__AI_BG = {
      pause: pauseAnimation,
      resume: resumeAnimation,
      toggle: () => isPaused ? resumeAnimation() : pauseAnimation()
    };

    // Mark as loaded
    canvas.setAttribute('data-ai-bg', 'active');
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();