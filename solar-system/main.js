//import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
//import Stats from 'https://unpkg.com/three@0.126.1/examples//jsm/libs/stats.module.js';
//import { FlyControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/FlyControls.js';

import * as THREE from './node_modules/three/build/three.module.js';
import Stats from './node_modules/three/examples/jsm/libs/stats.module.js';
import {FlyControls} from './node_modules/three/examples/jsm/controls/FlyControls.js';

import Planet from './planet.js'
import OrbitLine from './orbitLine.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1e7 );
const renderer = new THREE.WebGLRenderer();
const stats = new Stats();
const controls = new FlyControls( camera, renderer.domElement );
const clock = new THREE.Clock();

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// constants
const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);

const MERCURY_SEMIMAJOR_AXIS = 700;
const VENUS_SEMIMAJOR_AXIS = 1000;
const EARTH_SEMIMAJOR_AXIS = 1100;
const MARS_SEMIMAJOR_AXIS = 1200;
const JUPITER_SEMIMAJOR_AXIS = 1700;
const SATURN_SEMIMAJOR_AXIS = 2300;
const URANUS_SEMIMAJOR_AXIS = 2700;
const NEPTUNE_SEMIMAJOR_AXIS = 3300;

const SUN_RADIUS = 500;
const MERCURY_RADIUS = 4;
const VENUS_RADIUS = 12;
const EARTH_RADIUS = 12;
const MARS_RADIUS = 4;
const JUPITER_RADIUS = 100;
const SATURN_RADIUS = 90;
const URANUS_RADIUS = 80;
const NEPTUNE_RADIUS = 80;

let camera_speed = 1000;

let mercury_orbital_speed = EARTH_YEAR * 4;
let venus_orbital_speed = EARTH_YEAR * 2;
let earth_orbital_speed = EARTH_YEAR;
let mars_orbital_speed = EARTH_YEAR / 2;
let jupiter_orbital_speed = EARTH_YEAR / 4; 
let saturn_orbital_speed = EARTH_YEAR / 6;
let uranus_orbital_speed = EARTH_YEAR / 8;
let neptune_orbital_speed = EARTH_YEAR / 9;
let moon_orbital_speed = EARTH_YEAR / 2;
let europa_orbital_speed = EARTH_YEAR * 2;
let io_orbital_speed = EARTH_YEAR * 4;
let ganymede_orbital_speed = EARTH_YEAR * 3;
let callisto_orbital_speed = EARTH_YEAR / 2; 
let titan_orbital_speed = EARTH_YEAR;

const SPEED_INCREMENT = 0.2;

const ORBIT_LINE_HALF_WIDTH = 1;

let pause = false;



let keyPressed = function(e) {
    console.log("HEEERER");
    console.log(e.key);
    switch (e.key) {
      case ',':
        console.log('SPEED DOWN PRESSED');
        if (mercury_orbital_speed > 0) 
            mercury_orbital_speed *= SPEED_INCREMENT;
        if (venus_orbital_speed > 0)
            venus_orbital_speed *= SPEED_INCREMENT;
        if (earth_orbital_speed > 0)
            earth_orbital_speed *= SPEED_INCREMENT;
        if (mars_orbital_speed > 0)
            mars_orbital_speed *= SPEED_INCREMENT;
        if (jupiter_orbital_speed > 0)
            jupiter_orbital_speed *= SPEED_INCREMENT;
        if (saturn_orbital_speed > 0) 
            saturn_orbital_speed *= SPEED_INCREMENT;
        if (uranus_orbital_speed > 0)
            uranus_orbital_speed *= SPEED_INCREMENT;
        if (neptune_orbital_speed > 0)
            neptune_orbital_speed *= SPEED_INCREMENT;
        if (moon_orbital_speed > 0)
            moon_orbital_speed *= SPEED_INCREMENT;
        if (europa_orbital_speed > 0)
            europa_orbital_speed *= SPEED_INCREMENT;
        if (ganymede_orbital_speed > 0)
            ganymede_orbital_speed *= SPEED_INCREMENT;
        if (io_orbital_speed > 0)
            io_orbital_speed *= SPEED_INCREMENT;
        if (callisto_orbital_speed > 0)
            callisto_orbital_speed *= SPEED_INCREMENT;
        if (titan_orbital_speed > 0)
            titan_orbital_speed *= SPEED_INCREMENT;
      break;
      case '.':
        console.log('SPEED UP PRESSED');
        if (mercury_orbital_speed > 0) 
            mercury_orbital_speed /= SPEED_INCREMENT;
        if (venus_orbital_speed > 0)
            venus_orbital_speed /= SPEED_INCREMENT;
        if (earth_orbital_speed > 0)
            earth_orbital_speed /= SPEED_INCREMENT;
        if (mars_orbital_speed > 0)
            mars_orbital_speed /= SPEED_INCREMENT;
        if (jupiter_orbital_speed > 0)
            jupiter_orbital_speed /= SPEED_INCREMENT;
        if (saturn_orbital_speed > 0) 
            saturn_orbital_speed /= SPEED_INCREMENT;
        if (uranus_orbital_speed > 0)
            uranus_orbital_speed /= SPEED_INCREMENT;
        if (neptune_orbital_speed > 0)
            neptune_orbital_speed /= SPEED_INCREMENT;
        if (moon_orbital_speed > 0)
            moon_orbital_speed /= SPEED_INCREMENT;
        if (europa_orbital_speed > 0)
            europa_orbital_speed /= SPEED_INCREMENT;
        if (ganymede_orbital_speed > 0)
            ganymede_orbital_speed /= SPEED_INCREMENT;
        if (io_orbital_speed > 0)
            io_orbital_speed /= SPEED_INCREMENT;
        if (callisto_orbital_speed > 0)
            callisto_orbital_speed /= SPEED_INCREMENT;
        if (titan_orbital_speed > 0)
            titan_orbital_speed /= SPEED_INCREMENT; 
      break;
      case 'p':
          console.log('PAUSE PRESSED');
        if (pause == false){
            mercury_orbital_speed = 0;
            venus_orbital_speed = 0;
            earth_orbital_speed = 0;
            mars_orbital_speed = 0;
            jupiter_orbital_speed = 0; 
            saturn_orbital_speed = 0;
            uranus_orbital_speed = 0;
            neptune_orbital_speed = 0;
            moon_orbital_speed = 0;
            io_orbital_speed = 0;
            europa_orbital_speed = 0;
            ganymede_orbital_speed = 0;
            callisto_orbital_speed = 0;
            titan_orbital_speed = 0;
            pause = true;
         }
        else {
            mercury_orbital_speed = EARTH_YEAR * 4;
            venus_orbital_speed = EARTH_YEAR * 2;
            earth_orbital_speed = EARTH_YEAR;
            mars_orbital_speed = EARTH_YEAR / 2;
            jupiter_orbital_speed = EARTH_YEAR / 4; 
            saturn_orbital_speed = EARTH_YEAR / 6;
            uranus_orbital_speed = EARTH_YEAR / 8;
            neptune_orbital_speed = EARTH_YEAR / 9;
            moon_orbital_speed = EARTH_YEAR / 2;
            io_orbital_speed = EARTH_YEAR * 1/5;
            europa_orbital_speed = EARTH_YEAR * 2;
            ganymede_orbital_speed = EARTH_YEAR * 3;
            callisto_orbital_speed = EARTH_YEAR / 2;
            titan_orbital_speed = EARTH_YEAR;
            pause = false; 
      }
      break;
      case 'k':
          controls.movementSpeed -= 200;
      break;
      case 'l':
          controls.movementSpeed += 200;
      break;
    
    }
  };



function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function render() {

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children, true);

    //console.log(intersects);

	// for ( let i = 0; i < intersects.length; i ++ ) {

	// 	//intersects[ i ].object.material.color.set( 0xff0000 );
    //     console.log('AAAAAAAA');
    //     console.log(intersects[i]);
    //     console.log('NAME:');
    //     console.log(intersects[i].object.name);

	// }

	renderer.render( scene, camera );

}

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

    // add orbital lines
    const orbitalLines = new THREE.Group();

    const mercuryLine = new OrbitLine(MERCURY_SEMIMAJOR_AXIS - ORBIT_LINE_HALF_WIDTH, MERCURY_SEMIMAJOR_AXIS + ORBIT_LINE_HALF_WIDTH, 64);
    const venusLine = new OrbitLine(VENUS_SEMIMAJOR_AXIS - ORBIT_LINE_HALF_WIDTH, VENUS_SEMIMAJOR_AXIS + ORBIT_LINE_HALF_WIDTH, 64);
    const earthLine = new OrbitLine(EARTH_SEMIMAJOR_AXIS - ORBIT_LINE_HALF_WIDTH, EARTH_SEMIMAJOR_AXIS + ORBIT_LINE_HALF_WIDTH, 64);
    const marsLine = new OrbitLine(MARS_SEMIMAJOR_AXIS - ORBIT_LINE_HALF_WIDTH, MARS_SEMIMAJOR_AXIS + ORBIT_LINE_HALF_WIDTH, 64);
    const jupiterLine = new OrbitLine(JUPITER_SEMIMAJOR_AXIS - ORBIT_LINE_HALF_WIDTH, JUPITER_SEMIMAJOR_AXIS + ORBIT_LINE_HALF_WIDTH, 64);
    const saturnLine = new OrbitLine(SATURN_SEMIMAJOR_AXIS - ORBIT_LINE_HALF_WIDTH, SATURN_SEMIMAJOR_AXIS + ORBIT_LINE_HALF_WIDTH, 64);
    const uranusLine = new OrbitLine(URANUS_SEMIMAJOR_AXIS - ORBIT_LINE_HALF_WIDTH, URANUS_SEMIMAJOR_AXIS + ORBIT_LINE_HALF_WIDTH, 64);
    const neptuneLine = new OrbitLine(NEPTUNE_SEMIMAJOR_AXIS - ORBIT_LINE_HALF_WIDTH, NEPTUNE_SEMIMAJOR_AXIS + ORBIT_LINE_HALF_WIDTH, 64);

    orbitalLines.add(
        mercuryLine.getMesh(),
        venusLine.getMesh(),
        earthLine.getMesh(),
        marsLine.getMesh(),
        jupiterLine.getMesh(),
        saturnLine.getMesh(),
        uranusLine.getMesh(),
        neptuneLine.getMesh(),
    );

    scene.add(orbitalLines);

    // add planets
    const solarSystem = new THREE.Group();
    scene.add(solarSystem);

    const sun = new Planet(SUN_RADIUS, 32, 16, 'resources/sun.jpg', 0, 'sun');
    const mercury = new Planet(MERCURY_RADIUS, 32, 16, 'resources/mercury.jpg', MERCURY_SEMIMAJOR_AXIS, 'mercury')
    const venus = new Planet(VENUS_RADIUS, 32, 16, 'resources/venus.jpg', VENUS_SEMIMAJOR_AXIS, 'venus');
    const earth = new Planet(EARTH_RADIUS, 32, 16, 'resources/earth.jpeg', EARTH_SEMIMAJOR_AXIS, 'earth');
    const mars = new Planet(MARS_RADIUS, 32, 16, 'resources/mars.webp', MARS_SEMIMAJOR_AXIS, 'mars');
    const jupiter = new Planet(JUPITER_RADIUS, 32, 16, 'resources/jupiter.jpg', JUPITER_SEMIMAJOR_AXIS, 'jupiter');
    const saturn = new Planet(SATURN_RADIUS, 32, 16, 'resources/saturn.jpg', SATURN_SEMIMAJOR_AXIS, 'saturn');
    const uranus = new Planet(URANUS_RADIUS, 32, 16, 'resources/uranus.jpg', URANUS_SEMIMAJOR_AXIS, 'uranus');
    const neptune = new Planet(NEPTUNE_RADIUS, 32, 16, 'resources/neptune.jpg', NEPTUNE_SEMIMAJOR_AXIS, 'neptune');
    
    // add moons
    const moon = new Planet(4, 32, 16, 'resources/moon.jpg', 30, 'moon');
    const moonMesh = moon.getMesh();
    const moonGroup = new THREE.Group();

    const io = new Planet(10, 32, 16, 'resources/Io.webp', 120, 'io');
    const ioMesh = io.getMesh();
    const ioGroup = new THREE.Group();

    const europa = new Planet(10, 32, 16, 'resources/europa.jpg', 150, 'europa');
    const europaMesh = europa.getMesh();
    const europaGroup = new THREE.Group();

    const ganymede = new Planet(10, 32, 16, 'resources/ganymede.jpg', 190, 'ganymede');
    const ganymedeMesh = ganymede.getMesh();
    const ganymedeGroup = new THREE.Group();

    const callisto = new Planet(10, 32, 16, 'resources/callisto.jpg', 220, 'callisto');
    const callistoMesh = callisto.getMesh();
    const callistoGroup = new THREE.Group();

    const titan = new Planet(10, 32, 16, 'resources/titan.jpg', 190, 'titan');
    const titanMesh = titan.getMesh();
    const titanGroup = new THREE.Group();
   

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
    earthMesh.add(moonGroup);
    let marsSystem = new THREE.Group();
    marsSystem.add(marsMesh);
    let jupiterSystem = new THREE.Group();
    jupiterSystem.add(jupiterMesh);
    jupiterMesh.add(ioGroup);
    jupiterMesh.add(europaGroup);
    jupiterMesh.add(ganymedeGroup);
    jupiterMesh.add(callistoGroup);
    let saturnSystem = new THREE.Group();
    saturnSystem.add(saturnMesh);
    saturnMesh.add(titanGroup);
    let uranusSystem = new THREE.Group();
    uranusSystem.add(uranusMesh);
    let neptuneSystem = new THREE.Group();
    neptuneSystem.add(neptuneMesh);

    moonGroup.add(moonMesh);
    europaGroup.add(europaMesh);
    ioGroup.add(ioMesh);
    ganymedeGroup.add(ganymedeMesh);
    callistoGroup.add(callistoMesh);
    titanGroup.add(titanMesh);

    solarSystem.add(sunSystem);
    solarSystem.add(mercurySystem);
    solarSystem.add(venusSystem);
    solarSystem.add(earthSystem);
    solarSystem.add(marsSystem);
    solarSystem.add(jupiterSystem);
    solarSystem.add(saturnSystem);
    solarSystem.add(uranusSystem);
    solarSystem.add(neptuneSystem);

    addStars()

    camera.position.z = 2500;
    camera.position.y = 400;

    controls.movementSpeed = camera_speed;
    controls.domElement = renderer.domElement;
    controls.rollSpeed = Math.PI / 8;
    controls.autoForward = false;
    controls.dragToLook = true;

    document.body.addEventListener('keydown', keyPressed);
    
    function animate() {
        sunMesh.rotation.y += 0.001;
        earthSystem.rotation.y += earth_orbital_speed;
        mercurySystem.rotation.y += mercury_orbital_speed;
        venusSystem.rotation.y += venus_orbital_speed;
        marsSystem.rotation.y += mars_orbital_speed;
        jupiterSystem.rotation.y += jupiter_orbital_speed;
        saturnSystem.rotation.y += saturn_orbital_speed;
        uranusSystem.rotation.y += uranus_orbital_speed;
        neptuneSystem.rotation.y += neptune_orbital_speed;
        ioGroup.rotation.y += io_orbital_speed;
        europaGroup.rotation.y += europa_orbital_speed;
        ganymedeGroup.rotation.y += ganymede_orbital_speed;
        callistoGroup.rotation.y += callisto_orbital_speed;
        titanGroup.rotation.y += titan_orbital_speed;
        moonGroup.rotation.y += moon_orbital_speed;

        requestAnimationFrame( animate );
        controls.update(clock.getDelta());
        stats.update();
        render();
    }

    animate();
}

window.addEventListener( 'pointermove', onPointerMove );

main();
