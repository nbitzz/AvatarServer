/*
    This script tests the Uploader.
    Set the TestToken k/v pair in your config.json to use.
    Add image to generated/images named TestImage.png.
*/

import { createRequire } from "module"
import UploaderApi from "../../api/uploader.js"
import fs from "fs"

// lazy
const require = createRequire(import.meta.url)
let config = require("../../config.json")

let uploader = new UploaderApi(config.TestToken)
uploader.UploadTShirt("../../generated/images/TestImage.png","upload").then((str) => {
    console.log(`TShirt AssetId: ${str}`)
})