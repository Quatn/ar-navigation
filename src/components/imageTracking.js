import { ImageTrackingWebXR } from "../systems/ImageTrackingWebXR.js";

function createImageTrackingWebXR(renderer, navigationAreaParent) {
    const imageTrackingWebXR = new ImageTrackingWebXR();
    imageTrackingWebXR.tick = (timestamp, frame) => imageTrackingWebXR.updateImageTrackingWebXR(timestamp, frame, renderer, navigationAreaParent, navigationAreaParent.children[0]);
    return imageTrackingWebXR;
}

export { createImageTrackingWebXR };
