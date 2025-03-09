import RAPIER from '@dimforge/rapier3d-compat';

// Variabel global untuk menyimpan world
let world;

export async function initPhysics() {
    // Inisialisasi Rapier (memuat WebAssembly)
    await RAPIER.init();

    // Buat dunia fisika dengan gravitasi
    world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 });

    // Setup ground
    const groundBodyDesc = RAPIER.RigidBodyDesc.fixed();
    const groundBody = world.createRigidBody(groundBodyDesc);
    const groundColliderDesc = RAPIER.ColliderDesc.cuboid(50, 0.1, 50);
    world.createCollider(groundColliderDesc, groundBody);

    return world;
}

export function updatePhysics(world, scene) {
    world.step();
    scene.traverse((obj) => {
        if (obj.userData?.physicsBody) {
            const body = world.getRigidBody(obj.userData.physicsBody);
            if (body) {
                const pos = body.translation();
                const rot = body.rotation();
                obj.position.set(pos.x, pos.y, pos.z);
                obj.quaternion.set(rot.x, rot.y, rot.z, rot.w);
            }
        }
    });
}