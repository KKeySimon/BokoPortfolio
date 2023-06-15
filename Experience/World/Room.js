import Experience from "../Experience.js";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import * as THREE from "three";
import GSAP from "gsap";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        //we know by the time world calls for new Room(),
        //all assets must have loaded in order for World to trigger
        //this means we can just call items.room as defined in assets.js
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };
        
        this.setModel();
        this.onMouseMove();
    }
    
    setModel() {
        
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            } 

            console.log(child);

            if (child.name === "Computer") {
                console.log(this.resources.items.screen)
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            if (child.name === "RugFloor") {
                child.position.x = -0.50456;
                child.position.y = 0.49075;
                child.position.z = 2.9994;
            }

            if (child.name === "Flag" ||
                child.name === "Floor_Items" ||
                child.name === "Table" ||
                child.name === "Bed" ||
                child.name === "FloorSecond" ||
                child.name === "FloorFirst" ||
                child.name === "Shelf" ||
                child.name === "Computer" ||
                child.name === "Body" ||
                child.name === "Cube"
            ) {
                child.scale.set(0, 0, 0);
            }
            
        });

        const width = 1;
        const height = 1;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(-3.0178, 3.6586, 0.40913);
        rectLight.rotation.y = Math.PI / 4 + Math.PI;
        this.actualRoom.add(rectLight);

        //const rectLightHelper = new RectAreaLightHelper(rectLight);

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.3, 0.3, 0.3);   
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = (e.clientX - window.innerWidth / 2) / window.innerWidth * 2;
            this.lerp.target = this.rotation * 0.2;
        });
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