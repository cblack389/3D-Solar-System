// import * as THREE from '/build/three.module.js'
// import { OrbitControls } from './jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import Stats from 'https://unpkg.com/three@0.126.1/examples//jsm/libs/stats.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

import Planet from './planet.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const stats = new Stats();
document.body.appendChild( stats.dom);

// const loader = new THREE.TextureLoader();

const solarSystem = new THREE.Group();

const sun = new Planet(15, 32, 16, '/resources/sun.jpg', 0);
const mercury = new Planet(15, 32, 16, '/resources/mercury.png', 30)
const venus = new Planet(15, 32, 16, '/resources/venus.jpg', 60);
const earth = new Planet(15, 32, 16, '/resources/earth.jpeg', 90);
const mars = new Planet(15, 32, 16, '/resources/mars.webp', 120);
const jupiter = new Planet(15, 32, 16, '/resources/jupiter.jpg', 150);
const saturn = new Planet(15, 32, 16, '/resources/saturn.jpg', 180);
const uranus = new Planet(15, 32, 16, '/resources/uranus.jpg', 210);
const neptune = new Planet(15, 32, 16, '/resources/neptune.jpg', 240);

solarSystem.add(sun.getMesh());
solarSystem.add(mercury.getMesh());
solarSystem.add(venus.getMesh());
solarSystem.add(earth.getMesh());
solarSystem.add(mars.getMesh());
solarSystem.add(jupiter.getMesh());
solarSystem.add(saturn.getMesh());
solarSystem.add(uranus.getMesh());
solarSystem.add(neptune.getMesh());

scene.add(solarSystem);

//------
const radius = 20;
const r = radius, starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];

const vertices1 = [];
const vertices2 = [];

const vertex = new THREE.Vector3();

for ( let i = 0; i < 250; i ++ ) {

    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.multiplyScalar( r );

    vertices1.push( vertex.x, vertex.y, vertex.z );

}

for ( let i = 0; i < 1500; i ++ ) {

    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.multiplyScalar( r );

    vertices2.push( vertex.x, vertex.y, vertex.z );

}

starsGeometry[ 0 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
starsGeometry[ 1 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices2, 3 ) );

const starsMaterials = [
    new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
    new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
    new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
    new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
    new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
    new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
];

for ( let i = 10; i < 30; i ++ ) {

    const stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );

    stars.rotation.x = Math.random() * 6;
    stars.rotation.y = Math.random() * 6;
    stars.rotation.z = Math.random() * 6;
    stars.scale.setScalar( i * 10 );

    stars.matrixAutoUpdate = false;
    stars.updateMatrix();

    scene.add( stars );

}

//------


camera.position.z = 30;

const controls = new OrbitControls( camera, renderer.domElement );
			controls.target.set( 0, 0.5, 0 );
			controls.update();
			controls.enablePan = false;
			controls.enableDamping = true;


function animate() {
	requestAnimationFrame( animate );
    controls.update();
    stats.update();
	renderer.render( scene, camera );
}
animate();