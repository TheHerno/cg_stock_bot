import { botCache } from "../../mod.ts"
import checkStock from "../utils/checkStock.ts"
import { sendMessage } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v7/src/handlers/channel.ts"

botCache.commands.set(`check`, {
  name: `check`,
  guildOnly: true,
  execute: (message, _args, guild) => {
    const author = message.member()!
    console.log(author.mention)
    const products = message.content.split(" ")
    products.shift() // delete the !check
    products.forEach(async (product) => {
      sendMessage(message.channel, {
        content: `Checkeando stock del producto ${product}`,
      })
      const stock = await checkStock(product)
      sendMessage(message.channel, {
        embed: {
          type: "rich",
          title: stock ? `HAY STOCK` : `NO HAY STOCK :(`,
          description: stock ? `Click para ir a comprar` : undefined,
          url: `https://compragamer.com/producto/${product}`,
        },
        content: author.mention,
      })
    })
    return
  },
})
