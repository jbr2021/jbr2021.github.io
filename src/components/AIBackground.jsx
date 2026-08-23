import React, { useEffect, useMemo, useRef } from 'react';

const STATIC_LABELS = {
  fileLabels: [
    'src/App.jsx',
    'src/components/Hero.jsx',
    'src/data/profile.json',
    'package.json',
    'vite.config.js',
    'public/Jaibir-Singh-Resume.pdf',
    'mcp_graph.db',
    'portfolio-index.ts'
  ],
  symbolLabels: [
    'trace_dependencies()',
    'search_symbols()',
    'Copilot Agent',
    'AI Agent',
    'Local Inference',
    'get_codebase_summary()',
    'review_agent()',
    'vector_search()'
  ],
  mcpLabels: [
    'MCP Server',
    'Copilot Agent',
    'Cursor Client',
    'AI Agent',
    'Local Inference',
    'Azure OpenAI'
  ],
  queryLabels: [
    '🔍 "ai agent projects"',
    '🔍 "rag pipeline"',
    '🔍 "azure openai"',
    '🔍 "backstage portal"',
    '🔍 "fastapi services"'
  ]
};

const truncateText = (value, max = 32) => {
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

const toKebab = (value = '') => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '') || 'item';

const toPascal = (value = '') => {
  const parts = value
    .replace(/[()]/g, '')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .slice(0, 5);

  return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('') || 'ProfileSignal';
};

const buildLabelPools = (profile) => {
  const personal = profile?.personal ?? {};
  const techPills = (personal.techPills ?? []).map((pill) => pill.name);
  const highlights = (profile?.highlights ?? []).map((item) => item.title);
  const skills = (profile?.skills ?? []).flatMap((group) => (group.items ?? []).map((item) => item.name));
  const companies = (profile?.experience ?? []).map((item) => item.company);
  const projects = (profile?.experience ?? []).flatMap((item) => (item.projects ?? []).map((project) => project.title));
  const certifications = (profile?.education ?? []).map((item) => item.degree);

  const fileSeeds = unique([
    ...STATIC_LABELS.fileLabels,
    ...projects,
    ...techPills,
    ...skills,
    ...companies,
    ...certifications
  ]).slice(0, 18);

  const symbolSeeds = unique([
    ...STATIC_LABELS.symbolLabels,
    ...highlights,
    ...skills,
    ...projects,
    ...techPills,
    personal.title
  ]).slice(0, 18);

  const mcpSeeds = unique([
    ...STATIC_LABELS.mcpLabels,
    'AI Agent',
    'Copilot Agent',
    'Cursor Agent',
    personal.title,
    ...companies.slice(0, 3),
    ...techPills.slice(0, 4),
    ...certifications.slice(0, 2)
  ]).slice(0, 12);

  const querySeeds = unique([
    ...STATIC_LABELS.queryLabels,
    ...projects,
    ...highlights,
    ...techPills,
    ...skills.slice(0, 6)
  ]).slice(0, 14);

  const folders = ['projects', 'skills', 'experience', 'platform', 'cloud', 'search', 'agents', 'portfolio'];
  const extensions = ['.jsx', '.ts', '.md', '.yaml', '.json', '.py', '.tsx'];
  const verbs = ['build', 'deploy', 'optimize', 'orchestrate', 'review', 'analyze', 'design', 'index', 'compose'];

  const fileLabels = unique(fileSeeds.map((text, index) => {
    if (String(text).includes('/') || String(text).includes('.')) {
      return truncateText(String(text), 34);
    }
    return `${folders[index % folders.length]}/${toKebab(truncateText(String(text), 26))}${extensions[index % extensions.length]}`;
  }));

  const symbolLabels = unique(symbolSeeds.map((text, index) => {
    if (/\(|\)|Agent|OpenAI|Cursor|Copilot|Inference/i.test(String(text))) {
      return truncateText(String(text), 30);
    }
    return `${verbs[index % verbs.length]}${toPascal(truncateText(String(text), 28))}()`;
  }));

  const mcpLabels = unique(mcpSeeds.map((text) => truncateText(String(text), 28)));
  const queryLabels = unique(querySeeds.map((text) => {
    const clean = truncateText(String(text).toLowerCase(), 24);
    return clean.startsWith('🔍') ? clean : `🔍 "${clean}"`;
  }));

  return {
    fileLabels: fileLabels.length ? fileLabels : STATIC_LABELS.fileLabels,
    symbolLabels: symbolLabels.length ? symbolLabels : STATIC_LABELS.symbolLabels,
    mcpLabels: mcpLabels.length ? mcpLabels : STATIC_LABELS.mcpLabels,
    queryLabels: queryLabels.length ? queryLabels : STATIC_LABELS.queryLabels
  };
};

const getBlendMode = () => (
  document.documentElement.getAttribute('data-theme') === 'light' ? 'multiply' : 'screen'
);

const AIBackground = ({ profile }) => {
  const canvasRef = useRef(null);
  const labelPools = useMemo(() => buildLabelPools(profile), [profile]);

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
    let shieldRotation = 0;

    let nodes = [];
    let waves = [];
    let particles = [];
    let shootingStars = [];

    const { fileLabels, symbolLabels, mcpLabels, queryLabels } = labelPools;

    const setCanvasTheme = () => {
      canvas.style.mixBlendMode = getBlendMode();
    };

    function getResponsiveConfig() {
      const innerWidth = window.innerWidth;

      if (innerWidth < 768) {
        return {
          nodeCount: 14,
          connectionDistance: 100,
          showLabels: false,
          labelModulo: 5,
          enableParticles: false,
          enableWaves: false,
          enableShield: false,
          enableShootingStars: false,
          particleLimit: 0,
          starLimit: 0
        };
      }

      if (innerWidth < 1024) {
        return {
          nodeCount: 24,
          connectionDistance: 130,
          showLabels: true,
          labelModulo: 3,
          enableParticles: true,
          enableWaves: true,
          enableShield: true,
          enableShootingStars: true,
          particleLimit: 3,
          starLimit: 2
        };
      }

      return {
        nodeCount: 38,
        connectionDistance: 180,
        showLabels: true,
        labelModulo: 2,
        enableParticles: true,
        enableWaves: true,
        enableShield: true,
        enableShootingStars: true,
        particleLimit: 7,
        starLimit: 3
      };
    }

    function initNodes() {
      const config = getResponsiveConfig();
      nodes = [];
      waves = [];
      particles = [];
      shootingStars = [];

      for (let i = 0; i < config.nodeCount; i += 1) {
        let type = 'file';
        let label = '';
        let color = '#38bdf8';

        if (i === 0 && config.enableShield) {
          type = 'mcp';
          label = mcpLabels[0] || 'MCP Server';
          color = '#a78bfa';
        } else if (i === 1 && config.enableWaves) {
          type = 'query';
          label = queryLabels[Math.floor(Math.random() * queryLabels.length)] || '🔍 "ai agent"';
          color = '#34d399';
        } else {
          const random = Math.random();
          if (random < 0.45) {
            type = 'file';
            label = fileLabels[Math.floor(Math.random() * fileLabels.length)] || 'src/App.jsx';
            color = '#38bdf8';
          } else if (random < 0.8) {
            type = 'symbol';
            label = symbolLabels[Math.floor(Math.random() * symbolLabels.length)] || 'Copilot Agent';
            color = '#7c3aed';
          } else if (random < 0.9) {
            type = 'mcp';
            label = mcpLabels[Math.floor(Math.random() * mcpLabels.length)] || 'AI Agent';
            color = '#60a5fa';
          } else {
            type = 'query';
            label = queryLabels[Math.floor(Math.random() * queryLabels.length)] || '🔍 "azure openai"';
            color = '#34d399';
          }
        }

        const radius = type === 'mcp' ? 6 : type === 'query' ? 5 : 4;
        const baseOpacity = type === 'mcp' || type === 'query' ? 0.35 : 0.2;
        const x = Math.random() * (width - 100) + 50;
        const y = Math.random() * (height - 100) + 50;
        const maxSpeed = type === 'mcp' ? 0.08 : 0.15;

        nodes.push({
          id: i,
          x,
          y,
          vx: (Math.random() - 0.5) * maxSpeed,
          vy: (Math.random() - 0.5) * maxSpeed,
          radius,
          label,
          type,
          baseOpacity,
          opacity: baseOpacity,
          glow: 0,
          color
        });
      }
    }

    function triggerSemanticQuery() {
      const config = getResponsiveConfig();
      if (!config.enableWaves) return;

      const sourceNodes = nodes.filter((node) => node.type === 'query' || node.type === 'mcp');
      if (!sourceNodes.length) return;

      const source = sourceNodes[Math.floor(Math.random() * sourceNodes.length)];
      if (source.type === 'query') {
        source.label = queryLabels[Math.floor(Math.random() * queryLabels.length)] || source.label;
      }

      waves.push({
        x: source.x,
        y: source.y,
        radius: 10,
        maxRadius: Math.max(width, height) * 0.45,
        speed: 1.8,
        opacity: 0.6,
        color: source.color,
        sourceNodeId: source.id
      });

      source.glow = 1;

      if (config.enableParticles) {
        const potentialTargets = nodes.filter((node) => node.id !== source.id && node.type !== 'query');
        const numTargets = Math.min(3, potentialTargets.length);

        for (let index = 0; index < numTargets; index += 1) {
          const target = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
          if (!target) continue;
          particles.push({
            fromNodeId: source.id,
            toNodeId: target.id,
            progress: 0,
            speed: 0.008 + Math.random() * 0.008,
            color: source.color,
            size: 2 + Math.random() * 1.5
          });
        }
      }
    }

    function spawnShootingStar() {
      const startFromRight = Math.random() > 0.5;
      const startX = startFromRight ? width + 120 : Math.random() * width * 0.4;
      const startY = Math.random() * height * 0.35;
      const speedX = startFromRight ? -(4.5 + Math.random() * 2.2) : 4 + Math.random() * 2;
      const speedY = 1.4 + Math.random() * 1.4;
      const color = Math.random() > 0.45 ? '#38bdf8' : '#a78bfa';

      shootingStars.push({
        x: startX,
        y: startY,
        vx: speedX,
        vy: speedY,
        length: 70 + Math.random() * 75,
        width: 1.1 + Math.random() * 1.1,
        opacity: 0.28 + Math.random() * 0.22,
        color
      });
    }

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      initNodes();
    }

    function drawBackgroundGlows() {
      const gradientOne = ctx.createRadialGradient(
        width * 0.15,
        0,
        0,
        width * 0.15,
        0,
        Math.max(width, height) * 0.5
      );
      gradientOne.addColorStop(0, 'rgba(124, 58, 237, 0.11)');
      gradientOne.addColorStop(0.6, 'rgba(124, 58, 237, 0.02)');
      gradientOne.addColorStop(1, 'transparent');
      ctx.fillStyle = gradientOne;
      ctx.fillRect(0, 0, width, height);

      const gradientTwo = ctx.createRadialGradient(
        width * 0.85,
        height * 0.1,
        0,
        width * 0.85,
        height * 0.1,
        Math.max(width, height) * 0.45
      );
      gradientTwo.addColorStop(0, 'rgba(37, 99, 235, 0.09)');
      gradientTwo.addColorStop(0.6, 'rgba(37, 99, 235, 0.015)');
      gradientTwo.addColorStop(1, 'transparent');
      ctx.fillStyle = gradientTwo;
      ctx.fillRect(0, 0, width, height);
    }

    function drawPrivacyShield(dt) {
      shieldRotation += 0.001 * dt;
      const centerX = width * 0.55;
      const centerY = height * 0.5;
      const radius = Math.min(width, height) * 0.22;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(shieldRotation);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.rotate(-shieldRotation * 1.5);
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.03)';
      ctx.beginPath();
      ctx.arc(0, 0, radius + 25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      if (width > 768) {
        ctx.fillStyle = 'rgba(148, 163, 184, 0.18)';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('COPILOT AGENT · AI AGENT · LOCAL PROFILE GRAPH', centerX, centerY + radius + 15);
        ctx.textAlign = 'left';
      }
    }

    function updateAndDrawNodes(dt, config) {
      nodes.forEach((node, index) => {
        node.x += node.vx * dt;
        node.y += node.vy * dt;

        const margin = 20;
        if (node.x < margin) {
          node.x = margin;
          node.vx *= -1;
        }
        if (node.x > width - margin) {
          node.x = width - margin;
          node.vx *= -1;
        }
        if (node.y < margin) {
          node.y = margin;
          node.vy *= -1;
        }
        if (node.y > height - margin) {
          node.y = height - margin;
          node.vy *= -1;
        }

        if (node.glow > 0) {
          node.glow -= 0.015 * dt;
          if (node.glow < 0) node.glow = 0;
        }

        node.opacity = node.baseOpacity + node.glow * 0.45;
        const drawRadius = node.radius + node.glow * 3;

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

        const showLabel = config.showLabels
          && node.label
          && (node.type === 'mcp' || node.type === 'query' || index % config.labelModulo === 0);

        if (showLabel) {
          const textAlpha = 0.18 + node.glow * 0.45;
          ctx.fillStyle = `rgba(148, 163, 184, ${textAlpha})`;
          ctx.font = node.type === 'query' ? 'italic 10px sans-serif' : '9px monospace';
          ctx.fillText(node.label, node.x + drawRadius + 6, node.y + 3);

          if (node.glow > 0.4) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${node.glow * 0.25})`;
            ctx.lineWidth = 0.5;
            ctx.strokeText(node.label, node.x + drawRadius + 6, node.y + 3);
          }
        }
      });
    }

    function drawConnections(config) {
      for (let i = 0; i < nodes.length; i += 1) {
        const source = nodes[i];
        let connectionCount = 0;

        for (let j = i + 1; j < nodes.length; j += 1) {
          if (connectionCount >= (config.nodeCount > 25 ? 3 : 2)) break;

          const target = nodes[j];
          const distance = Math.hypot(source.x - target.x, source.y - target.y);
          if (distance >= config.connectionDistance) continue;

          const glowFactor = Math.max(source.glow, target.glow);
          const lineOpacity = 0.05 + glowFactor * 0.25;

          if (glowFactor > 0.1) {
            const gradient = ctx.createLinearGradient(source.x, source.y, target.x, target.y);
            gradient.addColorStop(0, source.glow > 0.1 ? source.color : 'rgba(42, 55, 87, 0.05)');
            gradient.addColorStop(1, target.glow > 0.1 ? target.color : 'rgba(42, 55, 87, 0.05)');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.2;
          } else {
            ctx.strokeStyle = `rgba(42, 55, 87, ${lineOpacity})`;
            ctx.lineWidth = 0.85;
          }

          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
          connectionCount += 1;
        }
      }
    }

    function updateAndDrawWaves(dt) {
      for (let index = waves.length - 1; index >= 0; index -= 1) {
        const wave = waves[index];
        wave.radius += wave.speed * dt;
        wave.opacity -= 0.0075 * dt;

        if (wave.opacity <= 0 || wave.radius >= wave.maxRadius) {
          waves.splice(index, 1);
          continue;
        }

        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = wave.opacity * 0.25;
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

    function updateAndDrawParticles(dt, config) {
      if (particles.length < config.particleLimit && Math.random() < 0.02) {
        const fromIndex = Math.floor(Math.random() * nodes.length);
        const fromNode = nodes[fromIndex];
        const targets = nodes.filter((node, index) => {
          if (index === fromIndex) return false;
          const distance = Math.hypot(node.x - fromNode.x, node.y - fromNode.y);
          return distance < config.connectionDistance * 1.5;
        });

        if (targets.length) {
          const target = targets[Math.floor(Math.random() * targets.length)];
          particles.push({
            fromNodeId: fromNode.id,
            toNodeId: target.id,
            progress: 0,
            speed: 0.003 + Math.random() * 0.005,
            color: Math.random() > 0.5 ? fromNode.color : target.color,
            size: 1.5 + Math.random() * 1.5
          });
        }
      }

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.progress += particle.speed * dt;

        const source = nodes.find((node) => node.id === particle.fromNodeId);
        const target = nodes.find((node) => node.id === particle.toNodeId);

        if (!source || !target || particle.progress >= 1) {
          if (target) {
            target.glow = Math.max(target.glow, 0.45);
          }
          particles.splice(index, 1);
          continue;
        }

        const px = source.x + (target.x - source.x) * particle.progress;
        const py = source.y + (target.y - source.y) * particle.progress;

        ctx.beginPath();
        ctx.arc(px, py, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.18;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function updateAndDrawShootingStars(dt) {
      for (let index = shootingStars.length - 1; index >= 0; index -= 1) {
        const star = shootingStars[index];
        star.x += star.vx * dt;
        star.y += star.vy * dt;
        star.opacity -= 0.0035 * dt;

        const angle = Math.atan2(star.vy, star.vx);
        const tailX = star.x - Math.cos(angle) * star.length;
        const tailY = star.y - Math.sin(angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(0.28, 'rgba(255,255,255,0.32)');
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
        ctx.arc(star.x, star.y, star.width * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (
          star.opacity <= 0
          || star.x < -200
          || star.x > width + 200
          || star.y > height + 200
        ) {
          shootingStars.splice(index, 1);
        }
      }
    }

    function drawStaticGraph(config) {
      drawBackgroundGlows();
      if (config.enableShield) {
        drawPrivacyShield(1);
      }

      ctx.strokeStyle = 'rgba(42, 55, 87, 0.12)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        const source = nodes[i];
        let connectionCount = 0;
        for (let j = i + 1; j < nodes.length; j += 1) {
          if (connectionCount > 2) break;
          const target = nodes[j];
          const distance = Math.hypot(source.x - target.x, source.y - target.y);
          if (distance < config.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
            connectionCount += 1;
          }
        }
      }

      nodes.forEach((node, index) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.baseOpacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (config.showLabels && (node.type === 'mcp' || node.type === 'query' || index % 3 === 0)) {
          ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
          ctx.font = '9px monospace';
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

      ctx.clearRect(0, 0, width, height);
      const config = getResponsiveConfig();

      if (prefersReducedMotion) {
        drawStaticGraph(config);
        return;
      }

      drawBackgroundGlows();

      if (config.enableShield) {
        drawPrivacyShield(dt);
      }

      updateAndDrawNodes(dt, config);
      drawConnections(config);
      updateAndDrawWaves(dt);

      if (config.enableParticles) {
        updateAndDrawParticles(dt, config);
      }

      if (config.enableShootingStars) {
        if (shootingStars.length < config.starLimit && now - lastStarTime > 2200 + Math.random() * 2600) {
          spawnShootingStar();
          lastStarTime = now;
        }
        updateAndDrawShootingStars(dt);
      }

      if (config.enableWaves && now - lastQueryTime > 6000) {
        triggerSemanticQuery();
        lastQueryTime = now;
      }

      animationId = window.requestAnimationFrame(animate);
    }

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        lastTime = performance.now();
      }
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
  }, [labelPools]);

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
