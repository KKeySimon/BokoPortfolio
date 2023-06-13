import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import * as THREE from "three"

export default class Camera {
    constructor() {
        //singleton prevents new experience unless first call
        this.experience = new Experience();
        //grabs sizes that was instantiated by call to Sizes.js in Experience.js
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }
    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.x = 19;
        this.perspectiveCamera.position.y = 14;
        this.perspectiveCamera.position.z = 20;
    }

    createOrthographicCamera() {
        // this.orthographicCamera = new THREE.OrthographicCamera(
        //     (-this.sizes.aspect * this.sizes.frustrum) / 2, 
        //     (this.sizes.aspect * this.sizes.frustrum) / 2, 
        //     this.sizes.frustrum / 2,
        //     -this.sizes.frustrum / 2,
        //     -10,
        //     10
        // );

        this.orthographicCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
        
        this.scene.add(this.orthographicCamera);
        this.helper = new THREE.CameraHelper(this.orthographicCamera);
        this.scene.add(this.helper);

        const size = 20;
        const divisions = 20;

        const gridHelper = new THREE.GridHelper( size, divisions );
        this.scene.add( gridHelper );

        const axesHelper = new THREE.AxesHelper(10);
        this.scene.add(axesHelper);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    resize() {
        //update perspect cam on resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        //update orth cam on resize
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        // console.log(this.perspectiveCamera.position);
        this.controls.update();

        this.helper.matrixWorldNeedsUpdate = true;
        this.helper.update();
        this.helper.position.copy(this.orthographicCamera.position);
        this.helper.position.copy(this.orthographicCamera.rotation);
    }
}