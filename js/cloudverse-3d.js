/* ==========================================================================
   CLOUDVERSE 3D WEBGL ENGINE // THREE.JS
   Interactive Floating Islands, Stardust, Nebula & Data Bridges
   ========================================================================== */

(function () {
  'use strict';

  // Check WebGL availability
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  const canvasContainer = document.getElementById('cloudverse-canvas');
  if (!canvasContainer || !window.THREE || !isWebGLAvailable()) {
    console.info('Cloudverse: Utilizing optimized 2.5D CSS parallax mode.');
    if (canvasContainer) canvasContainer.classList.add('canvas-fallback');
    return;
  }

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scene Setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030712, 0.018);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 28);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasContainer,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x0B1630, 1.8);
  scene.add(ambientLight);

  const primaryLight = new THREE.PointLight(0x00A3FF, 2.5, 100);
  primaryLight.position.set(0, 15, 20);
  scene.add(primaryLight);

  const cyanLight = new THREE.PointLight(0x00F5FF, 2.0, 80);
  cyanLight.position.set(-20, 5, 10);
  scene.add(cyanLight);

  const violetLight = new THREE.PointLight(0x7C3AED, 2.2, 80);
  violetLight.position.set(20, -10, 10);
  scene.add(violetLight);

  // 1. STARFIELD PARTICLES
  const starsCount = prefersReducedMotion ? 400 : 1200;
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starsCount * 3);
  const starColors = new Float32Array(starsCount * 3);

  const palette = [
    new THREE.Color(0x00F5FF), // Cyan
    new THREE.Color(0x0078D4), // Azure
    new THREE.Color(0xA78BFA), // Violet
    new THREE.Color(0xFFFFFF)  // White highlight
  ];

  for (let i = 0; i < starsCount; i++) {
    const i3 = i * 3;
    starPositions[i3] = (Math.random() - 0.5) * 160;
    starPositions[i3 + 1] = (Math.random() - 0.5) * 120;
    starPositions[i3 + 2] = (Math.random() - 0.5) * 140 - 20;

    const col = palette[Math.floor(Math.random() * palette.length)];
    starColors[i3] = col.r;
    starColors[i3 + 1] = col.g;
    starColors[i3 + 2] = col.b;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMaterial = new THREE.PointsMaterial({
    size: 0.85,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });

  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);

  // 2. CENTRAL CLOUDVERSE CITADEL CORE
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // Central floating reactor core
  const coreGeo = new THREE.IcosahedronGeometry(2.8, 1);
  const coreMat = new THREE.MeshPhongMaterial({
    color: 0x0078D4,
    emissive: 0x00F5FF,
    emissiveIntensity: 0.35,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreGroup.add(coreMesh);

  // Inner solid core
  const innerGeo = new THREE.SphereGeometry(1.6, 16, 16);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x00F5FF,
    wireframe: false,
    transparent: true,
    opacity: 0.25
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  coreGroup.add(innerMesh);

  // Orbital Azure Rings
  const ringGeo1 = new THREE.TorusGeometry(4.8, 0.05, 8, 48);
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00F5FF, transparent: true, opacity: 0.6 });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  ring1.rotation.x = Math.PI / 3;
  coreGroup.add(ring1);

  const ringGeo2 = new THREE.TorusGeometry(6.2, 0.04, 8, 48);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x7C3AED, transparent: true, opacity: 0.5 });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.y = Math.PI / 4;
  coreGroup.add(ring2);

  // 3. FLOATING ISLANDS
  const islandConfigs = [
    { id: 'about', name: 'About HQ', pos: [-16, 6, -10], color: 0x00A3FF, size: 2.2 },
    { id: 'skills', name: 'Skills Citadel', pos: [16, 7, -12], color: 0x00F5FF, size: 2.4 },
    { id: 'projects', name: 'Projects Hangar', pos: [-14, -7, -14], color: 0x38BDF8, size: 2.6 },
    { id: 'certs', name: 'Certifications Vault', pos: [15, -6, -14], color: 0x7C3AED, size: 2.2 },
    { id: 'journey', name: 'Chrono Pathway', pos: [0, -13, -18], color: 0xA78BFA, size: 2.5 },
    { id: 'contact', name: 'Communications Deck', pos: [0, 14, -16], color: 0x10B981, size: 2.1 }
  ];

  const islandMeshes = [];
  const bridgeLines = [];

  islandConfigs.forEach((cfg) => {
    const islandGroup = new THREE.Group();
    islandGroup.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);

    // Base island hexagonal cylinder
    const baseGeo = new THREE.CylinderGeometry(cfg.size, cfg.size * 0.7, 1.2, 6);
    const baseMat = new THREE.MeshPhongMaterial({
      color: 0x071329,
      emissive: cfg.color,
      emissiveIntensity: 0.2,
      flatShading: true,
      shininess: 40
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    islandGroup.add(baseMesh);

    // Glowing rim
    const rimGeo = new THREE.TorusGeometry(cfg.size * 1.05, 0.05, 6, 6);
    const rimMat = new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.8 });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.6;
    islandGroup.add(rimMesh);

    // Floating Hologram beacon above island
    const beaconGeo = new THREE.OctahedronGeometry(cfg.size * 0.45, 0);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: cfg.color,
      wireframe: true,
      transparent: true,
      opacity: 0.9
    });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 1.8;
    islandGroup.add(beaconMesh);

    islandGroup.userData = { id: cfg.id, name: cfg.name, beacon: beaconMesh, initialY: cfg.pos[1] };
    scene.add(islandGroup);
    islandMeshes.push(islandGroup);

    // CYBER-BRIDGE DATA STREAM
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(cfg.pos[0] * 0.5, (cfg.pos[1] + 2) * 0.5, cfg.pos[2] * 0.5),
      new THREE.Vector3(cfg.pos[0], cfg.pos[1], cfg.pos[2])
    ]);

    const points = curve.getPoints(30);
    const bridgeGeo = new THREE.BufferGeometry().setFromPoints(points);
    const bridgeMat = new THREE.LineBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const bridgeLine = new THREE.Line(bridgeGeo, bridgeMat);
    scene.add(bridgeLine);
    bridgeLines.push(bridgeLine);
  });

  // 4. MOUSE INTERACTION & PARALLAX
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
  }, { passive: true });

  // Smooth Camera Fly-To function for Island focus
  let targetCamPos = new THREE.Vector3(0, 2, 28);
  let isFlying = false;

  window.flyToCloudverseIsland = function (islandId) {
    const targetIsland = islandMeshes.find((item) => item.userData.id === islandId);
    if (!targetIsland) {
      targetCamPos.set(0, 2, 28);
      return;
    }
    const pos = targetIsland.position;
    // Position camera slightly offset to frame the island beautifully
    targetCamPos.set(pos.x * 0.6, pos.y * 0.6 + 1.5, pos.z + 14);
    isFlying = true;
  };

  // Reset Camera View
  window.resetCloudverseCamera = function () {
    targetCamPos.set(0, 2, 28);
    isFlying = true;
  };

  // 5. ANIMATION LOOP
  let clock = new THREE.Clock();
  let animationFrameId = null;
  let isTabVisible = true;

  document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
    if (isTabVisible && !animationFrameId) {
      clock.start();
      animate();
    }
  });

  function animate() {
    if (!isTabVisible) {
      animationFrameId = null;
      return;
    }

    animationFrameId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      // Rotate central core
      coreMesh.rotation.y = elapsedTime * 0.15;
      coreMesh.rotation.x = elapsedTime * 0.1;
      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.15;

      // Float islands with sine wave offsets
      islandMeshes.forEach((island, idx) => {
        const floatOffset = Math.sin(elapsedTime * 1.2 + idx) * 0.45;
        island.position.y = island.userData.initialY + floatOffset;
        if (island.userData.beacon) {
          island.userData.beacon.rotation.y = elapsedTime * 0.8;
          island.userData.beacon.rotation.x = elapsedTime * 0.4;
        }
      });

      // Drift starfield slowly
      starField.rotation.y = elapsedTime * 0.02;

      // Parallax mouse damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x += (targetCamPos.x + targetX * 12 - camera.position.x) * 0.05;
      camera.position.y += (targetCamPos.y - targetY * 12 - camera.position.y) * 0.05;
      camera.position.z += (targetCamPos.z - camera.position.z) * 0.05;

      camera.lookAt(targetX * 5, targetY * 5, 0);
    }

    renderer.render(scene, camera);
  }

  animate();

  // Resize Handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Export engine hook
  window.CloudverseEngine = {
    flyTo: window.flyToCloudverseIsland,
    reset: window.resetCloudverseCamera,
    scene: scene,
    camera: camera
  };

  console.log('%cCloudverse 3D Engine Active // High Performance WebGL Initialized 🚀', 'color:#00F5FF; font-weight:bold;');
})();
