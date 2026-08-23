import React, { useEffect, useRef, useState } from 'react';
import LiveClock from './LiveClock';

const FRAME_INTERVAL = 25;
const SCROLL_IDLE_DELAY = 100;

const AIBackground = () => {
  const canvasRef = useRef(null);
  const [activeConcept, setActiveConcept] = useState('Agentic AI & AI Agents Active');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let colors;
    let nodes = [];
    let queryPackets = [];
    let neuralWaves = [];
    let mouse = { x: -1000, y: -1000, active: false };
    let lastFrameTime = performance.now();
    let animationFrameId = null;
    let scrollTimeoutId = null;
    let mouseMoveFrameId = null;
    let pendingMousePosition = null;
    let destroyed = false;
    let isScrolling = false;
    let isTabHidden = document.hidden;
    let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // AI Engineering Concept Node Catalog
    const conceptCatalog = [
      { label: 'Azure OpenAI (gpt-5)', type: 'core', desc: 'LLM Reasoning Core' },
      { label: 'Agentic AI Router', type: 'agent', desc: 'Autonomous AI Agent Task Routing' },
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

    const getThemeColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      return isDark
        ? {
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
          }
        : {
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

    const drawGlowCircles = (x, y, radius, color, layers) => {
      const previousAlpha = ctx.globalAlpha;
      ctx.fillStyle = color;

      layers.forEach(({ scale, alpha }) => {
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, radius * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = previousAlpha;
    };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      nodes = [];
      queryPackets = [];
      neuralWaves = [];

      const count = width < 600 ? 6 : width < 1024 ? 9 : 12;

      for (let i = 0; i < count; i += 1) {
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
        payload: src.type === 'agent' ? `Agent [${src.label}] -> Call [${target.label}]` : 'cos_sim = 0.94',
        color: src.type === 'agent' ? colors.packetAgent : src.type === 'vector' ? colors.packetVector : colors.packetCore
      });
    }

    const packetInterval = window.setInterval(() => {
      if (isScrolling || isTabHidden || prefersReducedMotion) return;
      if (queryPackets.length < 4) {
        spawnQueryPacket();
      }
    }, 2200);

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i += 1) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = width < 600 ? 200 : 280;

          if (dist < maxDist) {
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      neuralWaves.forEach((wave) => {
        ctx.strokeStyle = colors.lineActive;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = wave.alpha;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      queryPackets.forEach((pkt) => {
        const currX = pkt.x + (pkt.targetX - pkt.x) * pkt.progress;
        const currY = pkt.y + (pkt.targetY - pkt.y) * pkt.progress;

        ctx.strokeStyle = pkt.color;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(currX - (pkt.targetX - pkt.x) * 0.06, currY - (pkt.targetY - pkt.y) * 0.06);
        ctx.lineTo(currX, currY);
        ctx.stroke();

        drawGlowCircles(currX, currY, 3, pkt.color, [
          { scale: 3.4, alpha: 0.08 },
          { scale: 2.3, alpha: 0.15 },
          { scale: 1.5, alpha: 0.28 }
        ]);

        ctx.globalAlpha = 0.95;
        ctx.fillStyle = pkt.color;
        ctx.beginPath();
        ctx.arc(currX, currY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      nodes.forEach((n) => {
        const pulseScale = 1 + Math.sin(n.pulse) * 0.1;
        const nodeColor = n.type === 'core'
          ? colors.nodeCore
          : n.type === 'agent'
            ? colors.nodeAgent
            : n.type === 'vector'
              ? colors.nodeVector
              : colors.nodeApi;
        const isNearMouse = mouse.active && Math.hypot(mouse.x - n.x, mouse.y - n.y) < 100;

        ctx.fillStyle = colors.halo;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * pulseScale * 2, 0, Math.PI * 2);
        ctx.fill();

        drawGlowCircles(n.x, n.y, n.radius * pulseScale, nodeColor, isNearMouse
          ? [
              { scale: 2.8, alpha: 0.08 },
              { scale: 2.1, alpha: 0.14 },
              { scale: 1.45, alpha: 0.22 }
            ]
          : [
              { scale: 2.4, alpha: 0.05 },
              { scale: 1.7, alpha: 0.1 }
            ]);

        ctx.fillStyle = nodeColor;

        if (n.type === 'agent') {
          ctx.beginPath();
          for (let side = 0; side < 6; side += 1) {
            const angle = (side / 6) * Math.PI * 2;
            const hexX = n.x + Math.cos(angle) * n.radius * pulseScale;
            const hexY = n.y + Math.sin(angle) * n.radius * pulseScale;
            if (side === 0) ctx.moveTo(hexX, hexY);
            else ctx.lineTo(hexX, hexY);
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

        ctx.fillStyle = colors.textHighlight;
        ctx.font = '600 10.5px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + n.radius + 14);
      });
    }

    function update(delta) {
      const dt = Math.min(delta / 16, 1.2);

      if (prefersReducedMotion) return;

      nodes.forEach((n) => {
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
        if (n.x < pad) {
          n.x = pad;
          n.vx *= -1;
        }
        if (n.x > width - pad) {
          n.x = width - pad;
          n.vx *= -1;
        }
        if (n.y < pad) {
          n.y = pad;
          n.vy *= -1;
        }
        if (n.y > height - pad) {
          n.y = height - pad;
          n.vy *= -1;
        }

        n.pulse += n.pulseSpeed;
      });

      neuralWaves = neuralWaves
        .map((wave) => ({
          ...wave,
          r: wave.r + wave.speed,
          alpha: Math.max(0, 0.3 * (1 - (wave.r + wave.speed) / wave.maxR))
        }))
        .filter((wave) => wave.r < wave.maxR && wave.alpha > 0);

      queryPackets = queryPackets
        .map((pkt) => ({
          ...pkt,
          progress: Math.min(1, pkt.progress + pkt.speed * dt)
        }))
        .filter((pkt) => pkt.progress < 1);
    }

    function loop(ts = performance.now()) {
      if (destroyed) return;

      animationFrameId = window.requestAnimationFrame(loop);

      if (isTabHidden || isScrolling) {
        lastFrameTime = ts;
        return;
      }

      const delta = ts - lastFrameTime;
      if (delta < FRAME_INTERVAL) return;

      lastFrameTime = ts;
      update(delta);
      draw();
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
      nodes.forEach((n) => {
        const distance = Math.hypot(clickX - n.x, clickY - n.y);
        if (distance < minDist) {
          minDist = distance;
          closestNode = n;
        }
      });

      if (closestNode && minDist < 180) {
        setActiveConcept(`Query Executed: ${closestNode.label} (${closestNode.desc})`);
        spawnQueryPacket();
      }

      if (!isScrolling && !isTabHidden) {
        draw();
      }
    };

    const flushMouseMove = () => {
      if (!pendingMousePosition) {
        mouseMoveFrameId = null;
        return;
      }

      const rect = canvas.getBoundingClientRect();
      mouse.x = pendingMousePosition.clientX - rect.left;
      mouse.y = pendingMousePosition.clientY - rect.top;
      mouse.active = true;
      pendingMousePosition = null;
      mouseMoveFrameId = null;
    };

    const handleMouseMove = (e) => {
      pendingMousePosition = { clientX: e.clientX, clientY: e.clientY };
      if (mouseMoveFrameId === null) {
        mouseMoveFrameId = window.requestAnimationFrame(flushMouseMove);
      }
    };

    const handleMouseLeave = () => {
      pendingMousePosition = null;
      mouse.active = false;
    };

    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimeoutId) {
        window.clearTimeout(scrollTimeoutId);
      }

      scrollTimeoutId = window.setTimeout(() => {
        isScrolling = false;
        lastFrameTime = performance.now();
      }, SCROLL_IDLE_DELAY);
    };

    const resizeHandler = () => {
      resize();
      initNodes();
      if (!isScrolling && !isTabHidden) {
        draw();
      }
    };

    const handleVisibilityChange = () => {
      isTabHidden = document.hidden;
      if (!isTabHidden) {
        lastFrameTime = performance.now();
        if (!isScrolling) {
          draw();
        }
      }
    };

    const handleReducedMotionChange = (event) => {
      prefersReducedMotion = event.matches;
      lastFrameTime = performance.now();
      if (!isScrolling && !isTabHidden) {
        draw();
      }
    };

    const themeObserver = new MutationObserver(() => {
      colors = getThemeColors();
      if (!isScrolling && !isTabHidden) {
        draw();
      }
    });

    colors = getThemeColors();
    resize();
    initNodes();
    draw();

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-bs-theme']
    });

    if (typeof reducedMotionQuery.addEventListener === 'function') {
      reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    } else {
      reducedMotionQuery.addListener(handleReducedMotionChange);
    }

    window.addEventListener('resize', resizeHandler, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    canvas.addEventListener('click', handleCanvasClick);

    animationFrameId = window.requestAnimationFrame(loop);

    return () => {
      destroyed = true;
      window.clearInterval(packetInterval);
      if (scrollTimeoutId) {
        window.clearTimeout(scrollTimeoutId);
      }
      if (mouseMoveFrameId !== null) {
        window.cancelAnimationFrame(mouseMoveFrameId);
      }
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      canvas.removeEventListener('click', handleCanvasClick);
      if (typeof reducedMotionQuery.removeEventListener === 'function') {
        reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      } else {
        reducedMotionQuery.removeListener(handleReducedMotionChange);
      }
      themeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="ai-bg-canvas"
        aria-label="Interactive AI system background visualizing Knowledge Graphs, Multi-Agent Systems, RAG, and Vector Embeddings"
      />

      <div className="ai-bg-status-badge d-none d-md-flex flex-column align-items-start gap-1">
        <div className="d-flex align-items-center gap-2">
          <span className="pulse-dot flex-shrink-0 me-1"></span>
          <span className="concept-text fw-semibold text-body">{activeConcept}</span>
        </div>
        <LiveClock />
      </div>
    </>
  );
};

export default AIBackground;
