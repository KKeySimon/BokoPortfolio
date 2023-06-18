import Experience from "../Experience.js";

import * as THREE from "three"
import GSAP from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach(child => {
            if (child.type==="RectAreaLight") {
                this.rectLight = child;
            }
        })
        GSAP.registerPlugin(ScrollTrigger);
        
        //this.setPath();
        this.setSmoothScroll();
        this.setScrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            disableRaf: true });
        GSAP.ticker.add(asscroll.update);
        ScrollTrigger.defaults({
            scroller: asscroll.containerElement });
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            }});
    
    
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
    
        requestAnimationFrame(() => {
            asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
            
        });
        return asscroll;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger() {
        // create
        let mm = GSAP.matchMedia();

        mm.add("(min-width: 800px)", () => {
            // desktop setup code here...
            console.log("fired desktop");
            this.room.scale.set(0.35, 0.35, 0.35);

            //first-section
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                }
            });
            this.firstMoveTimeline.to(this.room.position, {
                x: () => {
                    return this.sizes.width * 0.0014
                }
            });

            //second-section
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                }
            })
            .to(this.room.position, {
                x: () => {
                    return 2.4;
                },
                z: () => {
                    return this.sizes.height * 0.0064;
                }
            }, "same")
            .to(this.room.scale, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
            }, "same")
            .to(this.rectLight, {
                width: 0.3 * 8,
                height: 0.3 * 8,
            }, "same");
            //Third-section
            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                }
            }).to(this.camera.orthographicCamera.position, {
                y: 1,
                x: -3.5,
            }, "same")
            .to(this.room.position, {
                x: () => {
                    return -0.5;
                },
                z: () => {
                    return this.sizes.height * 0.0032;
                }
            }, "same").to(this.room.scale, {
                x: 0.8,
                y: 0.8,
                z: 0.8,
            }, "same");
        });

        mm.add("(max-width: 799px)", () => {
            // mobile setup code here...
            console.log("fired mobile");
            this.room.scale.set(0.15, 0.15, 0.15);

            //first-section
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                }
            }).to(this.room.scale, {
                x: 0.2,
                y: 0.2,
                z: 0.2,
            });

            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                }
            }).to(this.room.scale, {
                x: 0.7,
                y: 0.7,
                z: 0.7,
            }, "same").to(
                this.rectLight,
                {
                    width: 0.3 * 3.4,
                    height: 0.4 * 3.4,
                },
                "same"
            ).to(
                this.room.position, {
                    x: 2,
                },
                "same"
            ).to(this.camera.orthographicCamera.position, {
                x: 0.15,   
                y: 5,
            }, "same");

            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                }
            });
        });

        mm.add("(min-width: 0px)", () => {
            //all
            this.secondPartTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "center center",
                }
            });

            this.room.children.forEach(child => {
                if (child.name === "RugFloor") {
                    this.first = GSAP.to(child.position, {
                        x: -1.6471,
                        y: 0.49075,
                        z: 4.1419,
                        ease: "back.out(2)",
                        duration: 1,
                    })
                }

                if (child.name === "Flag") {
                    this.second = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2)",
                        duration: 0.5,
                    })
                }

                if (child.name === "Floor_Items") {
                    this.third = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.3,
                    })
                }

                if (child.name === "Table") {
                    this.fourth = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.3,
                    })
                }

                if (child.name === "Bed") {
                    this.fifth = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.3,
                    })
                }

                if (child.name === "FloorSecond") {
                    this.sixth = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2)",
                        duration: 0.3,
                    })
                }

                if (child.name === "FloorFirst") {
                    this.seventh = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2)",
                        duration: 0.3,
                    })
                }

                if (child.name === "RugFloor") {
                    this.eighth = GSAP.to(child.position, {
                        x: -1.6471,
                        y: 0.49075,
                        z: 4.1419,
                        ease: "back.out(2)",
                        duration: 0.3,
                    })
                }

                if (child.name === "Shelf") {
                    this.ninth = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.3,
                    })
                }

                if (child.name === "Computer") {
                    this.tenth = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.3,
                    })
                }

                if (child.name === "Body") {
                    this.eleventh = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.3,
                    })
                }

                if (child.name === "Cube") {
                    this.twelvth = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.3,
                    })
                }
            });
            this.secondPartTimeline.add(this.first, "-=0.05");
            this.secondPartTimeline.add(this.eighth, "-=0.05");
            this.secondPartTimeline.add(this.sixth, "-=0.05");
            this.secondPartTimeline.add(this.seventh, "-=0.05");
            this.secondPartTimeline.add(this.second, "-=0.05");
            
        
        });
    }

    resize() {
        
    }

    update() {
    
    }

    // setPath() {
    //     console.log(this.room)
    //     this.timeline = new GSAP.timeline();
    //     this.timeline.to(this.room.position, {
    //         x: () => { 
    //             return this.sizes.width * 0.0012 
    //         },
    //         scrollTrigger: {
    //             trigger: ".first-move",
    //             markers: true,
    //             start: "top top",
    //             end:"bottom bottom",
    //             scrub: 1.5,
    //             invalidateOnRefresh: true,
    //         },
    //     });
    // }
}