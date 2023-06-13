import { EventEmitter } from "events";

export default class Time extends EventEmitter {
    constructor() {
        //gives access to stuff in eventEmitter
        super();
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        //Time between each frame (in miliseconds? [emulates 60 fps])
        this.delta = 16;

        this.update();
    }

    update() {
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        this.emit("update");
        //We don't want more requestAnimFrame in other files (use EventEmitter)
        window.requestAnimationFrame(() => this.update());
    }
}