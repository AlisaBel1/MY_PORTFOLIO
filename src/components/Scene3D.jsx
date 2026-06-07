import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Scene3D.css';

// Code rain characters — mix of real code symbols + matrix-style
const CHARS = '01アイウエオカキクケコ{}[]()<>/\\;:=+*&|!?#@~^%$ABCDEFabcdef'.split('');
const CODE_SNIPPETS = [
  'const fetch = async()',
  'useState(null)',
  'npm run build',
  'git push origin',
  'import * as THREE',
  'docker compose up',
  '.then(res => res)',
  'SELECT * FROM',
  'ssh-keygen -t rsa',
  'kubectl apply -f',
  'def train_model():',
  'public class Main',
  '@RestController',
  'useEffect(() => {',
];

export default function Scene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 22);

    // ── Fog ──
    scene.fog = new THREE.FogExp2(0x050508, 0.038);

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0xa88dff, 0.3));
    const pt1 = new THREE.PointLight(0xa88dff, 8, 30);
    pt1.position.set(0, 0, 5);
    scene.add(pt1);
    const pt2 = new THREE.PointLight(0x5fffd4, 5, 25);
    pt2.position.set(-8, 4, 0);
    scene.add(pt2);
    const pt3 = new THREE.PointLight(0xff7eb3, 3, 20);
    pt3.position.set(8, -4, -5);
    scene.add(pt3);

    // ── Canvas texture helper ──
    const makeTextTexture = (text, color = '#a88dff', size = 256, fontSize = 18) => {
      const canvas = document.createElement('canvas');
      canvas.width = size; canvas.height = 48;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, size, 48);
      ctx.font = `${fontSize}px "DM Mono", monospace`;
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.85;
      ctx.fillText(text, 8, 32);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    // ── Floating code snippet planes ──
    const snippetMeshes = [];
    CODE_SNIPPETS.forEach((snippet, i) => {
      const tex = makeTextTexture(
        snippet,
        i % 3 === 0 ? '#a88dff' : i % 3 === 1 ? '#5fffd4' : '#ff7eb3',
        400, 16
      );
      const geo = new THREE.PlaneGeometry(4.5, 0.5);
      const mat = new THREE.MeshBasicMaterial({
        map: tex, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false
      });
      const mesh = new THREE.Mesh(geo, mat);
      // Spread them in a loose grid around the scene
      const angle = (i / CODE_SNIPPETS.length) * Math.PI * 2;
      const radius = 6 + Math.random() * 5;
      mesh.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10 - 3
      );
      mesh.rotation.y = -angle + Math.PI * 0.1;
      mesh.rotation.z = (Math.random() - 0.5) * 0.15;
      mesh.userData = {
        baseY: mesh.position.y,
        speed: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        targetOpacity: 0.25 + Math.random() * 0.45,
      };
      scene.add(mesh);
      snippetMeshes.push(mesh);
    });

    // ── Rain column system ──
    const COLS = 28;
    const rainColumns = [];

    const makeRainColumn = () => {
      const charCount = 8 + Math.floor(Math.random() * 12);
      const canvas = document.createElement('canvas');
      canvas.width = 32; canvas.height = charCount * 22;
      const ctx = canvas.getContext('2d');

      const colors = ['#a88dff', '#5fffd4', '#ff7eb3', '#ffffff'];
      const col = colors[Math.floor(Math.random() * colors.length)];

      // Draw characters — brightest at bottom, fading up
      for (let j = 0; j < charCount; j++) {
        const alpha = j / charCount;
        ctx.globalAlpha = alpha * 0.9 + 0.05;
        ctx.fillStyle = j === charCount - 1 ? '#ffffff' : col;
        ctx.font = `bold ${14 + Math.random() * 4}px "DM Mono", monospace`;
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, 6, (j + 1) * 22);
      }

      const tex = new THREE.CanvasTexture(canvas);
      const geo = new THREE.PlaneGeometry(0.3, charCount * 0.22);
      const mat = new THREE.MeshBasicMaterial({
        map: tex, transparent: true, opacity: 0.7 + Math.random() * 0.3,
        side: THREE.DoubleSide, depthWrite: false
      });
      const mesh = new THREE.Mesh(geo, mat);

      const xSpread = 22, zMin = -14, zRange = 12;
      mesh.position.set(
        (Math.random() - 0.5) * xSpread,
        15 + Math.random() * 20,
        zMin + Math.random() * zRange
      );
      mesh.rotation.y = (Math.random() - 0.5) * 0.3;
      mesh.userData = {
        speed: 1.5 + Math.random() * 3.5,
        resetY: 15 + Math.random() * 20,
        charCount,
      };
      scene.add(mesh);
      return mesh;
    };

    for (let i = 0; i < COLS; i++) {
      const mesh = makeRainColumn();
      // stagger start positions
      mesh.position.y = (Math.random() - 0.5) * 35;
      rainColumns.push(mesh);
    }

    // ── Central glowing core — icosahedron wireframe ──
    const coreGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0020,
      emissive: 0xa88dff,
      emissiveIntensity: 0.12,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.6,
      thickness: 1.2,
      transparent: true,
      opacity: 0.7,
      wireframe: false,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Wireframe shell
    const wireGeo = new THREE.IcosahedronGeometry(1.85, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa88dff, wireframe: true, transparent: true, opacity: 0.25
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wire);

    // Outer ring
    const outerGeo = new THREE.IcosahedronGeometry(2.3, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x5fffd4, wireframe: true, transparent: true, opacity: 0.07
    });
    scene.add(new THREE.Mesh(outerGeo, outerMat));

    // ── Orbiting data nodes ──
    const nodeData = [
      { color: 0xa88dff, r: 3.2, speed: 0.5, phase: 0,   tilt: 0.4,  size: 0.12 },
      { color: 0x5fffd4, r: 4.0, speed: 0.3, phase: 2.1, tilt: -0.6, size: 0.09 },
      { color: 0xff7eb3, r: 3.6, speed: 0.7, phase: 4.2, tilt: 0.8,  size: 0.07 },
      { color: 0xffffff, r: 2.8, speed: 1.1, phase: 1.0, tilt: -0.3, size: 0.05 },
    ];
    const nodes = nodeData.map(d => {
      const geo = new THREE.SphereGeometry(d.size, 12, 12);
      const mat = new THREE.MeshBasicMaterial({ color: d.color });
      const mesh = new THREE.Mesh(geo, mat);
      // Trailing line (orbit ring segment)
      const ringGeo = new THREE.TorusGeometry(d.r, 0.004, 4, 80);
      const ringMat = new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.12 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + d.tilt;
      ring.rotation.z = d.phase * 0.1;
      scene.add(ring);
      scene.add(mesh);
      return { mesh, ring, ...d };
    });

    // ── Particle field (background depth) ──
    const pCount = 1200;
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    const pal = [new THREE.Color(0xa88dff), new THREE.Color(0x5fffd4), new THREE.Color(0x334), new THREE.Color(0x223)];
    for (let i = 0; i < pCount; i++) {
      pPos[i*3]   = (Math.random()-0.5)*40;
      pPos[i*3+1] = (Math.random()-0.5)*30;
      pPos[i*3+2] = (Math.random()-0.5)*30 - 8;
      const c = pal[Math.floor(Math.random()*pal.length)];
      pCol[i*3]=c.r; pCol[i*3+1]=c.g; pCol[i*3+2]=c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos,3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol,3));
    const pMat = new THREE.PointsMaterial({ size:0.06, vertexColors:true, transparent:true, opacity:0.6 });
    scene.add(new THREE.Points(pGeo, pMat));

    // ── Mouse ──
    const mouse = { x: 0, y: 0 };
    const onMouse = e => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ──
    const clock = new THREE.Clock();
    let alive = true;

    const tick = () => {
      if (!alive) return;
      const t = clock.getElapsedTime();
      const dt = clock.getDelta ? 0.016 : 0.016;

      // Camera follow mouse
      camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Rain falls
      rainColumns.forEach(m => {
        m.position.y -= m.userData.speed * 0.04;
        if (m.position.y < -18) {
          m.position.y = m.userData.resetY;
        }
      });

      // Snippet planes float + fade in
      snippetMeshes.forEach(m => {
        m.position.y = m.userData.baseY + Math.sin(t * m.userData.speed + m.userData.phase) * 0.4;
        // Face camera loosely
        m.rotation.y += (Math.atan2(camera.position.x - m.position.x, camera.position.z - m.position.z) - m.rotation.y) * 0.02;
        // Fade in
        if (m.material.opacity < m.userData.targetOpacity) {
          m.material.opacity = Math.min(m.material.opacity + 0.003, m.userData.targetOpacity);
        }
      });

      // Core spin
      core.rotation.y = t * 0.18;
      core.rotation.x = t * 0.09;
      wire.rotation.y = -t * 0.12;
      wire.rotation.x = t * 0.06;

      // Nodes orbit
      nodes.forEach(n => {
        const angle = t * n.speed + n.phase;
        n.mesh.position.x = Math.cos(angle) * n.r;
        n.mesh.position.z = Math.sin(angle) * n.r * 0.6;
        n.mesh.position.y = Math.sin(angle * 0.5 + n.tilt) * 1.2;
      });

      // Point light orbit
      pt1.position.x = Math.cos(t * 0.4) * 4;
      pt1.position.z = Math.sin(t * 0.4) * 4;
      pt2.position.x = Math.cos(t * 0.25 + 2) * 6;
      pt2.position.z = Math.sin(t * 0.25 + 2) * 5;

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();

    return () => {
      alive = false;
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width:'100%', height:'100%' }} />;
}
