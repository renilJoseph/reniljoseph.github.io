

			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var container, stats;

			var camera, scene, renderer;

			var meshes = [];
			var leafs = [];

			var mouseX = 0, mouseY = 0;

			var N_OBJECTS = 2000;

			var SCREEN_WIDTH = window.innerWidth,
				SCREEN_HEIGHT = window.innerHeight;

			var windowHalfX = SCREEN_WIDTH / 2;
			var windowHalfY = SCREEN_HEIGHT / 2;

			var clock = new THREE.Clock();
			var leafObj;

			init();
			// animate();


			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
				camera.position.z = 4;

				scene = new THREE.Scene();
				scene.add( camera );

				var light = new THREE.PointLight( 0xEAF044, 1, 5500 );
				light.position.set( 4000, 0, 0 );
				scene.add( light );

				var light = new THREE.PointLight( 0xEAF044, 1, 5500 );
				light.position.set( -4000, 0, 0 );
				scene.add( light );

				var light = new THREE.PointLight( 0xEAF044, 2, 3000 );
				light.position.set( 0, 0, 0 );
				scene.add( light );

				

				// var path = "textures/cube/SwedishRoyalCastle/";
				// var format = '.jpg';
				// var urls = [
				// 		path + 'px' + format, path + 'nx' + format,
				// 		path + 'py' + format, path + 'ny' + format,
				// 		path + 'pz' + format, path + 'nz' + format
				// 	];

				// var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
				// reflectionCube.format = THREE.RGBFormat;

				var material = new THREE.MeshPhongMaterial( { specular: 0x333333, shininess: 100, /*envMap: reflectionCube,*/ combine: THREE.MixOperation, reflectivity: 0.1, perPixel: true } );
				material.wrapAround = true;
				material.wrapRGB.set( 0.5, 0.5, 0.5 );
				material.side = THREE.DoubleSide;

				geometry = new THREE.TorusGeometry( 0.5, 0.3, 32, 16, Math.PI * 1.25 );
				//geometry = new THREE.TorusKnotGeometry( 0.5, 0.124, 128, 4, 8, 1 );

				console.log( geometry.faces.length,  geometry.faces.length * N_OBJECTS );

				var group = new THREE.Object3D();

				var dd = 8000;

				// for ( var i = 0; i < N_OBJECTS; i ++ ) {

				// 	var mesh = new THREE.Mesh( geometry, material );

				// 	mesh.position.x = THREE.Math.randFloatSpread( dd );
				// 	mesh.position.y = THREE.Math.randFloatSpread( dd );
				// 	mesh.position.z = THREE.Math.randFloatSpread( dd );

				// 	mesh.rotation.x = Math.random() * 360 * ( Math.PI / 180 );
				// 	mesh.rotation.y = Math.random() * 360 * ( Math.PI / 180 );
				// 	mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 150 + 100;

				// 	group.add( mesh );

				// 	meshes[ i ] = mesh;

				// }

				// group.position.y = 5000;
				//scene.add( group );






				var light = new THREE.AmbientLight( 0xF4B752 ); // soft white light
				scene.add( light );
				var directionalLight = new THREE.DirectionalLight( 0xFFAB00);
				scene.add( directionalLight );

				addHemisphereLight(scene);
        		addDirectionalLight(scene);
		
				    function addHemisphereLight(scene) {
			        var hemiLight = new THREE.HemisphereLight(0xff4444, 0x44ff44, 0.6);
			        hemiLight.position.copy(new THREE.Vector3(0, 500, 0));
			        hemiLight.name = 'hemiLight';
			        scene.add(hemiLight);
			    }
			    function addDirectionalLight(scene) {
			        var directionalLight = new THREE.DirectionalLight();
			        directionalLight.position.copy(new THREE.Vector3(70, 40, 50));
			        directionalLight.castShadow = true;
			        directionalLight.shadowCameraVisible = false;
			        directionalLight.shadowCameraNear = 25;
			        directionalLight.shadowCameraFar = 200;
			        directionalLight.shadowCameraLeft = -50;
			        directionalLight.shadowCameraRight = 50;
			        directionalLight.shadowCameraTop = 50;
			        directionalLight.shadowCameraBottom = -50;
			        directionalLight.shadowMapWidth = 2048;
			        directionalLight.shadowMapHeight = 2048;
			        directionalLight.visible = true;
			        directionalLight.name = 'dirLight';
			        scene.add(directionalLight);
			    }


				// var objectLoader = new THREE.ObjectLoader();
				// objectLoader.load("models/leaf3/paddle.json", function ( obj ) {
				//  	scene.add( obj );
				// } );

				

				// var loader = new THREE.JSONLoader();
				// // load a resource
				// loader.load(
				// 	// resource URL
				// 	'models/leaf3/paddle.json',

				// 	// onLoad callback
				// 	function ( geometry, materials ) {
				// 		var material = materials[ 0 ];
				// 		var object = new THREE.Mesh( geometry, material );
				// 		scene.add( object );
				// 	},

				// 	// onProgress callback
				// 	function ( xhr ) {
				// 		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
				// 	},

				// 	// onError callback
				// 	function( err ) {
				// 		console.log( 'An error happened' );
				// 	}
				// );


				// var objectLoader = new THREE.ObjectLoader();
    //         	objectLoader.load('models/leaf1/paddle.json', addthree1ToScene);

		  //       function addthree1ToScene( geometry, materials ) 
		  //       {
		  //           var materiall = new THREE.MeshFaceMaterial( materials ); 


		  //           for ( var i = 0; i < materials.length; i ++ )
		  //           {
		  //            var material = materials[i];
		  //               material.side = THREE.DoubleSide;
		  //           }

		  //           three1 = new 	THREE.Mesh( geometry, materiall );


		  //           three1.scale.set( 0.8, 0.8, 0.8 );
		  //           three1.position.set(50,15.5,0);

		  //           scene.add( three1 );
		  //       }


				var objectLoader = new THREE.ObjectLoader();
				objectLoader.load("models/leaf3/paddle.json", function ( obj ) {
				 	//scene.add( obj );
				 	leafObj = obj;
				 	//leafObj.scale.set(0.2,0.2,0.2);
				 	for ( var i = 0; i < 500; i ++ ) {

						var leaf = obj.clone();

						leaf.position.x = THREE.Math.randFloatSpread( dd );
						leaf.position.y = THREE.Math.randFloatSpread( dd );
						leaf.position.z = THREE.Math.randFloatSpread( dd );

						leaf.rotation.x = Math.random() * 360 * ( Math.PI / 180 );
						leaf.rotation.y = Math.random() * 360 * ( Math.PI / 180 );
						// leaf.scale.x = leaf.scale.y = leaf.scale.z = Math.random() * 150 + 100;
						leaf.scale.x = leaf.scale.y = leaf.scale.z = 3;

						group.add( leaf );

						leafs[ i ] = leaf;

						}
					console.log('leafs '+leafs.length);

					group.position.y = 5000;
					scene.add(group);

				 	animate();
				} );
				
				






				// RENDERER

				renderer = new THREE.WebGLRenderer( { clearColor: 0x050505, clearAlpha: 1, antialias: true, alpha: true } );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				renderer.sortObjects = false;

				renderer.gammaInput = true;
				renderer.gammaOutput = true;
				renderer.physicallyBasedShading = true;
				renderer.shadowMapEnabled = true;
				renderer.setClearColor( 0x6698FF, 0 );

				container.appendChild( renderer.domElement );

				// STATS

				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				stats.domElement.style.zIndex = 100;

				//stats.domElement.children[ 0 ].children[ 0 ].style.color = "#eee";
				stats.domElement.children[ 0 ].style.background = "transparent";
				//stats.domElement.children[ 0 ].children[ 1 ].style.display = "none";

				//container.appendChild( stats.domElement );

				// EVENTS

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchmove', onTouchMove, false );
				window.addEventListener( 'resize', onWindowResize, false );

			}

			//

			function onWindowResize( event ) {

				SCREEN_WIDTH = window.innerWidth;
				SCREEN_HEIGHT = window.innerHeight;

				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

				camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
				camera.updateProjectionMatrix();

				windowHalfX = SCREEN_WIDTH / 2;
				windowHalfY = SCREEN_HEIGHT / 2;

			}

			function onDocumentMouseMove(event) {

				mouseX = ( event.clientX - windowHalfX ) * 10;
				mouseY = ( event.clientY - windowHalfY ) * 10;

			}

			function onTouchMove( event ) {

				event.preventDefault();

				var touches = event.touches;
				var touch = touches[ 0 ];

				mouseX = ( touch.clientX - windowHalfX ) * 10;
				mouseY = ( touch.clientY - windowHalfY ) * 10;

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				//stats.update();

			}

			function render() {

				//camera.position.x += ( 0.125 * mouseX - camera.position.x ) * .0125;
				//camera.position.y += ( - 0.125 * mouseY - camera.position.y ) * .0125;

				camera.lookAt( scene.position );

				var delta = clock.getDelta();


				//leafObj.rotation.x += 0.3 * delta;
				//leafObj.rotation.y += 0.5 * delta;

				for ( var i = 0; i < 500; i ++ ) {

					var leaf = leafs[ i ];

					// leaf.rotation.x += 0.3 * delta;
					leaf.rotation.y += 0.5 * delta;

					leaf.position.y = ( leaf.position.y - 500 * delta ) % 8000;

				}






				// for ( var i = 0; i < N_OBJECTS; i ++ ) {

				// 	var mesh = meshes[ i ];

				// 	mesh.rotation.x += 0.3 * delta;
				// 	mesh.rotation.y += 0.5 * delta;

				// 	mesh.position.y = ( mesh.position.y - 150 * delta ) % 8000;

				// }



				renderer.render( scene, camera );

				//console.log( renderer.info.render.faces, renderer.info.render.calls );

			}



