import React, { useEffect, useMemo, useRef } from 'react';

const DEFAULT_AGENT_LABELS = ['Doc Review Agent', 'Procurement Bot', 'Portfolio Agent'];

const truncateText = (value, max = 26) => {
  if (!value) return '';
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
};

const unique = (items) => [
  ...new Set(
    items
      .filter(Boolean)
      .map((item) => String(item).trim())
      .filter(Boolean)
  )
];

const shortProjectName = (value = '') => {
  const lower = value.toLowerCase();

  if (lower.includes('portfolio monitoring')) return 'Portfolio Agent';
  if (lower.includes('procurement policy')) return 'Procurement Bot';
  if (lower.includes('compliance language')) return 'Language Screen';
  if (lower.includes('document compliance review')) return 'Doc Review Agent';
  if (lower.includes('structured approval document')) return 'Approval Doc Gen';
  if (lower.includes('internal developer portal') || lower.includes('backstage')) return 'Backstage IDP';
  if (lower.includes('global mobility')) return 'Mobility RAG';
  if (lower.includes('microsoft 365')) return 'M365 Integrator';

  return truncateText(value, 18);
};

const includesTech = (technologies, matcher) =>
  technologies.some((item) => matcher.test(String(item)));

const pickFirstMatch = (technologies, matcher, fallback) => {
  const match = technologies.find((item) => matcher.test(String(item)));
  return match ? truncateText(match, 20) : fallback;
};

const buildWorkflowSpec = (profile) => {
  const personal = profile?.personal ?? {};
  const experience = profile?.experience ?? [];
  const techPills = (personal.techPills ?? []).map((pill) => pill.name);
  const projects = experience.flatMap((item) => (item.projects ?? []).map((project) => project.title));
  const technologies = unique(
    experience.flatMap((item) =>
      (item.projects ?? []).flatMap((project) => project.technologies ?? [])
    )
  );

  const agentProjects = unique(projects.map(shortProjectName)).filter(
    (label) => label && label !== 'Backstage IDP'
  );

  const primaryAgents = [
    agentProjects[0] || DEFAULT_AGENT_LABELS[0],
    agentProjects[1] || DEFAULT_AGENT_LABELS[1],
    agentProjects[2] || DEFAULT_AGENT_LABELS[2]
  ];

  const modelLabel = includesTech(technologies, /azure openai|gpt|openai/i)
    ? 'Azure OpenAI'
    : 'LLM Core';
  const runtimeLabel = includesTech(technologies, /langgraph|stategraph/i)
    ? 'LangGraph'
    : 'Agent Runtime';
  const searchLabel = includesTech(technologies, /azure ai search|azure search|opensearch/i)
    ? 'AI Search'
    : 'Vector Search';
  const vectorLabel = includesTech(technologies, /vector|embedding|semantic/i)
    ? 'Vector Index'
    : 'Semantic Index';
  const apiLabel = includesTech(technologies, /fastapi|python/i)
    ? 'FastAPI'
    : 'API Layer';
  const memoryLabel = includesTech(technologies, /blob|sql|postgres|mongodb|cosmos/i)
    ? 'Blob + SQL'
    : 'Memory Store';
  const eventLabel = includesTech(technologies, /service bus|queue|event/i)
    ? 'Svc Bus'
    : 'Event Bus';
  const platformLabel = includesTech(technologies, /backstage/i)
    ? 'Backstage IDP'
    : pickFirstMatch(techPills, /backstage|platform/i, 'Platform Ops');
  const guardrailLabel = includesTech(technologies, /document intelligence|compliance|guardrail|aspose/i)
    ? 'Guardrails'
    : 'Policy Layer';

  const nodes = [
    { key: 'user-query', label: 'User Query', tier: 0, row: 0.18, type: 'query', alwaysLabel: true },
    { key: 'copilot-agent', label: 'Copilot Agent', tier: 0, row: 0.40, type: 'mcp', alwaysLabel: true },
    { key: 'ai-agent-ui', label: 'AI Agent UI', tier: 0, row: 0.68, type: 'mcp', alwaysLabel: true },

    { key: 'intent-router', label: 'Intent Router', tier: 1, row: 0.16, type: 'symbol', alwaysLabel: true },
    { key: 'task-planner', label: 'Task Planner', tier: 1, row: 0.34, type: 'symbol', alwaysLabel: true },
    { key: 'agent-runtime', label: runtimeLabel, tier: 1, row: 0.54, type: 'mcp', alwaysLabel: true },
    { key: 'agent-a', label: primaryAgents[0], tier: 1, row: 0.76, type: 'mcp', alwaysLabel: true },

    { key: 'llm-core', label: modelLabel, tier: 2, row: 0.18, type: 'mcp', alwaysLabel: true },
    { key: 'guardrails', label: guardrailLabel, tier: 2, row: 0.38, type: 'symbol', alwaysLabel: true },
    { key: 'tool-runner', label: 'Tool Runner', tier: 2, row: 0.58, type: 'symbol', alwaysLabel: true },
    { key: 'agent-b', label: primaryAgents[1], tier: 2, row: 0.80, type: 'mcp', alwaysLabel: true },

    { key: 'rag-pipeline', label: 'RAG Pipeline', tier: 3, row: 0.16, type: 'file', alwaysLabel: true },
    { key: 'ai-search', label: searchLabel, tier: 3, row: 0.34, type: 'file', alwaysLabel: true },
    { key: 'vector-index', label: vectorLabel, tier: 3, row: 0.52, type: 'file', alwaysLabel: true },
    { key: 'api-layer', label: apiLabel, tier: 3, row: 0.70, type: 'file', alwaysLabel: true },
    { key: 'agent-c', label: primaryAgents[2], tier: 3, row: 0.86, type: 'mcp', alwaysLabel: false, mobileHidden: true },

    { key: 'memory-store', label: memoryLabel, tier: 4, row: 0.18, type: 'file', alwaysLabel: true },
    { key: 'event-bus', label: eventLabel, tier: 4, row: 0.40, type: 'file', alwaysLabel: false, mobileHidden: true },
    { key: 'platform-ops', label: platformLabel, tier: 4, row: 0.62, type: 'mcp', alwaysLabel: true },
    { key: 'eval-trace', label: 'Eval + Trace', tier: 4, row: 0.82, type: 'symbol', alwaysLabel: true }
  ];

  const edges = [
    ['user-query', 'copilot-agent'],
    ['copilot-agent', 'intent-router'],
    ['ai-agent-ui', 'intent-router'],
    ['intent-router', 'task-planner'],
    ['task-planner', 'agent-runtime'],
    ['task-planner', 'agent-a'],
    ['task-planner', 'llm-core'],
    ['agent-runtime', 'tool-runner'],
    ['agent-a', 'tool-runner'],
    ['agent-b', 'tool-runner'],
    ['agent-c', 'tool-runner'],
    ['llm-core', 'guardrails'],
    ['guardrails', 'tool-runner'],
    ['tool-runner', 'rag-pipeline'],
    ['tool-runner', 'api-layer'],
    ['tool-runner', 'platform-ops'],
    ['rag-pipeline', 'ai-search'],
    ['ai-search', 'vector-index'],
    ['vector-index', 'memory-store'],
    ['api-layer', 'memory-store'],
    ['api-layer', 'event-bus'],
    ['platform-ops', 'eval-trace'],
    ['memory-store', 'eval-trace'],
    ['event-bus', 'eval-trace']
  ];

  return { nodes, edges };
};

const getBlendMode = () => (
  document.documentElement.getAttribute('data-theme') === 'light' ? 'multiply' : 'screen'
);

const getTierX = (isMobile) => (isMobile
  ? [0.10, 0.28, 0.48, 0.68, 0.86]
  : [0.10, 0.29, 0.48, 0.67, 0.85]);

const getNodeColor = (type) => {
  switch (type) {
    case 'query':
      return '#34d399';
    case 'mcp':
      return '#60a5fa';
    case 'symbol':
      return '#7c3aed';
    case 'file':
    default:
      return '#38bdf8';
  }
};

const AIBackground = ({ profile }) => {
  const canvasRef = useRef(null);
  const workflowSpec = useMemo(() => buildWorkflowSpec(profile), [profile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let prefersReducedMotion = reducedMotionQuery.matches;
    let animationId = 0;
    let width = 0;
    let height = 0;
    let devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    let lastTime = performance.now();
    let isTabActive = !document.hidden;
    let lastQueryTime = 0;
    let lastStarTime = 0;
    let ringRotation = 0;

    let nodes = [];
    let edges = [];
    let particles = [];
    let waves = [];
    let shootingStars = [];

    const setCanvasTheme = () => {
      canvas.style.mixBlendMode = getBlendMode();
    };

    function getResponsiveConfig() {
      const innerWidth = window.innerWidth;

      if (innerWidth < 768) {
        return {
          isMobile: true,
          showLabels: true,
          enableShield: false,
          enableParticles: true,
          enableWaves: true,
          enableShootingStars: true,
          particleLimit: 1,
          starLimit: 1,
          spring: 0.0038,
          damping: 0.965
        };
      }

      if (innerWidth < 1024) {
        return {
          isMobile: false,
          showLabels: true,
          enableShield: true,
          enableParticles: true,
          enableWaves: true,
          enableShootingStars: true,
          particleLimit: 3,
          starLimit: 2,
          spring: 0.0032,
          damping: 0.97
        };
      }

      return {
        isMobile: false,
        showLabels: true,
        enableShield: true,
        enableParticles: true,
        enableWaves: true,
        enableShootingStars: true,
        particleLimit: 6,
        starLimit: 3,
        spring: 0.0028,
        damping: 0.972
      };
    }

    function initGraph() {
      const config = getResponsiveConfig();
      const visibleNodes = workflowSpec.nodes.filter((node) => !(config.isMobile && node.mobileHidden));
      const tierX = getTierX(config.isMobile);
      const keyToId = new Map();

      nodes = visibleNodes.map((descriptor, index) => {
        const homeX = width * tierX[descriptor.tier];
        const homeY = height * descriptor.row;
        const jitterX = (Math.random() - 0.5) * (config.isMobile ? 12 : 22);
        const jitterY = (Math.random() - 0.5) * (config.isMobile ? 16 : 26);
        const radius = descriptor.type === 'mcp'
          ? (config.isMobile ? 5.8 : 6.4)
          : descriptor.type === 'query'
            ? (config.isMobile ? 5.2 : 5.8)
            : (config.isMobile ? 4.2 : 4.8);

        const node = {
          id: index,
          key: descriptor.key,
          label: descriptor.label,
          type: descriptor.type,
          x: homeX + jitterX,
          y: homeY + jitterY,
          homeX,
          homeY,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius,
          baseOpacity: descriptor.type === 'mcp' || descriptor.type === 'query'
            ? (config.isMobile ? 0.44 : 0.36)
            : (config.isMobile ? 0.3 : 0.22),
          opacity: 0,
          glow: 0,
          color: getNodeColor(descriptor.type),
          alwaysLabel: descriptor.alwaysLabel
        };

        keyToId.set(descriptor.key, node.id);
        return node;
      });

      edges = workflowSpec.edges
        .map(([fromKey, toKey]) => ({
          fromId: keyToId.get(fromKey),
          toId: keyToId.get(toKey)
        }))
        .filter((edge) => Number.isInteger(edge.fromId) && Number.isInteger(edge.toId));

      particles = [];
      waves = [];
      shootingStars = [];
    }

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      initGraph();
    }

    function drawBackgroundGlows() {
      const purpleGlow = ctx.createRadialGradient(
        width * 0.15,
        0,
        0,
        width * 0.15,
        0,
        Math.max(width, height) * 0.52
      );
      purpleGlow.addColorStop(0, 'rgba(124, 58, 237, 0.11)');
      purpleGlow.addColorStop(0.6, 'rgba(124, 58, 237, 0.02)');
      purpleGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = purpleGlow;
      ctx.fillRect(0, 0, width, height);

      const blueGlow = ctx.createRadialGradient(
        width * 0.86,
        height * 0.12,
        0,
        width * 0.86,
        height * 0.12,
        Math.max(width, height) * 0.45
      );
      blueGlow.addColorStop(0, 'rgba(37, 99, 235, 0.09)');
      blueGlow.addColorStop(0.6, 'rgba(37, 99, 235, 0.015)');
      blueGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = blueGlow;
      ctx.fillRect(0, 0, width, height);
    }

    function drawHierarchyRings(dt) {
      const config = getResponsiveConfig();
      if (!config.enableShield) return;

      ringRotation += 0.001 * dt;
      const centerX = width * 0.53;
      const centerY = height * 0.5;
      const radius = Math.min(width, height) * 0.22;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(ringRotation);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.rotate(-ringRotation * 1.35);
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.03)';
      ctx.beginPath();
      ctx.arc(0, 0, radius + 26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(148, 163, 184, 0.18)';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('QUERY → PLAN → TOOLS → RAG → TRACE', centerX, centerY + radius + 15);
      ctx.textAlign = 'left';
    }

    function drawConnections() {
      edges.forEach((edge) => {
        const source = nodes.find((node) => node.id === edge.fromId);
        const target = nodes.find((node) => node.id === edge.toId);
        if (!source || !target) return;

        const glowFactor = Math.max(source.glow, target.glow);
        const gradient = ctx.createLinearGradient(source.x, source.y, target.x, target.y);
        gradient.addColorStop(0, source.color);
        gradient.addColorStop(1, target.color);

        ctx.strokeStyle = gradient;
        ctx.globalAlpha = 0.06 + glowFactor * 0.3;
        ctx.lineWidth = glowFactor > 0.1 ? 1.2 : 0.9;
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
    }

    function updateAndDrawNodes(dt) {
      const config = getResponsiveConfig();

      nodes.forEach((node, index) => {
        node.vx += (node.homeX - node.x) * config.spring * dt;
        node.vy += (node.homeY - node.y) * config.spring * dt;
        node.vx *= config.damping;
        node.vy *= config.damping;

        const maxVelocity = config.isMobile ? 0.55 : 0.42;
        node.vx = Math.max(-maxVelocity, Math.min(maxVelocity, node.vx));
        node.vy = Math.max(-maxVelocity, Math.min(maxVelocity, node.vy));

        node.x += node.vx * dt;
        node.y += node.vy * dt;

        const margin = config.isMobile ? 16 : 22;
        if (node.x < margin) { node.x = margin; node.vx *= -0.8; }
        if (node.x > width - margin) { node.x = width - margin; node.vx *= -0.8; }
        if (node.y < margin) { node.y = margin; node.vy *= -0.8; }
        if (node.y > height - margin) { node.y = height - margin; node.vy *= -0.8; }

        if (node.glow > 0) {
          node.glow = Math.max(0, node.glow - 0.015 * dt);
        }

        node.opacity = node.baseOpacity + node.glow * 0.45;
        const drawRadius = node.radius + node.glow * 2.8;

        if (node.glow > 0.01) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, drawRadius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.globalAlpha = node.glow * 0.18;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, drawRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        const showLabel = config.showLabels && (node.alwaysLabel || (!config.isMobile && index % 2 === 0));
        if (!showLabel) return;

        ctx.fillStyle = `rgba(148, 163, 184, ${0.2 + node.glow * 0.45})`;
        ctx.font = config.isMobile
          ? (node.type === 'query' ? 'italic 8.8px sans-serif' : '8.4px monospace')
          : (node.type === 'query' ? 'italic 10px sans-serif' : '9px monospace');
        ctx.fillText(node.label, node.x + drawRadius + 6, node.y + 3);

        if (node.glow > 0.45) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${node.glow * 0.22})`;
          ctx.lineWidth = 0.45;
          ctx.strokeText(node.label, node.x + drawRadius + 6, node.y + 3);
        }
      });
    }

    function spawnQueryWave() {
      const sourceCandidates = nodes.filter((node) =>
        ['user-query', 'copilot-agent', 'intent-router', 'task-planner'].includes(node.key)
      );
      if (!sourceCandidates.length) return;

      const source = sourceCandidates[Math.floor(Math.random() * sourceCandidates.length)];
      source.glow = 1;

      waves.push({
        x: source.x,
        y: source.y,
        radius: 8,
        maxRadius: Math.max(width, height) * 0.46,
        speed: 1.8,
        opacity: 0.56,
        color: source.color,
        sourceNodeId: source.id
      });

      const outgoingEdges = edges.filter((edge) => edge.fromId === source.id).slice(0, 3);
      outgoingEdges.forEach((edge) => {
        particles.push({
          edge,
          progress: 0,
          speed: 0.01 + Math.random() * 0.007,
          color: source.color,
          size: 1.8 + Math.random() * 1.2
        });
      });
    }

    function updateAndDrawWaves(dt) {
      for (let index = waves.length - 1; index >= 0; index -= 1) {
        const wave = waves[index];
        wave.radius += wave.speed * dt;
        wave.opacity -= 0.007 * dt;

        if (wave.opacity <= 0 || wave.radius >= wave.maxRadius) {
          waves.splice(index, 1);
          continue;
        }

        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = wave.opacity * 0.24;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        nodes.forEach((node) => {
          if (node.id === wave.sourceNodeId) return;
          const distance = Math.hypot(node.x - wave.x, node.y - wave.y);
          if (Math.abs(distance - wave.radius) < 8) {
            node.glow = Math.max(node.glow, wave.opacity * 0.95);
          }
        });
      }
    }

    function updateAndDrawParticles(dt) {
      const config = getResponsiveConfig();

      if (particles.length < config.particleLimit && Math.random() < 0.025 && edges.length) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        const source = nodes.find((node) => node.id === edge.fromId);
        const target = nodes.find((node) => node.id === edge.toId);
        if (source && target) {
          particles.push({
            edge,
            progress: 0,
            speed: 0.004 + Math.random() * 0.006,
            color: Math.random() > 0.5 ? source.color : target.color,
            size: 1.4 + Math.random() * 1.3
          });
        }
      }

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.progress += particle.speed * dt;

        const source = nodes.find((node) => node.id === particle.edge.fromId);
        const target = nodes.find((node) => node.id === particle.edge.toId);
        if (!source || !target || particle.progress >= 1) {
          if (target) target.glow = Math.max(target.glow, 0.42);
          particles.splice(index, 1);
          continue;
        }

        const px = source.x + (target.x - source.x) * particle.progress;
        const py = source.y + (target.y - source.y) * particle.progress;

        ctx.beginPath();
        ctx.arc(px, py, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.16;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.72;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function spawnShootingStar() {
      const startFromRight = Math.random() > 0.5;
      const startX = startFromRight ? width + 140 : Math.random() * width * 0.35;
      const startY = Math.random() * height * 0.32;
      const speedX = startFromRight ? -(4.5 + Math.random() * 2.2) : 4 + Math.random() * 1.8;
      const speedY = 1.2 + Math.random() * 1.4;
      const color = Math.random() > 0.45 ? '#38bdf8' : '#a78bfa';

      shootingStars.push({
        x: startX,
        y: startY,
        vx: speedX,
        vy: speedY,
        length: 68 + Math.random() * 82,
        width: 1.05 + Math.random() * 1.1,
        opacity: 0.26 + Math.random() * 0.22,
        color
      });
    }

    function updateAndDrawShootingStars(dt) {
      for (let index = shootingStars.length - 1; index >= 0; index -= 1) {
        const star = shootingStars[index];
        star.x += star.vx * dt;
        star.y += star.vy * dt;
        star.opacity -= 0.0036 * dt;

        const angle = Math.atan2(star.vy, star.vx);
        const tailX = star.x - Math.cos(angle) * star.length;
        const tailY = star.y - Math.sin(angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(0.26, 'rgba(255,255,255,0.3)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.strokeStyle = gradient;
        ctx.globalAlpha = Math.max(0, star.opacity);
        ctx.lineWidth = star.width;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.width * 1.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (
          star.opacity <= 0
          || star.x < -220
          || star.x > width + 220
          || star.y > height + 200
        ) {
          shootingStars.splice(index, 1);
        }
      }
    }

    function drawStaticGraph() {
      const config = getResponsiveConfig();
      drawBackgroundGlows();
      drawHierarchyRings(1);
      drawConnections();

      nodes.forEach((node, index) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.baseOpacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        const showLabel = config.showLabels && (node.alwaysLabel || (!config.isMobile && index % 2 === 0));
        if (showLabel) {
          ctx.fillStyle = 'rgba(148, 163, 184, 0.42)';
          ctx.font = config.isMobile ? '8.4px monospace' : '9px monospace';
          ctx.fillText(node.label, node.x + node.radius + 6, node.y + 3);
        }
      });
    }

    function animate(now) {
      if (!isTabActive) {
        animationId = window.requestAnimationFrame(animate);
        return;
      }

      const deltaTime = now - lastTime;
      lastTime = now;
      const dt = Math.min(deltaTime, 35) / 16.666;
      const config = getResponsiveConfig();

      ctx.clearRect(0, 0, width, height);

      if (prefersReducedMotion) {
        drawStaticGraph();
        animationId = window.requestAnimationFrame(animate);
        return;
      }

      drawBackgroundGlows();
      drawHierarchyRings(dt);
      drawConnections();
      updateAndDrawNodes(dt);
      updateAndDrawWaves(dt);

      if (config.enableParticles) {
        updateAndDrawParticles(dt);
      }

      if (config.enableShootingStars) {
        if (shootingStars.length < config.starLimit && now - lastStarTime > 2200 + Math.random() * 2200) {
          spawnShootingStar();
          lastStarTime = now;
        }
        updateAndDrawShootingStars(dt);
      }

      if (config.enableWaves && now - lastQueryTime > 5200) {
        spawnQueryWave();
        lastQueryTime = now;
      }

      animationId = window.requestAnimationFrame(animate);
    }

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) lastTime = performance.now();
    };

    const handleReducedMotionChange = (event) => {
      prefersReducedMotion = event.matches;
      lastTime = performance.now();
    };

    const themeObserver = new MutationObserver(setCanvasTheme);

    setCanvasTheme();
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-bs-theme']
    });

    if (typeof reducedMotionQuery.addEventListener === 'function') {
      reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    } else {
      reducedMotionQuery.addListener(handleReducedMotionChange);
    }

    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      themeObserver.disconnect();
      if (typeof reducedMotionQuery.removeEventListener === 'function') {
        reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      } else {
        reducedMotionQuery.removeListener(handleReducedMotionChange);
      }
    };
  }, [workflowSpec]);

  return (
    <canvas
      ref={canvasRef}
      id="ai-bg-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default AIBackground;
