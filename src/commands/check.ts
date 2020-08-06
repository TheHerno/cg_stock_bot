import { botCache } from "../../mod.ts"
import { sendMessage } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v7/src/handlers/channel.ts"

botCache.commands.set(`check`, {
  name: `check`,
  guildOnly: true,
  execute: (message, _args, guild) => {
    const products = message.content.split(" ")
    products.shift() // delete the !check
    products.forEach((product) => {
      sendMessage(message.channel, {
        embed: {
          title: `Checkeando stock del producto ${products}`,
        },
      })
    })
    return sendMessage(message.channel, {
      embed: {
        title: `Checkeando stock del producto ${products}`,
      },
    })
  },
})
