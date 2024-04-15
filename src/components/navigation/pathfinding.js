import { PathFindingWebXR } from "../../systems/PathFindingWebXR.js";

function createPathFindingWebXR(camera, imageTracking, navigationAreaParent) {
    const pathFindingWebXR = new PathFindingWebXR(camera, navigationAreaParent.children[0]);
    pathFindingWebXR.tick = (timestamp, frame) => pathFindingWebXR.calculatePath(timestamp, frame, imageTracking);

    return pathFindingWebXR;
}

export { createPathFindingWebXR };
