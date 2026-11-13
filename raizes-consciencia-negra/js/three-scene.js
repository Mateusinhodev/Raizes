import * as THREE from 'three';

const canvas = document.querySelector('#cultureCanvas');
const loading = document.querySelector('#threeLoading');
const titleLabel = document.querySelector('#objectTitle');
const heading = document.querySelector('#objectHeading');
const description = document.querySelector('#objectDescription');

if (canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (erro) {
    if (loading) loading.textContent = 'Seu navegador não disponibilizou o recurso 3D. Você ainda pode explorar as imagens abaixo.';
  }

  if (renderer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    scene.add(new THREE.AmbientLight(0xffffff, 1.7));
    const keyLight = new THREE.DirectionalLight(0xffd38a, 3.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x9b4d2b, 18, 12);
    fillLight.position.set(-3, -2, 3);
    scene.add(fillLight);

    const group = new THREE.Group();
    scene.add(group);
    const gold = new THREE.MeshStandardMaterial({ color: 0xc99a45, metalness: 0.58, roughness: 0.3 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x4a2d1e, metalness: 0.25, roughness: 0.55 });
    const red = new THREE.MeshStandardMaterial({ color: 0x9c3d2c, metalness: 0.2, roughness: 0.48 });
    const cream = new THREE.MeshStandardMaterial({ color: 0xe8d4ad, metalness: 0.2, roughness: 0.4 });
    const geometries = [];

    function clearObject() {
      while (group.children.length) {
        const objeto = group.children[0];
        group.remove(objeto);
        if (objeto.geometry && !geometries.includes(objeto.geometry)) objeto.geometry.dispose();
      }
    }

    function addMesh(geometry, material, x = 0, y = 0, z = 0) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      group.add(mesh);
      return mesh;
    }

    function buildGeometry() {
      clearObject();
      addMesh(new THREE.IcosahedronGeometry(1.22, 1), gold);
      addMesh(new THREE.TorusGeometry(1.55, 0.045, 12, 100), cream).rotation.x = 0.75;
      addMesh(new THREE.TorusGeometry(1.72, 0.035, 10, 100), red).rotation.y = 0.9;
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        addMesh(new THREE.BoxGeometry(0.22, 0.22, 0.22), i % 2 ? red : cream, Math.cos(angle) * 1.85, Math.sin(angle) * 1.85, 0).rotation.z = angle;
      }
      setInfo('Forma ancestral', 'Padrões geométricos aparecem em diferentes expressões artísticas do continente africano e de suas diásporas. Cada forma tem contexto próprio: não existe uma única estética africana.');
    }

    function buildMask() {
      clearObject();
      addMesh(new THREE.SphereGeometry(1, 32, 24), dark).scale.set(0.82, 1.2, 0.42);
      addMesh(new THREE.ConeGeometry(0.23, 0.8, 5), gold, 0, 1.35, 0).rotation.z = Math.PI;
      addMesh(new THREE.ConeGeometry(0.23, 0.8, 5), gold, -0.58, 0.95, 0).rotation.z = -0.75;
      addMesh(new THREE.ConeGeometry(0.23, 0.8, 5), gold, 0.58, 0.95, 0).rotation.z = 0.75;
      addMesh(new THREE.SphereGeometry(0.13, 16, 12), cream, -0.32, 0.25, 0.38);
      addMesh(new THREE.SphereGeometry(0.13, 16, 12), cream, 0.32, 0.25, 0.38);
      addMesh(new THREE.BoxGeometry(0.14, 0.5, 0.14), red, 0, -0.1, 0.42);
      addMesh(new THREE.TorusGeometry(0.34, 0.055, 8, 32, Math.PI), gold, 0, -0.56, 0.36).rotation.z = Math.PI;
      setInfo('Máscara estilizada', 'Esta peça é uma criação geométrica digital inspirada em formas de arte escultural. Não reproduz uma máscara ritual ou uma tradição específica. Máscaras africanas possuem significados diversos conforme cada povo e contexto.');
    }

    function buildDrum() {
      clearObject();
      addMesh(new THREE.CylinderGeometry(0.72, 0.95, 1.8, 12, 1), dark);
      addMesh(new THREE.CylinderGeometry(0.73, 0.73, 0.12, 32), cream, 0, 0.96, 0);
      addMesh(new THREE.CylinderGeometry(0.96, 0.96, 0.12, 32), gold, 0, -0.95, 0);
      for (let i = 0; i < 10; i++) {
        const angle = Math.PI * 2 * i / 10;
        addMesh(new THREE.BoxGeometry(0.07, 1.35, 0.07), gold, Math.cos(angle) * 0.78, 0, Math.sin(angle) * 0.78);
      }
      for (let i = 0; i < 3; i++) {
        addMesh(new THREE.TorusGeometry(0.78 - i * 0.07, 0.035, 8, 48), red, 0, 0.5 - i * 0.5, 0).rotation.x = Math.PI / 2;
      }
      setInfo('Tambor simbólico', 'Tambores e instrumentos de percussão estão presentes em muitas manifestações afro-brasileiras. Os instrumentos, ritmos e seus sentidos variam entre comunidades e tradições. Este modelo é ilustrativo.');
    }

    function setInfo(titulo, texto) {
      if (titleLabel) titleLabel.textContent = titulo;
      if (heading) heading.textContent = titulo;
      if (description) description.textContent = texto;
    }

    const builders = [buildGeometry, buildMask, buildDrum];
    let rotationX = -0.12;
    let rotationY = 0.35;
    let zoom = 1;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let activeObject = 0;
    let pointerMoved = false;

    function resize() {
      const width = canvas.clientWidth || 600;
      const height = canvas.clientHeight || 490;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function animate() {
      requestAnimationFrame(animate);
      if (!dragging) rotationY += 0.0025;
      group.rotation.x += (rotationX - group.rotation.x) * 0.08;
      group.rotation.y += (rotationY - group.rotation.y) * 0.08;
      group.scale.setScalar(zoom);
      renderer.render(scene, camera);
    }

    canvas.addEventListener('pointerdown', (evento) => {
      dragging = true;
      pointerMoved = false;
      lastX = evento.clientX;
      lastY = evento.clientY;
      canvas.setPointerCapture(evento.pointerId);
    });
    canvas.addEventListener('pointermove', (evento) => {
      if (!dragging) return;
      const dx = evento.clientX - lastX;
      const dy = evento.clientY - lastY;
      if (Math.abs(dx) + Math.abs(dy) > 2) pointerMoved = true;
      rotationY += dx * 0.009;
      rotationX += dy * 0.009;
      rotationX = Math.max(-1.2, Math.min(1.2, rotationX));
      lastX = evento.clientX;
      lastY = evento.clientY;
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((evento) => canvas.addEventListener(evento, () => { dragging = false; }));
    canvas.addEventListener('wheel', (evento) => {
      evento.preventDefault();
      zoom = Math.max(0.65, Math.min(1.65, zoom + (evento.deltaY < 0 ? 0.06 : -0.06)));
    }, { passive: false });

    document.querySelector('#rotateLeft')?.addEventListener('click', () => rotationY -= 0.55);
    document.querySelector('#rotateRight')?.addEventListener('click', () => rotationY += 0.55);
    document.querySelector('#zoomIn')?.addEventListener('click', () => zoom = Math.min(1.65, zoom + 0.12));
    document.querySelector('#zoomOut')?.addEventListener('click', () => zoom = Math.max(0.65, zoom - 0.12));
    document.querySelector('#reset3D')?.addEventListener('click', () => { rotationX = -0.12; rotationY = 0.35; zoom = 1; });

    document.querySelectorAll('.object-choice').forEach((botao) => {
      botao.addEventListener('click', () => {
        activeObject = Number(botao.dataset.object);
        document.querySelectorAll('.object-choice').forEach((item) => item.classList.remove('active'));
        botao.classList.add('active');
        rotationX = -0.12;
        rotationY = 0.35;
        zoom = 1;
        builders[activeObject]?.();
      });
    });

    buildGeometry();
    resize();
    window.addEventListener('resize', resize);
    if (loading) loading.style.display = 'none';
    animate();
  }
}
