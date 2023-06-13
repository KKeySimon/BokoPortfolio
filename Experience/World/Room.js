import Experience from "../Experience.js";

import * as THREE from "three"

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
        
        this.setModel();
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

                if (child.name === "Screen") {
                    console.log(this.resources.items.screen)
                    child.material = new THREE.MeshBasicMaterial({
                        map: this.resources.items.screen,
                    });
                }
        })

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.3, 0.3, 0.3);   
    }

    resize() {
        
    }

    update() {
        
    }
}