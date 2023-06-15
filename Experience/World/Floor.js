import Experience from "../Experience.js";

import * as THREE from "three";
import GSAP from "gsap";

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = -Math.PI / 2;
        this.plane.receiveShadow = true;
    }

    resize() {
        
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current, this.lerp.target, this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
    }
}