import * as THREE from './libs/three.js-r132/build/three.module.js'; 

document.addEventListener("DOMContentLoaded", () =>  {
	const scene = new THREE.Scene()

	const geometry = new THREE.BoxGeometry (1, 1, 1);
	const material = new THREE.MeshBasicMaterial({color: "#0000FF"});
	const cube = new THREE.Mesh(geometry, material);
	
	scene.add(cube);
	cube.position.set(0, 0, -2);
	cube.rotation.set(0, Math.PI/4, 0);
	
	const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(1, 1, 5);

	 // Set up video
    const video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true; // for iOS compatibility
    video.style.position = "absolute";
    video.style.top = "0";
    video.style.left = "0";
    video.width = 600;
    video.height = 600;

    document.body.appendChild(video);

    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(600, 600);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.background = "transparent"; // optional
    document.body.appendChild(renderer.domElement);


    // Request camera
     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        }).then((stream) => {
            video.srcObject = stream;
        }).catch((err) => {
            alert("Camera access denied or unavailable.");
        });
    } else {
        alert("getUserMedia not supported in this browser.");
    }

    // Animate the scene
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
});



