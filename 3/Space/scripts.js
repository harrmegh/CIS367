import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import universe from "./Images/universe.jpg";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// Set up scene, camera, and renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // could use false as third param to give half resolution
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45, // Field of view value in degrees
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near clipping plane
  1000 // far clipping plane
);

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
controls.update();

// draw cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// make a plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI; // make plane match grid rotation
plane.receiveShadow = true;

// make a grid
const grid = new THREE.GridHelper(30);
scene.add(grid);

// add a sphere
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
// Basic material does not apply light
// const sphereMaterial = new THREE.MeshBasicMaterial({
//   color: 0x0000ff,
//   wireframe: true,
//   // wireframe: false,
// });
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: true,
  // wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;
const sphereId = sphere.id;

const sunGeometry = new THREE.SphereGeometry(16, 40, 40);
const sunMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffe0,
  wireframe: true,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
sun.position.set(0, 0, 0);
sun.castShadow = true;
// const sunId = sun.id;

// add lighting
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

// directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  5
);
scene.add(directionalLightHelper);

// shadow helper
const directionalLightShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(directionalLightShadowHelper);

// spotlight
// const spotLight = new THREE.SpotLight(0xffffff);
// scene.add(spotLight);
// spotLight.position.set(-100, 100, 0);
// spotLight.castShadow = true;
// spotLight.angle = 0.2;

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// scene.fog = new THREE.Fog(0xffffff, 0, 200);
scene.fog = new THREE.FogExp2(0xffffff, 0.01);

// change background color
// renderer.setClearColor(0xffea00);
// set texture as background
// const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(stars); // only the background
// scene.background = cubeTextureLoader.load([stars, stars, stars, stars, stars, stars]);

const mousePosition = new THREE.Vector2();
window.addEventListener("mousemove", function (e) {
  mousePosition.x = (e.clientX / this.window.innerWidth) * 2 - 1;
  mousePosition.y = (e.clientY / this.window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  rayCaster.setFromCamera(mousePosition, camera);
  const intersects = rayCaster.intersectObjects(scene.children);
  console.log(intersects);

  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.id === sphereId)
      intersects[i].object.material.color.set(0xff0000);
  }
  renderer.render(scene, camera);
}
animate();
