import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

export default class Planet {
    constructor(radius, widthSegments, heightSegments, texturePath, distanceX, name) {
        const loader = new THREE.TextureLoader();

        this.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        this.texture = loader.load(texturePath);
        this.material = new THREE.MeshBasicMaterial({map: this.texture});
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.mesh.name = name;

        this.mesh.position.x = distanceX;
    }

    getMesh() {
        return this.mesh;
    }

    getName() {
        return this.name;
    }
  }