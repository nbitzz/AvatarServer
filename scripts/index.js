import fs from "fs"
import { dirname } from "path"
import { createRequire } from "module"
import { fileURLToPath } from "url"
import AvatarApi from "../api/avatar.js"

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url));
let config = require("../config.json")

let avatar = new AvatarApi(config.AvatarServer.UserToken)

let tshirts = []

fs.readFile(__dirname+"/../generated/tshirt.json",(err,buf) => {
    if (err) {console.error(err)}
    if (buf.toString()) tshirts = JSON.parse(buf.toString())
    avatar.WearTShirt(tshirts[Math.floor(Math.random()*tshirts.length)])
    setInterval(() => avatar.WearTShirt(tshirts[Math.floor(Math.random()*tshirts.length)]).catch(() => {}),config.AvatarServer.Interval*1000)
})