import { every15Minute } from "https://deno.land/x/deno_cron/cron.ts"
import { botCache } from "../../mod.ts"
import checkStock from "../utils/checkStock.ts"
import { sendMessage } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v7/src/handlers/channel.ts"
import { Member } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/src/structures/member.ts"
import { Channel } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/src/structures/channel.ts"

interface StockTask {
  product: string
  member: Member
  channel: Channel
}

every15Minute(() => checkStockTask())

let taskLists: Array<StockTask> = []

const checkStockTask = async () => {
  taskLists.forEach(async (task, index) => {
    const stock = await checkStock(task.product)
    if (stock) {
      sendMessage(task.channel, {
        embed: {
          title: `HAY STOCK`,
          description: `${task.product}`,
          url: `https://compragamer.com/producto/${task.product}`,
        },
        content: task.member.mention,
      })
      taskLists.splice(index, 1)
    }
  })
}

botCache.commands.set(`track`, {
  name: `track`,
  guildOnly: true,
  execute: (message, _args, guild) => {
    const member = message.member()!
    const products = message.content.split(" ")
    products.shift() // delete the !check
    products.forEach(async (product: string) => {
      taskLists.push({ member, channel: message.channel, product: product })
      sendMessage(message.channel, {
        content: `Siguiendo el estado del stock del producto ${product} a pedido de ${member.mention}.
        Se notificará cuando tenga stock.`,
      })
    })
    return
  },
})
