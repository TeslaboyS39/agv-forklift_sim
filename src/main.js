import * as THREE from 'three';
import { getConfig } from './config.js';
import { initScene } from './scene.js';
import { setupControls } from './controls.js';
import { initPhysics, updatePhysics } from './physics.js';

// Setup dasar Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('gameCanvas').appendChild(renderer.domElement);

let world, agv, fork, config;

// Definisikan startSimulation di scope global
window.startSimulation = async () => {
    try {
        console.log('startSimulation called');
        config = getConfig();
        document.getElementById('menu').style.display = 'none';

        world = await initPhysics();
        console.log('Physics initialized:', world);
        const sceneObjects = initScene(scene, config, world);
        agv = sceneObjects.agv;
        fork = sceneObjects.fork;

        setupControls(agv, fork, world);
        camera.position.set(0, 10, 10);
        camera.lookAt(0, 0, 0);

        animate();
    } catch (error) {
        console.error('Error in startSimulation:', error);
    }
};

function animate() {
    requestAnimationFrame(animate);
    if (world) { // Periksa apakah world sudah terdefinisi
        updatePhysics(world, scene);
    }
    renderer.render(scene, camera);
}