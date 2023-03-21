import * as THREE from "three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
let boxes = [];

const fov = 100; // increased the near plane
const near = 0.1;
const far = 10; // decreased the far plane
const camera = new THREE.PerspectiveCamera(
  fov,
  window.innerWidth / window.innerHeight,
  near,
  far
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xff0000);

// Add a floor to the scene
let floorWidth = 20;
let floorHeight = 40;

// Box vars
let boxWidth = 1;
let boxHeight = 2;
let boxDepth = 1;

// Load textures
let textureLoader = new THREE.TextureLoader();
// let grass = textureLoader.load("stones.png");
let grass = textureLoader.load("grass1.png");
grass.wrapS = THREE.RepeatWrapping;
grass.wrapT = THREE.RepeatWrapping;
grass.repeat.set(floorWidth / 2, floorHeight / 2);
// let stone = textureLoader.load("ice.png");
let stone = textureLoader.load("stone wall.png");
stone.wrapS = THREE.RepeatWrapping;
stone.wrapT = THREE.RepeatWrapping;
stone.repeat.set(boxWidth / 2, boxHeight / 2);

let floorGeometry = new THREE.PlaneGeometry(floorWidth, floorHeight);
// let floorMaterial = new THREE.MeshStandardMaterial({ color: 0x009900 });
var floorMaterial = new THREE.MeshStandardMaterial({
  map: grass,
  metalness: 0.25,
  roughness: 0.75,
});
let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
// A Plane is created standing vertically.
// Let's rotate it so that is lays flat.
floorMesh.position.set(0, -1, -3);
floorMesh.rotation.set(-Math.PI / 2, 0, 0);
scene.add(floorMesh);

// Add a box to the scene

let boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
// let boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });
var boxMaterial = new THREE.MeshStandardMaterial({
  map: stone,
  metalness: 0,
  roughness: 1,
});

for (let i = 0; i < 14; i++) {
  let boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  boxMesh.position.set(i - 7, 1, -5);
  boxMesh.receiveShadow = true;
  boxMesh.castShadow = true;
  scene.add(boxMesh);
  boxes.push(boxMesh);
}

// Add the Lights
// Ambient light is used to prevent the scene
// from ever being too dark.
var ambient = new THREE.AmbientLight(0x333333);
scene.add(ambient);
// A point light acts like a light bulb, sending light
// in all directions.
// Increased intensity and made the box mesh not cast a shadow
var lightIntensity = 1;
var pointLight = new THREE.PointLight(0xffffff, lightIntensity);
pointLight.position.set(2, 4, -2);
scene.add(pointLight);
// Enable Shadows
// The floor will only receive shadows, but the box can both
// cast and receive shadows.
renderer.shadowMap.enabled = true;
floorMesh.receiveShadow = true;
// boxes.receiveShadow = true;
// boxMesh.castShadow = true;
pointLight.castShadow = true;

function animate() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].rotateX(Math.PI / (100 + i));
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
