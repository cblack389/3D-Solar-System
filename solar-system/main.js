// import * as THREE from '/build/three.module.js'
// import { OrbitControls } from './jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import Stats from 'https://unpkg.com/three@0.126.1/examples//jsm/libs/stats.module.js';
import { FlyControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/FlyControls.js';

import Planet from './planet.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1e7 );
const renderer = new THREE.WebGLRenderer();
const stats = new Stats();
const controls = new FlyControls( camera, renderer.domElement );
const clock = new THREE.Clock();

const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);

function addStars() {
    const radius = 100;
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
}



function main() {

    
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    document.body.appendChild( stats.dom);

    // const loader = new THREE.TextureLoader();

    const solarSystem = new THREE.Group();

    const sun = new Planet(500, 32, 16, '/resources/sun.jpg', 0);
    const mercury = new Planet(4, 32, 16, '/resources/mercury.png', 700)
    const venus = new Planet(12, 32, 16, '/resources/venus.jpg', 1000);
    const earth = new Planet(12, 32, 16, '/resources/earth.jpeg', 1100);
    const mars = new Planet(4, 32, 16, '/resources/mars.webp', 1200);
    const jupiter = new Planet(100, 32, 16, '/resources/jupiter.jpg', 1500);
    const saturn = new Planet(90, 32, 16, '/resources/saturn.jpg', 1700);
    const uranus = new Planet(80, 32, 16, '/resources/uranus.jpg', 1900);
    const neptune = new Planet(80, 32, 16, '/resources/neptune.jpg', 2100);

    const sunMesh = sun.getMesh();
    const mercuryMesh = mercury.getMesh();
    const venusMesh = venus.getMesh();
    const earthMesh = earth.getMesh();
    const marsMesh = mars.getMesh();
    const jupiterMesh = jupiter.getMesh();
    const saturnMesh = saturn.getMesh();
    const uranusMesh = uranus.getMesh();
    const neptuneMesh = neptune.getMesh();

    let sunSystem = new THREE.Group();
    sunSystem.add(sunMesh);
    let mercurySystem = new THREE.Group();
    mercurySystem.add(mercuryMesh);
    let venusSystem = new THREE.Group();
    venusSystem.add(venusMesh);
    let earthSystem = new THREE.Group();
    earthSystem.add(earthMesh);
    let marsSystem = new THREE.Group();
    marsSystem.add(marsMesh);
    let jupiterSystem = new THREE.Group();
    jupiterSystem.add(jupiterMesh);
    let saturnSystem = new THREE.Group();
    saturnSystem.add(saturnMesh);
    let uranusSystem = new THREE.Group();
    uranusSystem.add(uranusMesh);
    let neptuneSystem = new THREE.Group();
    neptuneSystem.add(neptuneMesh);

    solarSystem.add(sunSystem);
    solarSystem.add(mercurySystem);
    solarSystem.add(venusSystem);
    solarSystem.add(earthSystem);
    solarSystem.add(marsSystem);
    solarSystem.add(jupiterSystem);
    solarSystem.add(saturnSystem);
    solarSystem.add(uranusSystem);
    solarSystem.add(neptuneSystem);

    scene.add(solarSystem);

    addStars()

    camera.position.z = 700;

    controls.movementSpeed = 1000;
    controls.domElement = renderer.domElement;
    controls.rollSpeed = Math.PI / 8;
    controls.autoForward = false;
    controls.dragToLook = false;

    function animate() {
        sunMesh.rotation.y += 0.001;
        earthSystem.rotation.y += EARTH_YEAR;
        mercurySystem.rotation.y += EARTH_YEAR * 4;
        venusSystem.rotation.y += EARTH_YEAR * 2;
        marsSystem.rotation.y += EARTH_YEAR / 2;
        jupiterSystem.rotation.y += EARTH_YEAR / 4;
        saturnSystem.rotation.y += EARTH_YEAR / 6;
        uranusSystem.rotation.y += EARTH_YEAR / 8;
        neptuneSystem.rotation.y += EARTH_YEAR / 9;
        requestAnimationFrame( animate );
        controls.update(clock.getDelta());
        stats.update();
        renderer.render( scene, camera );
    }

    animate();
}

main();
