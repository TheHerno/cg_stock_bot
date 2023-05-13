import { everyMinute } from "https://deno.land/x/deno_cron@v1.0.0/cron.ts"
import { botCache } from "../../mod.ts"
import { getDolarCrypto, getDolarBlue } from "../utils/dolar.ts"
import { sendMessage } from "https://deno.land/x/discordeno@v7.0.0/src/handlers/channel.ts"
import { Member } from "https://deno.land/x/discordeno@v7.0.0/src/structures/member.ts"
import { Channel } from "https://deno.land/x/discordeno@v7.0.0/src/structures/channel.ts"

interface checkDolarTask {
  member: Member
  channel: Channel
}

const latestValues = {
  dolar_blue: 0,
  dolar_crypto: 0,
}

everyMinute(() => checkDolarTask())

const taskLists: Array<checkDolarTask> = []

const checkDolarTask = () => {
  const date = new Date()
  const day = date.getDay()
  const hour = date.getHours()
  if (day === 0 || day === 6 || hour < 9 || hour > 16) return // only check on weekdays from 9 to 16
  taskLists.forEach(async (task, _index) => {
    const dolar_blue = await getDolarBlue()
    const dolar_crypto = await getDolarCrypto()

    if (dolar_blue !== latestValues.dolar_blue) {
      latestValues.dolar_blue = dolar_blue
      sendMessage(task.channel, {
        embed: {
          title: `CAMBIO EN EL DOLAR BLUE`,
          description: `El blue subió a $${dolar_blue}`,
        },
        content: task.member.mention,
      })
    }
    if (dolar_crypto !== latestValues.dolar_crypto) {
      latestValues.dolar_crypto = dolar_crypto
      sendMessage(task.channel, {
        embed: {
          title: `CAMBIO EN EL DOLAR CRYPTO`,
          description: `El blue subió a $${dolar_crypto}`,
        },
        content: task.member.mention,
      })
    }
  })
}

botCache.commands.set(`trackDolar`, {
  name: `trackDolar`,
  guildOnly: true,
  execute: (message, _args, _guild) => {
    const member = message.member()!
    taskLists.push({ member, channel: message.channel })
    sendMessage(message.channel, {
      content: `Siguiendo el precio del dolar blue y dolar cripto a pedido de ${member.mention}.
        Se notificará cuando cambie el valor.`,
    })
    return
  },
})
