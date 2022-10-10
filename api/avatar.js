import axios from "axios"
import { getCSRF } from "./util.js"

export default class AvatarApi {
    token = null;

    constructor(token) {
        this.token = token;
    }

    /**
     * 
     * @param {string} Id 
     * @description Equips an item based on asset ID
     */

    async WearTShirt(Id) {
        return axios.post(`https://avatar.roblox.com/v1/avatar/assets/${Id}/wear`,undefined,{headers:{
            Cookie: `.ROBLOSECURITY=${this.token}`,
            "X-CSRF-Token":await getCSRF(this.token)
        }})
    }

    /**
     * 
     * @param {string} Id 
     * @description Removes an item based on asset ID
     */

    async RemoveTShirt(Id) {
        return axios.post(`https://avatar.roblox.com/v1/avatar/assets/${Id}/remove`,undefined,{headers:{
            Cookie: `.ROBLOSECURITY=${this.token}`,
            "X-CSRF-Token":await getCSRF(this.token)
        }})
    }
}