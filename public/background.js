import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create geometric shapes
const geometries = [];
const materials = [];

// Torus
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);
geometries.push(torus);

// Icosahedron
const icoGeometry = new THREE.IcosahedronGeometry(7, 0);
const icoMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
icosahedron.position.x = -20;
scene.add(icosahedron);
geometries.push(icosahedron);

// Octahedron
const octaGeometry = new THREE.OctahedronGeometry(6, 0);
const octaMaterial = new THREE.MeshStandardMaterial({
    color: 0xec4899,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
octahedron.position.x = 20;
scene.add(octahedron);
geometries.push(octahedron);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Position camera
camera.position.z = 30;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.005;

    // Rotate particles
    particlesMesh.rotation.y = time * 0.3;
    particlesMesh.rotation.x = time * 0.2;

    // Animate geometric shapes
    torus.rotation.x = time * 0.5;
    torus.rotation.y = time * 0.3;
    torus.position.y = Math.sin(time) * 2;

    icosahedron.rotation.x = time * 0.3;
    icosahedron.rotation.y = time * 0.5;
    icosahedron.position.y = Math.cos(time) * 2;

    octahedron.rotation.x = time * 0.4;
    octahedron.rotation.y = time * 0.6;
    octahedron.position.y = Math.sin(time * 1.2) * 2;

    // Camera movement based on mouse
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
