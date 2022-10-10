/*
    This script tests the WearTShirt function.
    Set the TestToken k/v pair in your config.json to use.
    Supply asset id as your first arg.
*/

import { createRequire } from "module"
import AvatarApi from "../../api/avatar.js"

// lazy
const require = createRequire(import.meta.url)
let config = require("../../config.json")

let targetAssetId = process.argv[2]

let avatar = new AvatarApi(config.TestToken)
avatar.WearTShirt(targetAssetId).then(() => console.log("Worn"))

setTimeout(() => {
    avatar.RemoveTShirt(targetAssetId).then(() => console.log("Removed"))
},10000)