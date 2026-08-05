import React, { useRef, useEffect, useState } from 'react';

const AIBackground = () => {
  const canvasRef = useRef(null);
  const [activeConcept, setActiveConcept] = useState('Multi-Agent System Active');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // AI Engineering Concept Node Catalog
    const conceptCatalog = [
      { label: 'Azure OpenAI (gpt-4o)', type: 'core', desc: 'LLM Reasoning Core' },
      { label: 'Agentic Router', type: 'agent', desc: 'Autonomous Task Decomposition' },
      { label: 'RAG Pipeline', type: 'rag', desc: 'Hybrid Vector Retrieval' },
      { label: 'Vector Index', type: 'vector', desc: '1536-dim Embedding Space' },
      { label: 'Python FastAPI', type: 'api', desc: 'Async High-Throughput API' },
      { label: 'Knowledge Graph', type: 'graph', desc: 'Entity-Relation Store' },
      { label: 'Azure AI Search', type: 'vector', desc: 'Semantic Keyword Hybrid' },
      { label: 'Reasoning Agent', type: 'agent', desc: 'Multi-Step Logic' },
      { label: 'Compliance Audit', type: 'agent', desc: 'Sensitive Keyword Detection' },
      { label: 'Document Indexer', type: 'rag', desc: 'PDF/Word Chunker' },
      { label: 'AWS OpenSearch', type: 'vector', desc: 'Distributed Vector DB' },
      { label: 'Azure Service Bus', type: 'api', desc: 'Async Queue Orchestration' },
      { label: 'Prompt Guardrails', type: 'core', desc: 'Safety & Injection Filter' },
      { label: 'Databricks ML', type: 'rag', desc: 'Analytical ML Pipeline' }
    ];

    let nodes = [];
    let queryPackets = [];
    let agentPackets = [];
    let neuralWaves = [];
    let mouse = { x: -1000, y: -1000, active: false };
    let lastTime = performance.now();

    const getThemeColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      return isDark ? {
        bg: '#0a0c10',
        nodeCore: '#38bdf8',
        nodeAgent: '#a855f7',
        nodeVector: '#22d3ee',
        nodeApi: '#f59e0b',
        line: 'rgba(56, 189, 248, 0.12)',
        lineActive: 'rgba(34, 211, 238, 0.45)',
        text: '#94a3b8',
        textHighlight: '#f1f5f9',
        packetCore: '#38bdf8',
        packetAgent: '#c084fc',
        packetVector: '#34d399',
        halo: 'rgba(56, 189, 248, 0.08)'
      } : {
        bg: '#f8fafc',
        nodeCore: '#0284c7',
        nodeAgent: '#7e22ce',
        nodeVector: '#0d9488',
        nodeApi: '#d97706',
        line: 'rgba(14, 165, 233, 0.15)',
        lineActive: 'rgba(14, 165, 233, 0.55)',
        text: '#475569',
        textHighlight: '#0f172a',
        packetCore: '#0284c7',
        packetAgent: '#9333ea',
        packetVector: '#059669',
        halo: 'rgba(14, 165, 233, 0.07)'
      };
    };

    let colors = getThemeColors();

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      nodes = [];
      queryPackets = [];
      agentPackets = [];
      neuralWaves = [];

      // Responsive density: 14 nodes on desktop, 10 on tablet, 7 on mobile
      const count = width < 600 ? 7 : width < 1024 ? 10 : 14;
      
      for (let i = 0; i < count; i++) {
        const catalogItem = conceptCatalog[i % conceptCatalog.length];
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.2;
        const radius = Math.min(width, height) * (0.18 + Math.random() * 0.28);
        
        nodes.push({
          id: i,
          x: width / 2 + Math.cos(angle) * radius,
          y: height / 2 + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          radius: catalogItem.type === 'core' ? 18 : catalogItem.type === 'agent' ? 15 : 12,
          label: catalogItem.label,
          type: catalogItem.type,
          desc: catalogItem.desc,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
          embedding: Array.from({ length: 3 }, () => (Math.random() * 2 - 1).toFixed(2))
        });
      }

      // Initial neural waves
      neuralWaves.push({
        x: width * 0.5,
        y: height * 0.5,
        r: 10,
        maxR: Math.max(width, height) * 0.6,
        speed: 1.8,
        alpha: 0.35
      });
    }

    // Spawn semantic search query packet traveling between nodes
    function spawnQueryPacket() {
      if (nodes.length < 2) return;
      const srcIdx = Math.floor(Math.random() * nodes.length);
      let targetIdx = Math.floor(Math.random() * nodes.length);
      while (targetIdx === srcIdx) {
        targetIdx = Math.floor(Math.random() * nodes.length);
      }
      
      const src = nodes[srcIdx];
      const target = nodes[targetIdx];

      queryPackets.push({
        srcId: src.id,
        targetId: target.id,
        x: src.x,
        y: src.y,
        targetX: target.x,
        targetY: target.y,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        payload: src.type === 'agent' ? `Agent [${src.label}] -> Call [${target.label}]` : `cos_sim(v_q, v_${target.id}) = 0.94`,
        color: src.type === 'agent' ? colors.packetAgent : src.type === 'vector' ? colors.packetVector : colors.packetCore
      });
    }

    // Periodic packet generation
    const packetInterval = setInterval(() => {
      if (queryPackets.length < 6) {
        spawnQueryPacket();
      }
    }, 1800);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      colors = getThemeColors();

      // Check reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // === 1. Render Knowledge Graph Edges ===
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = width < 600 ? 220 : 320;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.45;
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = dist < 150 ? 1.2 : 0.8;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            // Distance metric callout on close lines
            if (dist < 120 && i % 3 === 0) {
              ctx.fillStyle = colors.text;
              ctx.font = '8px monospace';
              ctx.textAlign = 'center';
              ctx.fillText(`d=${Math.round(dist)}`, (n1.x + n2.x) / 2, (n1.y + n2.y) / 2 - 4);
            }
          }
        }
      }

      // === 2. Render Neural Activation Wave Sweeps ===
      neuralWaves.forEach((wave, idx) => {
        ctx.strokeStyle = colors.lineActive;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = wave.alpha;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (!prefersReducedMotion) {
          wave.r += wave.speed;
          wave.alpha = Math.max(0, 0.35 * (1 - wave.r / wave.maxR));
        }

        if (wave.r >= wave.maxR || wave.alpha <= 0) {
          neuralWaves.splice(idx, 1);
        }
      });

      // === 3. Render Floating Query & Vector Packets ===
      queryPackets.forEach((pkt, idx) => {
        if (!prefersReducedMotion) {
          pkt.progress += pkt.speed;
        } else {
          pkt.progress = 0.5;
        }

        const currX = pkt.x + (pkt.targetX - pkt.x) * pkt.progress;
        const currY = pkt.y + (pkt.targetY - pkt.y) * pkt.progress;

        // Packet Trail
        ctx.strokeStyle = pkt.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.moveTo(currX - (pkt.targetX - pkt.x) * 0.08, currY - (pkt.targetY - pkt.y) * 0.08);
        ctx.lineTo(currX, currY);
        ctx.stroke();

        // Glowing Packet Head
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(currX, currY, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Packet Payload Tag
        if (width >= 768 && pkt.progress > 0.2 && pkt.progress < 0.8) {
          ctx.fillStyle = colors.textHighlight;
          ctx.font = '9px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(pkt.payload, currX, currY - 8);
        }

        if (pkt.progress >= 1) {
          queryPackets.splice(idx, 1);
        }
      });

      // === 4. Render Nodes & AI Concepts ===
      nodes.forEach(n => {
        if (!prefersReducedMotion) {
          n.pulse += n.pulseSpeed;
        }
        const pulseScale = 1 + Math.sin(n.pulse) * 0.12;
        const nodeColor = n.type === 'core' ? colors.nodeCore :
                          n.type === 'agent' ? colors.nodeAgent :
                          n.type === 'vector' ? colors.nodeVector : colors.nodeApi;

        // Outer Halo / Glow
        ctx.fillStyle = colors.halo;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * pulseScale * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Node Geometry
        ctx.fillStyle = nodeColor;
        ctx.shadowColor = nodeColor;
        ctx.shadowBlur = mouse.active && Math.hypot(mouse.x - n.x, mouse.y - n.y) < 100 ? 16 : 6;

        if (n.type === 'agent') {
          // Hexagon for Agents
          ctx.beginPath();
          for (let side = 0; side < 6; side++) {
            const a = (side / 6) * Math.PI * 2;
            const hx = n.x + Math.cos(a) * n.radius * pulseScale;
            const hy = n.y + Math.sin(a) * n.radius * pulseScale;
            if (side === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.fill();
        } else if (n.type === 'vector') {
          // Rounded Square for Vector Stores
          const size = n.radius * pulseScale * 1.6;
          ctx.beginPath();
          ctx.roundRect(n.x - size / 2, n.y - size / 2, size, size, 4);
          ctx.fill();
        } else {
          // Circle for Core / APIs
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * pulseScale, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.shadowBlur = 0;

        // Label Tag
        ctx.fillStyle = colors.textHighlight;
        ctx.font = '600 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + n.radius + 16);

        // Subtitle Vector / Desc
        if (width >= 600) {
          ctx.fillStyle = colors.text;
          ctx.font = '9px monospace';
          ctx.fillText(`[${n.embedding.join(',')}]`, n.x, n.y + n.radius + 28);
        }
      });

      // Mouse Target Highlights
      if (mouse.active) {
        ctx.strokeStyle = colors.lineActive;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        nodes.forEach(n => {
          const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
          if (d < 180) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        });
        ctx.setLineDash([]);
      }
    }

    function update(delta) {
      const dt = Math.min(delta / 16, 1.2);
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      nodes.forEach(n => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        // Mouse repulsion
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            n.x += (dx / dist) * force * 1.5;
            n.y += (dy / dist) * force * 1.5;
          }
        }

        // Bounded boundaries
        const pad = 60;
        if (n.x < pad) { n.x = pad; n.vx *= -1; }
        if (n.x > width - pad) { n.x = width - pad; n.vx *= -1; }
        if (n.y < pad) { n.y = pad; n.vy *= -1; }
        if (n.y > height - pad) { n.y = height - pad; n.vy *= -1; }
      });
    }

    function loop(ts = performance.now()) {
      const delta = ts - lastTime;
      lastTime = ts;
      update(delta);
      draw();
      requestAnimationFrame(loop);
    }

    // Interactive Click: Triggers Semantic Query Wave
    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      neuralWaves.push({
        x: clickX,
        y: clickY,
        r: 5,
        maxR: 350,
        speed: 3.5,
        alpha: 0.6
      });

      // Find nearest node & trigger active concept update
      let closestNode = null;
      let minDist = Infinity;
      nodes.forEach(n => {
        const d = Math.hypot(clickX - n.x, clickY - n.y);
        if (d < minDist) {
          minDist = d;
          closestNode = n;
        }
      });

      if (closestNode && minDist < 200) {
        setActiveConcept(`Query Executed: ${closestNode.label} (${closestNode.desc})`);
        spawnQueryPacket();
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const resizeHandler = () => {
      resize();
      initNodes();
    };

    const themeObserver = new MutationObserver(() => {
      colors = getThemeColors();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    resize();
    initNodes();
    draw();

    window.addEventListener('resize', resizeHandler);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);

    const rafId = requestAnimationFrame(loop);

    return () => {
      clearInterval(packetInterval);
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleCanvasClick);
      themeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        id="ai-bg-canvas" 
        aria-label="Interactive AI system background visualizing Knowledge Graphs, Multi-Agent Systems, RAG, and Vector Embeddings"
      />
      
      {/* Dynamic Status Ticker overlay in corner */}
      <div className="ai-bg-status-badge d-none d-md-flex align-items-center gap-2">
        <span className="pulse-dot"></span>
        <span className="concept-text">{activeConcept}</span>
      </div>
    </>
  );
};

export default AIBackground;
