import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Theme from "./Theme.js";
import Renderer from "./Renderer.js";
import Preloader from "./Preloader.js";

import World from "./World/World.js";

export default class Experience {
    static instance;
    constructor(canvas) {
        if (Experience.instance) {
            //makes it singleton pattern so that not when Camera.js/Renderer.js needs a scene, it doesn't create a new instance of scene
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();

        //when Size is updated, calls resize which also resizes camera & renderer
        this.sizes.on("resize", () => {
            this.resize();
        })

        //when Time is updating, it causes all other files with updates to update as well
        this.time.on("update", () => {
            this.update();
        })
    }
    
    update() {
        this.camera.update();
        this.renderer.update();
        this.world.update();
    }

    resize() {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }
}