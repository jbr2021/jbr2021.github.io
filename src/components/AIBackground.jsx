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
        line: 'rgba(56, 189, 248, 0.08)',
        lineActive: 'rgba(34, 211, 238, 0.35)',
        text: '#64748b',
        textHighlight: '#cbd5e1',
        packetCore: '#38bdf8',
        packetAgent: '#c084fc',
        packetVector: '#34d399',
        halo: 'rgba(56, 189, 248, 0.04)'
      } : {
        bg: '#f8fafc',
        nodeCore: '#0284c7',
        nodeAgent: '#7e22ce',
        nodeVector: '#0d9488',
        nodeApi: '#d97706',
        line: 'rgba(14, 165, 233, 0.08)',
        lineActive: 'rgba(14, 165, 233, 0.35)',
        text: '#64748b',
        textHighlight: '#1e293b',
        packetCore: '#0284c7',
        packetAgent: '#9333ea',
        packetVector: '#059669',
        halo: 'rgba(14, 165, 233, 0.03)'
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

      // Density tuned for clean backdrop
      const count = width < 600 ? 6 : width < 1024 ? 9 : 12;
      
      for (let i = 0; i < count; i++) {
        const catalogItem = conceptCatalog[i % conceptCatalog.length];
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.2;
        const radius = Math.min(width, height) * (0.2 + Math.random() * 0.25);
        
        nodes.push({
          id: i,
          x: width / 2 + Math.cos(angle) * radius,
          y: height / 2 + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: catalogItem.type === 'core' ? 16 : catalogItem.type === 'agent' ? 14 : 11,
          label: catalogItem.label,
          type: catalogItem.type,
          desc: catalogItem.desc,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.015,
          embedding: Array.from({ length: 3 }, () => (Math.random() * 2 - 1).toFixed(2))
        });
      }

      // Initial wave
      neuralWaves.push({
        x: width * 0.5,
        y: height * 0.5,
        r: 10,
        maxR: Math.max(width, height) * 0.5,
        speed: 1.5,
        alpha: 0.3
      });
    }

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
        speed: 0.007 + Math.random() * 0.01,
        payload: src.type === 'agent' ? `Agent [${src.label}] -> Call [${target.label}]` : `cos_sim = 0.94`,
        color: src.type === 'agent' ? colors.packetAgent : src.type === 'vector' ? colors.packetVector : colors.packetCore
      });
    }

    const packetInterval = setInterval(() => {
      if (queryPackets.length < 4) {
        spawnQueryPacket();
      }
    }, 2200);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      colors = getThemeColors();

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // === 1. Render Edges ===
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = width < 600 ? 200 : 280;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // === 2. Render Waves ===
      neuralWaves.forEach((wave, idx) => {
        ctx.strokeStyle = colors.lineActive;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = wave.alpha;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (!prefersReducedMotion) {
          wave.r += wave.speed;
          wave.alpha = Math.max(0, 0.3 * (1 - wave.r / wave.maxR));
        }

        if (wave.r >= wave.maxR || wave.alpha <= 0) {
          neuralWaves.splice(idx, 1);
        }
      });

      // === 3. Render Packets ===
      queryPackets.forEach((pkt, idx) => {
        if (!prefersReducedMotion) {
          pkt.progress += pkt.speed;
        } else {
          pkt.progress = 0.5;
        }

        const currX = pkt.x + (pkt.targetX - pkt.x) * pkt.progress;
        const currY = pkt.y + (pkt.targetY - pkt.y) * pkt.progress;

        ctx.strokeStyle = pkt.color;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(currX - (pkt.targetX - pkt.x) * 0.06, currY - (pkt.targetY - pkt.y) * 0.06);
        ctx.lineTo(currX, currY);
        ctx.stroke();

        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(currX, currY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        if (pkt.progress >= 1) {
          queryPackets.splice(idx, 1);
        }
      });

      // === 4. Render Nodes ===
      nodes.forEach(n => {
        if (!prefersReducedMotion) {
          n.pulse += n.pulseSpeed;
        }
        const pulseScale = 1 + Math.sin(n.pulse) * 0.1;
        const nodeColor = n.type === 'core' ? colors.nodeCore :
                          n.type === 'agent' ? colors.nodeAgent :
                          n.type === 'vector' ? colors.nodeVector : colors.nodeApi;

        ctx.fillStyle = colors.halo;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * pulseScale * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = nodeColor;
        ctx.shadowColor = nodeColor;
        ctx.shadowBlur = mouse.active && Math.hypot(mouse.x - n.x, mouse.y - n.y) < 100 ? 12 : 4;

        if (n.type === 'agent') {
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
          const size = n.radius * pulseScale * 1.5;
          ctx.beginPath();
          ctx.roundRect(n.x - size / 2, n.y - size / 2, size, size, 4);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * pulseScale, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.shadowBlur = 0;

        ctx.fillStyle = colors.textHighlight;
        ctx.font = '600 10.5px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + n.radius + 14);
      });
    }

    function update(delta) {
      const dt = Math.min(delta / 16, 1.2);
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      nodes.forEach(n => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100;
            n.x += (dx / dist) * force * 1.2;
            n.y += (dy / dist) * force * 1.2;
          }
        }

        const pad = 50;
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

    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      neuralWaves.push({
        x: clickX,
        y: clickY,
        r: 5,
        maxR: 300,
        speed: 3,
        alpha: 0.5
      });

      let closestNode = null;
      let minDist = Infinity;
      nodes.forEach(n => {
        const d = Math.hypot(clickX - n.x, clickY - n.y);
        if (d < minDist) {
          minDist = d;
          closestNode = n;
        }
      });

      if (closestNode && minDist < 180) {
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
      
      <div className="ai-bg-status-badge d-none d-md-flex align-items-center gap-2">
        <span className="pulse-dot"></span>
        <span className="concept-text">{activeConcept}</span>
      </div>
    </>
  );
};

export default AIBackground;
