export function setupControls(agv, fork, world) {
    const keys = {};
    window.addEventListener('keydown', (e) => (keys[e.key] = true));
    window.addEventListener('keyup', (e) => (keys[e.key] = false));

    let forkLifted = false;

    function updateControls() {
        const agvRigidBody = world.getRigidBody(agv.userData.physicsBody); // Gunakan handle dari userData
        if (!agvRigidBody) {
            console.error('Rigid body for AGV not found');
            return;
        }

        const translation = { x: agvRigidBody.translation().x, y: agvRigidBody.translation().y, z: agvRigidBody.translation().z };
        const rotation = agvRigidBody.rotation();

        if (keys['w']) translation.z -= 0.1; // Maju
        if (keys['s']) translation.z += 0.1; // Mundur
        if (keys['a']) translation.x -= 0.1; // Kiri
        if (keys['d']) translation.x += 0.1; // Kanan
        if (keys['e']) agvRigidBody.setRotation({ x: 0, y: rotation.y - 0.05, z: 0, w: 1 }, true); // Rotate Kanan
        if (keys['q']) agvRigidBody.setRotation({ x: 0, y: rotation.y + 0.05, z: 0, w: 1 }, true); // Rotate Kiri
        if (keys['f']) {
            forkLifted = !forkLifted;
            fork.position.y = forkLifted ? 0.5 : 0.05; // Angkat/Turunkan fork
        }

        agvRigidBody.setTranslation({ x: translation.x, y: translation.y, z: translation.z }, true);
        agv.position.set(translation.x, translation.y, translation.z);
        agv.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);

        requestAnimationFrame(updateControls);
    }
    updateControls();
}