import { botCache } from "../../mod.ts"
import { sendMessage } from "https://deno.land/x/discordeno@v7.0.0/src/handlers/channel.ts"
import { botID } from "https://deno.land/x/discordeno@v7.0.0/src/module/client.ts"

botCache.commands.set(`invite`, {
  name: `invite`,
  execute: function (message) {
    // Replace the permission number at the end to request the permissions you wish to request. By default, this will request Admin perms.
    sendMessage(message.channel, `https://discordapp.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=8`)
  },
})
