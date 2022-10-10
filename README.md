# AvatarServer
Simple Node.js server that changes a T-Shirt on your Roblox avatar at a set interval. An avatar uploading tool is also available.

## Prerequisites

- node-canvas (for tshirt generating)
- form-data (for tshirt uploading tool)
- cheerio (for tshirt uploading tool)
- axios

## Configs
Your config.json should look something like this:

```json
{
    "Uploader": {
        "BotToken":"_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|",
        "TextPrompts":[
            "my\ncode\nsucks"
        ],
        "Text":{
            "Font":"Consolas",
            "FontSize":42,
            "LeftPadding":50,
            "Color":"#000000"
        },
        "Image":{
            "Width":500,
            "Height":500
        }
    },
    "AvatarServer": {
        "UserToken":"_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|",
        "Interval":7200
    }
}
```

and should be placed in this folder (`AvatarServer`).

Do note that `Uploader.Text.Font` and `Uploader.Text.FontSize` are both just pumped into a string at the end of the day, so you *may* break it if you're not careful.

## Not using text?

No worries - just remove the `Uploader.TextPrompts` array, and the uploader will upload all of the images in `generated/images`. Make sure they're supported by Roblox.

## Running AvatarServer

To start AvatarServer, run `npm run start`. To start the uploader, run `npm run uploader`. If you'd like to add on to AvatarServer, use the js files found in `./api`. (I'll document it later.)