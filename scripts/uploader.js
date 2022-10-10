import { createRequire } from "module"
import UploaderApi from "../api/uploader.js"
import GeneratorApi from "../api/generator.js"
import fs from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

function sleep(time) {
    return new Promise((res,rej) => {
        setTimeout(() => res(),time)
    })
}

(async function() {
    console.log("AvatarServer Uploader")

    const require = createRequire(import.meta.url)
    const __dirname = dirname(fileURLToPath(import.meta.url));
    let config = require("../config.json")

    let generator = new GeneratorApi(
        config.Uploader.Image.Width,
        config.Uploader.Image.Height,
        config.Uploader.Text.Font,
        config.Uploader.Text.FontSize,
        config.Uploader.Text.LeftPadding,
        config.Uploader.Text.Color
    )

    let uploader = new UploaderApi(config.Uploader.BotToken)

    if (config.Uploader.TextPrompts) {
        console.log("Clearing images dir")
        if (fs.existsSync(__dirname+"/../generated/images")) {
            fs.rmSync(__dirname+"/../generated/images",{recursive:true,force:true})
        }
        fs.mkdirSync(__dirname+"/../generated/images")
        console.log("Generating images...")
        for (let i = 0; i < config.Uploader.TextPrompts.length; i++) {
            await generator.Generate(config.Uploader.TextPrompts[i],__dirname+`/../generated/images/${i}.png`)
        }
    }

    console.log("Uploading images")

    fs.readdir(__dirname+"/../generated/images",async (err,files) => {
        if (err) {console.error(err); return}

        let images = []
        let lastUpload = 0

        for (let i = 0; i < files.length; i++) {
            let tsId = await uploader.UploadTShirt(`${__dirname}/../generated/images/${files[i]}`,`AvatarServer: ${Math.random().toString().slice(2,6)}`)
            images.push(tsId)
            console.log(`uploaded ${tsId}`)
            console.log(`waiting`)
            await sleep(6500)
        }

        fs.writeFileSync(__dirname+"/../generated/tshirt.json",JSON.stringify(images))
    })
})()