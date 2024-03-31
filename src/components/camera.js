import { PerspectiveCamera } from "three";

function createCamera() {
    const camera = new PerspectiveCamera(
        70, // fov = Field Of View
        window.innerWidth / window.innerHeight, // aspect ratio (dummy value)
        0.1, // near clipping plane
        10000 // far clipping plane
    );

    // move the camera back so we can view the scene
    camera.position.set(33, 10, 10);

    return camera;
}

export { createCamera };
