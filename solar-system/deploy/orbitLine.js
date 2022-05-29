//import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import * as THREE from './node_modules/three/build/three.module.js';

export default class OrbitLine {
    constructor(interiorRadius, exteriorRadius, thetaSegments) {
        this.geometry = new THREE.RingGeometry( interiorRadius, exteriorRadius, thetaSegments )
        this.material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide});
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.rotation.x = Math.PI / 2;
    }

    getMesh() {
        return this.mesh;
    }
}