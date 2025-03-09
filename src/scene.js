import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

export function initScene(scene, config, world) {
    // Lantai
    const floorGeometry = new THREE.PlaneGeometry(config.areaLength, config.areaWidth);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // AGV-Forklift
    const agvBodyGeometry = new THREE.BoxGeometry(config.agvLength, config.agvHeight, config.agvWidth);
    const agvBodyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const agvBody = new THREE.Mesh(agvBodyGeometry, agvBodyMaterial);
    agvBody.position.y = config.agvHeight / 2;
    scene.add(agvBody);

    const forkGeometry = new THREE.BoxGeometry(config.paletteLength, 0.1, config.agvWidth * 0.8);
    const forkMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const fork = new THREE.Mesh(forkGeometry, forkMaterial);
    fork.position.set(config.agvLength / 2 + config.paletteLength / 2, 0.05, 0);
    agvBody.add(fork);

    // Fisika AGV
    const agvBodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(0, config.agvHeight / 2, 0);
    const agvRigidBody = world.createRigidBody(agvBodyDesc);
    const agvColliderDesc = RAPIER.ColliderDesc.cuboid(config.agvLength / 2, config.agvHeight / 2, config.agvWidth / 2);
    world.createCollider(agvColliderDesc, agvRigidBody);
    agvBody.userData.physicsBody = agvRigidBody.handle; // Simpan handle rigid body

    // Box dan Palette (contoh)
    const paletteGeometry = new THREE.BoxGeometry(config.paletteLength, 0.1, config.paletteWidth);
    const paletteMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
    const palette = new THREE.Mesh(paletteGeometry, paletteMaterial);
    palette.position.set(2, 0.05, 2);
    scene.add(palette);

    const boxGeometry = new THREE.BoxGeometry(config.paletteLength, config.boxHeight, config.paletteWidth);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(2, 0.05 + config.boxHeight / 2, 2);
    scene.add(box);

    // Fisika Box + Palette
    const paletteBodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(2, 0.05, 2);
    const paletteBody = world.createRigidBody(paletteBodyDesc);
    const paletteColliderDesc = RAPIER.ColliderDesc.cuboid(config.paletteLength / 2, 0.05, config.paletteWidth / 2);
    world.createCollider(paletteColliderDesc, paletteBody);

    const boxBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(2, 0.05 + config.boxHeight / 2, 2);
    const boxBody = world.createRigidBody(boxBodyDesc);
    const boxColliderDesc = RAPIER.ColliderDesc.cuboid(config.paletteLength / 2, config.boxHeight / 2, config.paletteWidth / 2);
    world.createCollider(boxColliderDesc, boxBody); // Perbaiki sintaks: hapus spasi antara create dan Collider
    box.userData.physicsBody = boxBody.handle; // Simpan handle rigid body

    return { agv: agvBody, fork };
}