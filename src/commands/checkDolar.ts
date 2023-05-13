import { botCache } from "../../mod.ts"
import { getDolarCrypto, getDolarBlue } from "../utils/dolar.ts"
import { sendMessage } from "https://deno.land/x/discordeno@v7.0.0/src/handlers/channel.ts"

botCache.commands.set(`checkDolar`, {
  name: `checkDolar`,
  guildOnly: true,
  execute: async (message, _args, _guild) => {
    const author = message.member()!
    const dolar_blue = await getDolarBlue()
    const dolar_crypto = await getDolarCrypto()
    const dolares = `Dolar Blue: $${dolar_blue} | Dolar Crypto: $${dolar_crypto}`

    sendMessage(message.channel, {
      embed: {
        type: "rich",
        title: "VALORES DEL DOLAR",
        description: dolares,
      },
      content: author.mention,
    })
    return
  },
})
