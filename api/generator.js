import fs from "fs"
import { createCanvas } from "canvas"

export default class GeneratorApi {
    width = null;
    height = null;

    constructor(width,height,font,fontsize,padding,color) {
        this.width = width || 500;
        this.height = height || 500;
        this.font = font || "monospace";
        this.fontsize = fontsize || 36;
        this.padding = padding || 45
        this.color = color || "#000000"
    }

    /**
     * 
     * @param {string} text 
     * @param {string} path
     * @description Generates an image and places it in the specified directory
     */

    async Generate(text,path) {
            return new Promise((resolve,reject) => {
            let canvas = createCanvas(this.width,this.height)
            let ctx = canvas.getContext("2d")
            ctx.font = `${this.fontsize}pt '${this.font}'`
            ctx.textAlign = "left"
            ctx.fillStyle = this.color

            // This is just bad. Don't do this.
            ctx.fillText(text,this.padding,(this.height/2)+(this.fontsize*(text.split("\n").length == 1 ? 1 : -text.split("\n").length+1)/2))

            fs.writeFile(path,canvas.toBuffer("image/png"),(err) => {
                if (err) reject(err);
                resolve()
            })
        })
    }
}