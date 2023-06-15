import Experience from "../Experience.js";
import GUI from 'lil-gui';
import * as THREE from "three";
import GSAP from "gsap";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        //this.gui = new GUI({ container: document.querySelector(".hero-main") });
        this.obj = {
            colorObj: {r: 255/255, g: 179/255, b: 179/255},
            intensity: 0.78,
        };
        
        this.setSunlight();
        //this.setGUI();
    }

    setGUI() {
        this.gui.addColor(this.obj, "colorObj").onChange(() => {
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
            this.sunLight.intensity = this.obj.intensity;
            this.sunLight.ambientLight = this.obj.intensity;
        })
    }
    
    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffb3b3", 0.78);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);
        
        this.sunLight.position.set(1.5, 5, 3);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffb3b3", 0.78);
        this.scene.add(this.ambientLight);

        GSAP.to(this.sunLight.color, {
            r: 255 / 255,
            g: 179 / 255,
            b: 179 / 255,
        });
        GSAP.to(this.ambientLight.color, {
            r: 255 / 255,
            g: 179 / 255,
            b: 179 / 255,
        });
        GSAP.to(this.sunLight, {
            intensity: 0.78,
        });
        GSAP.to(this.ambientLight, {
            intensity: 0.78,
        });
    }

    switchTheme(theme) {
        if (theme === "dark") {
            GSAP.to(this.sunLight.color, {
                r: 172 / 255,
                g: 170 / 255,
                b: 253 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 172 / 255,
                g: 170 / 255,
                b: 253 / 255,
            });
            GSAP.to(this.sunLight, {
                intensity: 0.1,
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.1,
            });
        } else {
            GSAP.to(this.sunLight.color, {
                r: 255 / 255,
                g: 179 / 255,
                b: 179 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 255 / 255,
                g: 179 / 255,
                b: 179 / 255,
            });
            GSAP.to(this.sunLight, {
                intensity: 0.78,
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.78,
            });
        }
    }

    resize() {
        
    }

    update() {
        
    }
}