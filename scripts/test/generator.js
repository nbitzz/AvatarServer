/*
    This script tests the Uploader.
    Set the TestToken k/v pair in your config.json to use.
*/

import { createRequire } from "module"
import GeneratorApi from "../../api/generator.js"
import fs from "fs"

// lazy
const require = createRequire(import.meta.url)
let config = require("../../config.json")

let generator = new GeneratorApi(
    config.Uploader.Image.Width,
    config.Uploader.Image.Height,
    config.Uploader.Text.Font,
    config.Uploader.Text.FontSize,
    config.Uploader.Text.LeftPadding,
    config.Uploader.Text.Color
)

if (process.argv[2] == "-genall") {
    config.Uploader.TextPrompts.forEach((v,x) => {
        generator.Generate(v,`./../../generated/images/${x}.png`)
    })
} else {
    generator.Generate("Test 1","./../../generated/images/gentest1.png")
    generator.Generate("Test, test\nTwo lines","./../../generated/images/gentest2.png")
    generator.Generate("Play\nAmong\nUs","./../../generated/images/gentest3.png")
}