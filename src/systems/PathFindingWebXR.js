import {
  Vector3,
  MeshBasicMaterial,
  Mesh,
  BoxGeometry,
  BufferGeometry,
  Line,
  LineBasicMaterial,
} from "three";

import { Pathfinding, PathfindingHelper } from 'three-pathfinding';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import NavMeshUrl from "/alphaRFirstFloor.gltf";
import alphaRFirstFloorModelUrl from "/alphaRFirstFloor.glb?url";
import Positions from "../data.js"

const zeroVector = new Vector3(0, 0, 0);
const pathfindinghelper = new PathfindingHelper();
let pathfinding = new Pathfinding();
let zoneName = "level1";
let groupID;
let zoneData;
let startPosition = new Vector3();
let targetPosition = new Vector3();

let tempTargetPosition = new Vector3(0, 0.5, -2);

let line;

let camera;
let navigationArea;
let navigationAreaModel;

let isStartCubeCreated = false;
let isEndCubeCreated = false;

const navCubes = [];

class PathFindingWebXR {
  constructor(cameraParam, navigationAreaParam) {
    camera = cameraParam;
    navigationArea = navigationAreaParam;

    navigationArea.add(pathfindinghelper)

    // setup navmesh and navigation targets
    const loader = new GLTFLoader();
    loader.load(alphaRFirstFloorModelUrl, (gltf) => {
      navigationAreaModel = gltf.scene;
      // navigationArea.add(navigationAreaModel);
    });
    loader.load(
      NavMeshUrl,
      (gltf) => {
        // NavMesh generator https://navmesh.isaacmason.com/
        // PathFinding https://github.com/donmccurdy/three-pathfinding

        let navMesh = gltf.scene;
        navigationArea.add(navMesh);

        let navMeshGeometry = new BufferGeometry();
        navMesh.children.forEach((child) => {
          if (child.type === "Mesh") {
            console.log("Mesh", child);
            navMeshGeometry = child;
          }
        });
        navMeshGeometry.visible = false;

        zoneData = Pathfinding.createZone(navMeshGeometry.geometry);
        pathfinding.setZoneData(zoneName, zoneData);
      },
      undefined,
      (e) => {
        console.error(e);
      }
    );

    // // navigation line
    // const lineGeometry = new BufferGeometry();
    // const lineMaterial = new LineBasicMaterial({
    //   color: 0xff0000,
    //   linewidth: 12,
    // });
    // line = new Line(lineGeometry, lineMaterial);
    // line.renderOrder = 3;
    // navigationArea.add(line);

    // // highlight line vertices with small cubes
    // const geometry = new BoxGeometry(0.1, 0.1, 0.1);
    // const material = new MeshBasicMaterial({ color: 0xff0000 });
    // for (let index = 0; index < 50; index++) {
    //   const cube = new Mesh(geometry, material);
    //   cube.visible = false;
    //   cube.renderOrder = 3;
    //   navCubes.push(cube);
    //   navigationArea.add(cube);
    // }

    document
      .getElementById("selectedTarget")
      .addEventListener("change", (e) => {
        console.log("showRoom selected",e.target.value);
        const value = e.target.value;
        const position = Positions[value].position
        tempTargetPosition.set(position.x, position.y, position.z);
      });
  }

  setStartPosition(start) {
    startPosition.set(start.x, start.y, start.z);

    groupID = pathfinding.getGroup(zoneName, start);
    // console.log("GroupID, StartPosition", groupID, start);
    const startNode = pathfinding.getClosestNode(
      startPosition,
      zoneName,
      groupID
    );
    startPosition.set(
      startNode.centroid.x,
      startNode.centroid.y,
      startNode.centroid.z
    );

    // console.log("GroupID, StartPosition, StartNode", groupID, startPosition, startnode);

    // visual for better debugging
    if (!isStartCubeCreated) {
      const startGeometry = new BoxGeometry(1, 1, 1);
      const startMaterial = new MeshBasicMaterial({ color: 0x000 });
      const startCube = new Mesh(startGeometry, startMaterial);
      startCube.position.set(-40, 0, 4);
      startCube.renderOrder = 3;

      navigationAreaModel.add(startCube);
      navigationArea.add(startCube);

      isStartCubeCreated = !isStartCubeCreated;
    }
  }

  setTargetPosition(target) {
    targetPosition.set(target.x, target.y, target.z);

    const endNode = pathfinding.getClosestNode(
      targetPosition,
      zoneName,
      groupID
    );
    targetPosition.set(
      endNode.centroid.x,
      endNode.centroid.y,
      endNode.centroid.z
    );

    // console.log("GroupID, EndPosition, EndNode", groupID, targetPosition, endnode);

    // visual for better debugging
    if (!isEndCubeCreated) {
      const targetGeometry = new BoxGeometry(0.2, 0.2, 0.2);
      const targetMaterial = new MeshBasicMaterial({ color: 0x0000ff });
      const targetCube = new Mesh(targetGeometry, targetMaterial);
      targetCube.position.set(0, 0.5, -2);
      targetCube.renderOrder = 3;

      navigationArea.add(targetCube);
      isEndCubeCreated = !isEndCubeCreated;
    }
  }

  calculatePath(timestamp, frame, imageTracking) {
    if (frame) {
      const markerWorldPosition = imageTracking.getMarkerWorldPosition();

      if (markerWorldPosition != zeroVector) {
        // calculate "offseted" positions, as navigation mesh can't be moved/rotated
        const cameraPosition = navigationArea.worldToLocal(camera.position);
        console.log({
          cameraPosition,
        });
        const navStart = new Vector3(cameraPosition.x, 0, cameraPosition.z);
        // set endposition to current target
        const navEnd = new Vector3(
          tempTargetPosition.x,
          tempTargetPosition.y,
          tempTargetPosition.z
        );

        this.setStartPosition(navStart);
        this.setTargetPosition(navEnd);

        const path = pathfinding.findPath(
          startPosition,
          targetPosition,
          zoneName,
          groupID
        );
        console.log({
          start: navStart,
          end: navEnd,
        });
        console.log(
          "GroupID, Path, StartPosition, EndPosition",
          groupID,
          path,
          startPosition,
          targetPosition
        );
        console.log("Zone", zoneData);

        if (path != null) {
          pathfindinghelper.reset()
          pathfindinghelper.setPlayerPosition(startPosition)
          pathfindinghelper.setTargetPosition(targetPosition)
          pathfindinghelper.setPath(path);
          // const points = [];
          // points.push(navStart);
          // for (let index = 0; index < path.length; index++) {
          //   points.push(path[index]);
          //   navCubes[index].position.set(path[index].x, 0, path[index].z);
          //   navCubes[index].visible = true;
          // }
          // for (
          //   let unsetIndex = path.length;
          //   unsetIndex < navCubes.length;
          //   unsetIndex++
          // ) {
          //   navCubes[unsetIndex].position.set(0, 0, 0);
          //   navCubes[unsetIndex].visible = false;
          // }
          // line.geometry.setFromPoints(points);
        }
      }
    }
  }
}

export { PathFindingWebXR };
