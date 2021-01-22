import * as THREE from './libraries/three.module.js';

import {
  OBJLoader
} from './libraries/OBJLoader.js';

/*
 * Create a scene
 */ 
var scene = new THREE.Scene();

/*
 * Create a camera
 */ 
camera = new THREE.PerspectiveCamera (3, window.innerWidth/window.innerHeight, 1, 10000);
camera.position.y = 160;
camera.position.z = 400;
camera.lookAt (new THREE.Vector3(0,0,0));

/*
 * Create a light
 */ 
var pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.set( 25, 50, 25 );
scene.add( pointLight );

/*
 * Create materials
 */ 
var material1 = new THREE.MeshBasicMaterial( { 
  color: "#000000",
  wireframe:true,
  transparent:true 
} );

var material2 = new THREE.MeshStandardMaterial( {
  color: 0xff0051,
  metalness: 0,
  roughness: 1
} );

/*
 * Create geometries
 */ 

var geometry = new THREE.SphereGeometry( 5, 1, 1 );

var cube01 = new THREE.Mesh( geometry, material1 );
cube01.position.set (0, 0, 0);
scene.add( cube01 );

var cube02 = new THREE.Mesh( geometry, material2 );
cube02.position.set (0, 0, 0);
scene.add( cube02 );

// instantiate a loader
const loader = new OBJLoader();

/*
 * Load 3D model
 */ 
loader.load(
	'models/young_boy_head.obj',
	function ( object ) {
		scene.add( object );
	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( 'An error happened' );
	}
);


/*
 * Create a renderer
 */ 
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor("#0b0a08");                          // Configure renderer clear color
renderer.setSize( window.innerWidth, window.innerHeight );  // Configure renderer size
document.body.appendChild( renderer.domElement );           // Append Renderer to DOM

/*
 * Create controls
 */ 
controls = new THREE.OrbitControls (camera, renderer.domElement);

/*
 * Render the scene
 */ 
var render = function () {

  //Update Orbit Controls
  controls.update();

  requestAnimationFrame( render );

  cube01.rotation.x += 0.0008;
  cube01.rotation.y += 0.0008;

  cube02.rotation.x += 0.001;
  cube02.rotation.y += 0.001;

  // Render the scene
  renderer.render(scene, camera);
};

render();