import { MeshStandardMaterial, Vector3, PlaneGeometry, TextureLoader, MeshBasicMaterial, Mesh, MathUtils, Group, BoxGeometry } from "three";
import Alpha1stFloor from "/AlphaRFirstFloor.jpeg";

function AlphaRFirstFloor() {
    // create occluder material
   const  occluderMaterial = new MeshStandardMaterial({ color: 0x00ff00 });
   occluderMaterial.colorWrite = false;

    // create room map
    const navigationArea = new Group();

    // Horizontal walls
    navigationArea.add(createWallElement(new Vector3(1.58, 1, -4.15), new Vector3(0, 0, 0), new Vector3(20.4, 3, 0.06),occluderMaterial));
    
    // 1 group
    navigationArea.add(createWallElement(new Vector3(-5.34, 1, -3.02), new Vector3(0, 0, 0), new Vector3(1.1, 3, 0.06), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(-4.12, 1, -3.02), new Vector3(0, 0, 0), new Vector3(0.5, 3, 0.06), occluderMaterial));

    navigationArea.add(createWallElement(new Vector3(-7.9, 1, -1.76), new Vector3(0, 0, 0), new Vector3(1.42, 3, 0.06), occluderMaterial));
    
    navigationArea.add(createWallElement(new Vector3(7.52, 1, -2.1), new Vector3(0, 0, 0), new Vector3(1.654, 3, 0.06), occluderMaterial));


    //1 group 
    navigationArea.add(createWallElement(new Vector3(-7.9, 1, -0.24), new Vector3(0, 0, 0), new Vector3(1.42, 3, 0.06), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(-3.74, 1, -0.24), new Vector3(0, 0, 0), new Vector3(4.34, 3, 0.06), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(1.02, 1, -0.24), new Vector3(0, 0, 0), new Vector3(3.94, 3, 0.06), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(4.15, 1, -0.24), new Vector3(0, 0, 0), new Vector3(1.36, 3, 0.06), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(6.24, 1, -0.24), new Vector3(0, 0, 0), new Vector3(1.29, 3, 0.06), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(7.78, 1, -0.24), new Vector3(0, 0, 0), new Vector3(1, 3, 0.06), occluderMaterial));

    //1 group
    navigationArea.add(createWallElement(new Vector3(-0.32, 1, 1), new Vector3(0, 0, 0), new Vector3(4.3, 3, 0.06), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(3.32, 1, 1), new Vector3(0, 0, 0), new Vector3(1.7, 3, 0.06), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(5.72, 1, 1), new Vector3(0, 0, 0), new Vector3(2.2, 3, 0.06), occluderMaterial));
    
    
    navigationArea.add(createWallElement(new Vector3(-5.2, 1, 1.2), new Vector3(0, 0, 0), new Vector3(1.68, 3, 0.06), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(1.58, 1, 4.8), new Vector3(0, 0, 0), new Vector3(20.4, 3, 0.06), occluderMaterial));


    //Vertical walls
    // navigationArea.add(createWallElement(new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(7.91, 3, 0.06)));
    navigationArea.add(createWallElement(new Vector3(11.78, 1, 0.34), new Vector3(0, 0, 0), new Vector3(0.06, 3, 9), occluderMaterial));
    
    //1 group
    navigationArea.add(createWallElement(new Vector3(8.3, 1, -3.9), new Vector3(0, 0, 0), new Vector3(0.06, 3, 0.5), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(8.3, 1, -2.24), new Vector3(0, 0, 0), new Vector3(0.06, 3, 1.88), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(8.3, 1, -0.5), new Vector3(0, 0, 0), new Vector3(0.06, 3, 0.6), occluderMaterial));

    navigationArea.add(createWallElement(new Vector3(6.68, 1, -2.18), new Vector3(0, 0, 0), new Vector3(0.06, 3, 3.88), occluderMaterial));
    
    //1 group
    navigationArea.add(createWallElement(new Vector3(6.8, 1, 1.278), new Vector3(0, 0, 0), new Vector3(0.06, 3, 0.49), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(6.8, 1, 3.38), new Vector3(0, 0, 0), new Vector3(0.06, 3, 2.88), occluderMaterial));

    navigationArea.add(createWallElement(new Vector3(4.94, 1, 2.86), new Vector3(0, 0, 0), new Vector3(0.06, 3, 3.88), occluderMaterial));



    navigationArea.add(createWallElement(new Vector3(3.55, 1, -2.18), new Vector3(0, 0, 0), new Vector3(0.06, 3, 3.88), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(3.65, 1, 2.86), new Vector3(0, 0, 0), new Vector3(0.06, 3, 3.82), occluderMaterial));

    navigationArea.add(createWallElement(new Vector3(0.56, 1, -2.18), new Vector3(0, 0, 0), new Vector3(0.06, 3, 3.88), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(0.64, 1, 2.86), new Vector3(0, 0, 0), new Vector3(0.06, 3, 3.82), occluderMaterial));
    
    navigationArea.add(createWallElement(new Vector3(-2.58, 1, -2.18), new Vector3(0, 0, 0), new Vector3(0.06, 3, 3.88), occluderMaterial));
    
    //1 group
    navigationArea.add(createWallElement(new Vector3(-2.44, 1, 1.28), new Vector3(0, 0, 0), new Vector3(0.06, 3, 0.52), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(-2.44, 1, 3.468), new Vector3(0, 0, 0), new Vector3(0.06, 3, 2.66), occluderMaterial));

    //1 group
    navigationArea.add(createWallElement(new Vector3(-3.88, 1, -4), new Vector3(0, 0, 0), new Vector3(0.06, 3, 0.4), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(-3.88, 1, -1.76), new Vector3(0, 0, 0), new Vector3(0.06, 3, 2.98), occluderMaterial));
    
    navigationArea.add(createWallElement(new Vector3(-5.88, 1, -1.64), new Vector3(0, 0, 0), new Vector3(0.06, 3, 2.88), occluderMaterial));
    
    //1 group
    navigationArea.add(createWallElement(new Vector3(-7.22, 1, -3.9), new Vector3(0, 0, 0), new Vector3(0.06, 3, 0.44), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(-7.22, 1, -2.3), new Vector3(0, 0, 0), new Vector3(0.06, 3, 2), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(-7.22, 1, -0.54), new Vector3(0, 0, 0), new Vector3(0.06, 3, 0.632), occluderMaterial));
   

    navigationArea.add(createWallElement(new Vector3(-8.64, 1, -1.28), new Vector3(0, 0, 0), new Vector3(0.06, 3, 5.88), occluderMaterial));
    navigationArea.add(createWallElement(new Vector3(-8.64, 1, 3.86), new Vector3(0, 0, 0), new Vector3(0.06, 3, 1.82), occluderMaterial));
    
    // set starting point to start-room center
    // navigationArea.position.set(0, 0, 0);

     // create floor
     const floorGeometry = new PlaneGeometry(30, 10);
     const floorTexture = new TextureLoader().load(Alpha1stFloor);
     const floorMaterial = new MeshBasicMaterial({ map: floorTexture });
     const floorPlaneMesh = new Mesh(floorGeometry, floorMaterial);
     floorPlaneMesh.rotation.x = -0.5 * Math.PI
     floorPlaneMesh.renderOrder = 3;
    //  floorPlaneMesh.visible = false;
     navigationArea.add(floorPlaneMesh);
 
     // navigation area parent for easier placement
     const navigationAreaParent = new Group();
     navigationAreaParent.add(navigationArea);
 
     return navigationAreaParent;
}


function createWallElement(position, rotation, scale, occluderMaterial) {
    const occluderGeometry = new BoxGeometry(scale.x, scale.y, scale.z);
    const occluderMesh = new Mesh(occluderGeometry, occluderMaterial);
    occluderMesh.position.set(position.x, position.y, position.z);
    occluderMesh.renderOrder = 2;

    return occluderMesh;
}

export { AlphaRFirstFloor }


