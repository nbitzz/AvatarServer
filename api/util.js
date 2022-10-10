// This code really sucks.

import axios from "axios"
import fs from "fs"
import {load} from "cheerio"

export async function getCSRF(token) {
    // do something useless
    return axios.post("https://auth.roblox.com/v2/logout",undefined,{
        headers: {
            Cookie: `.ROBLOSECURITY=${token};`
        }
    }).catch((dat) => {
        if (dat.response.headers["x-csrf-token"]) return dat.response.headers["x-csrf-token"];
        else throw new Error('Could not get CSRF!');
    })
}

export async function getUserId(token) {
    return (await axios.get("https://www.roblox.com/my/account/json",{headers:{
        Cookie: `.ROBLOSECURITY=${token}`
    }})).data.UserId
}

export async function readPromise(f) {
    return new Promise((resolve,reject) => {
        fs.readFile(f,(err,buf) => {
            if (err) {
                reject(err)
                return
            }
            resolve(buf)
        })
    })
}

export async function getVerificationToken(url,token) {
    let wp = await axios.get(url,{
        headers:{
            Cookie: `.ROBLOSECURITY=${token}`,
            "X-CSRF-Token":await getCSRF(token),
        },
        responseType:"text"
    })

    return {input:load(wp.data)('input[name=__RequestVerificationToken]').val(),header:wp.headers["set-cookie"].toString().match(/__RequestVerificationToken=(.*?);/)}
}