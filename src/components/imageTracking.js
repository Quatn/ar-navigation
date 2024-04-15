import { ImageTrackingWebXR } from "../systems/ImageTrackingWebXR";

function createImageTrackingWebXR(renderer, navigationAreaParent) {
    const imageTrackingWebXR = new ImageTrackingWebXR();
    imageTrackingWebXR.tick = (timestamp, frame) => imageTrackingWebXR.updateImageTrackingWebXR(timestamp, frame, renderer, navigationAreaParent, navigationAreaParent.children[0]);
    return imageTrackingWebXR;
}

export { createImageTrackingWebXR };
