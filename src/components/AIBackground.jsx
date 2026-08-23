import React, { useEffect, useMemo, useRef, useState } from 'react';
import LiveClock from './LiveClock';

const FRAME_INTERVAL = 25;
const SCROLL_IDLE_DELAY = 100;
const MAX_NODES = 12;
const DEFAULT_ACTIVE_CONCEPT = 'JBR portfolio intelligence mesh active';

const DEFAULT_CONCEPT_CATALOG = [
  { label: 'Forward Deployed AI Engineer', type: 'core', desc: 'Production AI systems' },
  { label: 'Agentic AI', type: 'agent', desc: 'Autonomous task routing' },
  { label: 'AI Agents', type: 'agent', desc: 'Multi-step orchestration' },
  { label: 'RAG Pipelines', type: 'rag', desc: 'Grounded retrieval flows' },
  { label: 'Azure OpenAI', type: 'core', desc: 'LLM reasoning stack' },
  { label: 'Vector Search', type: 'vector', desc: 'Semantic retrieval' },
  { label: 'Python FastAPI', type: 'api', desc: 'Cloud microservices' },
  { label: 'Backstage IDP', type: 'graph', desc: 'Developer platform mesh' },
  { label: 'Databricks ML', type: 'rag', desc: 'Analytics pipelines' },
  { label: 'World Bank AI', type: 'core', desc: 'Enterprise AI delivery' },
  { label: 'Compliance Review', type: 'agent', desc: 'Sensitive content checks' },
  { label: 'Cloud Architecture', type: 'api', desc: 'Scalable platform design' }
];

const TECH_TYPE_RULES = [
  { type: 'agent', keywords: ['agent', 'langgraph', 'workflow', 'orchestr', 'review'] },
  { type: 'vector', keywords: ['vector', 'embedding', 'semantic', 'search'] },
  { type: 'rag', keywords: ['rag', 'document', 'retrieval', 'knowledge'] },
  { type: 'api', keywords: ['api', 'fastapi', 'azure', 'cloud', 'service', 'backstage', 'portal'] },
  { type: 'graph', keywords: ['graph', 'catalog', 'mesh', 'platform'] },
  { type: 'core', keywords: ['ai', 'llm', 'openai', 'gpt', 'engineer'] }
];

const truncateText = (value, max = 34) => {
  if (!value) return '';
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
};

const inferConceptType = (text = '') => {
  const normalized = text.toLowerCase();
  for (const rule of TECH_TYPE_RULES) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return rule.type;
    }
  }
  return 'core';
};

const buildConceptCatalog = (profile) => {
  const personal = profile?.personal ?? {};
  const highlights = profile?.highlights ?? [];
  const skills = profile?.skills ?? [];
  const experience = profile?.experience ?? [];
  const education = profile?.education ?? [];
  const techPills = personal.techPills ?? [];

  const flattenedSkills = skills.flatMap((group) => group.items ?? []);
  const featuredProjects = experience.flatMap((company) =>
    (company.projects ?? []).slice(0, 2).map((project) => ({
      label: project.title,
      desc: project.badge || company.company || 'Enterprise project',
      type: inferConceptType(`${project.title} ${project.badge || ''}`)
    }))
  );

  const candidates = [
    personal.title && {
      label: personal.title,
      desc: 'Core portfolio identity',
      type: 'core'
    },
    personal.tagline && {
      label: truncateText(personal.tagline, 48),
      desc: 'Signature AI focus',
      type: 'core'
    },
    ...techPills.map((pill) => ({
      label: pill.name,
      desc: 'Core technology lane',
      type: inferConceptType(pill.name)
    })),
    ...highlights.map((item) => ({
      label: item.title,
      desc: item.description,
      type: inferConceptType(`${item.title} ${item.description}`)
    })),
    ...flattenedSkills.slice(0, 8).map((item) => ({
      label: item.name,
      desc: `${item.level}% capability`,
      type: inferConceptType(item.name)
    })),
    ...featuredProjects,
    ...education.slice(0, 2).map((item) => ({
      label: item.degree,
      desc: item.institution,
      type: 'graph'
    }))
  ].filter(Boolean);

  const seenLabels = new Set();
  const normalizedCatalog = [];

  for (const item of candidates) {
    const cleanLabel = truncateText(item.label?.trim(), 36);
    if (!cleanLabel) continue;

    const dedupeKey = cleanLabel.toLowerCase();
    if (seenLabels.has(dedupeKey)) continue;
    seenLabels.add(dedupeKey);

    normalizedCatalog.push({
      label: cleanLabel,
      desc: truncateText(item.desc?.trim(), 56) || 'Portfolio signal',
      type: item.type || inferConceptType(`${cleanLabel} ${item.desc || ''}`)
    });

    if (normalizedCatalog.length >= MAX_NODES) break;
  }

  return normalizedCatalog.length ? normalizedCatalog : DEFAULT_CONCEPT_CATALOG;
};

const getHubContent = (profile) => {
  const personal = profile?.personal ?? {};
  return {
    initials: personal.initials || 'JBR',
    name: truncateText(personal.name || 'Jaibir Singh', 26),
    title: truncateText(personal.title || 'Forward Deployed AI Engineer', 34)
  };
};

const buildStatusLine = (item, fallback = DEFAULT_ACTIVE_CONCEPT) => {
  if (!item) return fallback;
  return `${item.label} • ${item.desc}`;
};

const hexToRgba = (hex, alpha) => {
  if (!hex || !hex.startsWith('#')) return `rgba(56, 189, 248, ${alpha})`;
  const normalized = hex.replace('#', '');
  const fullHex = normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
    : normalized;

  const int = Number.parseInt(fullHex, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const AIBackground = ({ profile }) => {
  const canvasRef = useRef(null);
  const conceptCatalog = useMemo(() => buildConceptCatalog(profile), [profile]);
  const hubContent = useMemo(() => getHubContent(profile), [profile]);
  const [activeConcept, setActiveConcept] = useState(DEFAULT_ACTIVE_CONCEPT);

  useEffect(() => {
    setActiveConcept(buildStatusLine(conceptCatalog[0], `${hubContent.name} • ${hubContent.title}`));
  }, [conceptCatalog, hubContent]);

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

    const getThemeColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      return isDark
        ? {
            bg: '#0a0c10',
            bgGlow: 'rgba(56, 189, 248, 0.08)',
            grid: 'rgba(148, 163, 184, 0.05)',
            nodeCore: '#38bdf8',
            nodeAgent: '#a855f7',
            nodeVector: '#22d3ee',
            nodeApi: '#f59e0b',
            nodeGraph: '#34d399',
            line: 'rgba(56, 189, 248, 0.08)',
            lineActive: 'rgba(34, 211, 238, 0.35)',
            hubRing: 'rgba(125, 211, 252, 0.2)',
            textMuted: '#7c8aa1',
            textHighlight: '#dbe7f5',
            packetCore: '#38bdf8',
            packetAgent: '#c084fc',
            packetVector: '#34d399',
            pillBg: 'rgba(9, 14, 25, 0.72)',
            halo: 'rgba(56, 189, 248, 0.05)'
          }
        : {
            bg: '#f8fafc',
            bgGlow: 'rgba(14, 165, 233, 0.07)',
            grid: 'rgba(14, 165, 233, 0.05)',
            nodeCore: '#0284c7',
            nodeAgent: '#7e22ce',
            nodeVector: '#0d9488',
            nodeApi: '#d97706',
            nodeGraph: '#059669',
            line: 'rgba(14, 165, 233, 0.08)',
            lineActive: 'rgba(14, 165, 233, 0.28)',
            hubRing: 'rgba(14, 165, 233, 0.16)',
            textMuted: '#64748b',
            textHighlight: '#1e293b',
            packetCore: '#0284c7',
            packetAgent: '#9333ea',
            packetVector: '#059669',
            pillBg: 'rgba(255, 255, 255, 0.8)',
            halo: 'rgba(14, 165, 233, 0.04)'
          };
    };

    const getColorForType = (type) => {
      switch (type) {
        case 'agent':
          return colors.nodeAgent;
        case 'vector':
          return colors.nodeVector;
        case 'rag':
          return colors.nodeVector;
        case 'api':
          return colors.nodeApi;
        case 'graph':
          return colors.nodeGraph;
        case 'core':
        default:
          return colors.nodeCore;
      }
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

    const drawLabelChip = (node, nodeColor) => {
      const chipHeight = 24;
      const chipWidth = Math.max(120, Math.min(node.labelWidth + 28, 230));
      const x = node.x - chipWidth / 2;
      const y = node.y + node.radius + 14;

      ctx.fillStyle = colors.pillBg;
      ctx.strokeStyle = hexToRgba(nodeColor, 0.3);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x, y, chipWidth, chipHeight, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(x + 12, y + chipHeight / 2, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = colors.textHighlight;
      ctx.font = '600 10.5px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(node.label, x + 22, y + 15);
    };

    const drawBackgroundField = () => {
      ctx.fillStyle = colors.bgGlow;
      ctx.beginPath();
      ctx.arc(width * 0.25, height * 0.2, Math.min(width, height) * 0.22, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(width * 0.76, height * 0.72, Math.min(width, height) * 0.28, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      const spacing = width < 768 ? 140 : 180;

      for (let x = (Math.sin(lastFrameTime * 0.0001) * 18); x < width + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - height * 0.16, height);
        ctx.stroke();
      }
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

      const count = Math.min(conceptCatalog.length, width < 600 ? 6 : width < 1024 ? 9 : MAX_NODES);
      const orbitBase = Math.min(width, height) * (width < 600 ? 0.26 : 0.3);
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < count; i += 1) {
        const item = conceptCatalog[i % conceptCatalog.length];
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.25;
        const orbit = orbitBase + (i % 3) * 28 + Math.random() * 26;
        const labelWidth = ctx.measureText(item.label).width;

        nodes.push({
          id: i,
          x: centerX + Math.cos(angle) * orbit,
          y: centerY + Math.sin(angle) * orbit * 0.72,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          radius: item.type === 'core' ? 15 : item.type === 'agent' ? 13 : 11,
          label: item.label,
          desc: item.desc,
          labelWidth,
          type: item.type,
          orbit,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.012 + Math.random() * 0.012
        });
      }

      neuralWaves.push({
        x: centerX,
        y: centerY,
        r: 34,
        maxR: Math.max(width, height) * 0.48,
        speed: 1.2,
        alpha: 0.18
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
      const packetColor = src.type === 'agent'
        ? colors.packetAgent
        : src.type === 'vector' || src.type === 'rag' || src.type === 'graph'
          ? colors.packetVector
          : colors.packetCore;

      queryPackets.push({
        x: src.x,
        y: src.y,
        targetX: target.x,
        targetY: target.y,
        progress: 0,
        speed: 0.006 + Math.random() * 0.008,
        color: packetColor
      });
    }

    const packetInterval = window.setInterval(() => {
      if (isScrolling || isTabHidden || prefersReducedMotion) return;
      if (queryPackets.length < 3) {
        spawnQueryPacket();
      }
    }, 2400);

    const drawHub = () => {
      const centerX = width / 2;
      const centerY = height / 2;

      drawGlowCircles(centerX, centerY, 54, colors.nodeCore, [
        { scale: 2.7, alpha: 0.05 },
        { scale: 1.9, alpha: 0.1 },
        { scale: 1.25, alpha: 0.2 }
      ]);

      ctx.strokeStyle = colors.hubRing;
      ctx.lineWidth = 1.2;
      [72, 104, 138].forEach((radius, index) => {
        ctx.globalAlpha = 0.6 - index * 0.12;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      ctx.fillStyle = colors.textHighlight;
      ctx.textAlign = 'center';
      ctx.font = '800 28px Inter, sans-serif';
      ctx.fillText(hubContent.initials, centerX, centerY - 4);

      ctx.font = '600 12px Inter, sans-serif';
      ctx.fillText(hubContent.name, centerX, centerY + 18);

      ctx.fillStyle = colors.textMuted;
      ctx.font = '500 11px Inter, sans-serif';
      ctx.fillText(hubContent.title, centerX, centerY + 36);
    };

    function draw() {
      ctx.clearRect(0, 0, width, height);
      drawBackgroundField();
      drawHub();

      for (let i = 0; i < nodes.length; i += 1) {
        const n1 = nodes[i];

        ctx.strokeStyle = colors.line;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(n1.x, n1.y);
        ctx.stroke();

        for (let j = i + 1; j < nodes.length; j += 1) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy);
          if (dist < (width < 600 ? 200 : 260)) {
            ctx.strokeStyle = colors.line;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      neuralWaves.forEach((wave) => {
        ctx.strokeStyle = colors.lineActive;
        ctx.lineWidth = 1.1;
        ctx.globalAlpha = wave.alpha;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      queryPackets.forEach((packet) => {
        const currX = packet.x + (packet.targetX - packet.x) * packet.progress;
        const currY = packet.y + (packet.targetY - packet.y) * packet.progress;

        ctx.strokeStyle = packet.color;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(currX - (packet.targetX - packet.x) * 0.05, currY - (packet.targetY - packet.y) * 0.05);
        ctx.lineTo(currX, currY);
        ctx.stroke();

        drawGlowCircles(currX, currY, 3, packet.color, [
          { scale: 3.2, alpha: 0.08 },
          { scale: 2.2, alpha: 0.16 },
          { scale: 1.4, alpha: 0.26 }
        ]);

        ctx.globalAlpha = 0.95;
        ctx.fillStyle = packet.color;
        ctx.beginPath();
        ctx.arc(currX, currY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      nodes.forEach((node) => {
        const pulseScale = 1 + Math.sin(node.pulse) * 0.1;
        const nodeColor = getColorForType(node.type);
        const isNearMouse = mouse.active && Math.hypot(mouse.x - node.x, mouse.y - node.y) < 110;

        ctx.fillStyle = colors.halo;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseScale * 2.1, 0, Math.PI * 2);
        ctx.fill();

        drawGlowCircles(node.x, node.y, node.radius * pulseScale, nodeColor, isNearMouse
          ? [
              { scale: 2.6, alpha: 0.08 },
              { scale: 1.9, alpha: 0.15 },
              { scale: 1.35, alpha: 0.22 }
            ]
          : [
              { scale: 2.2, alpha: 0.05 },
              { scale: 1.55, alpha: 0.1 }
            ]);

        ctx.fillStyle = nodeColor;

        if (node.type === 'agent') {
          ctx.beginPath();
          for (let side = 0; side < 6; side += 1) {
            const angle = (side / 6) * Math.PI * 2;
            const hexX = node.x + Math.cos(angle) * node.radius * pulseScale;
            const hexY = node.y + Math.sin(angle) * node.radius * pulseScale;
            if (side === 0) ctx.moveTo(hexX, hexY);
            else ctx.lineTo(hexX, hexY);
          }
          ctx.closePath();
          ctx.fill();
        } else if (node.type === 'vector' || node.type === 'rag' || node.type === 'graph') {
          const size = node.radius * pulseScale * 1.55;
          ctx.beginPath();
          ctx.roundRect(node.x - size / 2, node.y - size / 2, size, size, 5);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
          ctx.fill();
        }

        drawLabelChip(node, nodeColor);
      });
    }

    function update(delta) {
      const dt = Math.min(delta / 16, 1.2);

      if (prefersReducedMotion) return;

      nodes.forEach((node) => {
        node.x += node.vx * dt;
        node.y += node.vy * dt;

        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110 && dist > 0) {
            const force = (110 - dist) / 110;
            node.x += (dx / dist) * force * 1.1;
            node.y += (dy / dist) * force * 1.1;
          }
        }

        const padX = 90;
        const padY = 80;
        if (node.x < padX) {
          node.x = padX;
          node.vx *= -1;
        }
        if (node.x > width - padX) {
          node.x = width - padX;
          node.vx *= -1;
        }
        if (node.y < padY) {
          node.y = padY;
          node.vy *= -1;
        }
        if (node.y > height - padY) {
          node.y = height - padY;
          node.vy *= -1;
        }

        node.pulse += node.pulseSpeed;
      });

      neuralWaves = neuralWaves
        .map((wave) => ({
          ...wave,
          r: wave.r + wave.speed,
          alpha: Math.max(0, 0.18 * (1 - (wave.r + wave.speed) / wave.maxR))
        }))
        .filter((wave) => wave.r < wave.maxR && wave.alpha > 0);

      queryPackets = queryPackets
        .map((packet) => ({
          ...packet,
          progress: Math.min(1, packet.progress + packet.speed * dt)
        }))
        .filter((packet) => packet.progress < 1);
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

    const handleCanvasClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      neuralWaves.push({
        x: clickX,
        y: clickY,
        r: 6,
        maxR: 280,
        speed: 2.8,
        alpha: 0.24
      });

      let closestNode = null;
      let minDist = Infinity;
      nodes.forEach((node) => {
        const distance = Math.hypot(clickX - node.x, clickY - node.y);
        if (distance < minDist) {
          minDist = distance;
          closestNode = node;
        }
      });

      if (closestNode && minDist < 160) {
        setActiveConcept(buildStatusLine(closestNode));
        spawnQueryPacket();
      } else {
        setActiveConcept(`${hubContent.name} • ${hubContent.title}`);
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

    const handleMouseMove = (event) => {
      pendingMousePosition = { clientX: event.clientX, clientY: event.clientY };
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
  }, [conceptCatalog, hubContent]);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="ai-bg-canvas"
        aria-label="Interactive AI portfolio background visualizing profile-driven AI systems, agents, projects, and technical capabilities"
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
