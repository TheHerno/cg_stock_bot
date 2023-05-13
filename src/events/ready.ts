import { botCache } from "../../mod.ts"
import { cache } from "https://deno.land/x/discordeno@v7.0.0/src/utils/cache.ts"

botCache.eventHandlers.ready = function () {
  console.log(`[READY] Bot is online and ready in ${cache.guilds.size} guild(s)!`)
}
