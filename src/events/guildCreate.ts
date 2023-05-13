import { Guild } from "https://deno.land/x/discordeno@v7.0.0/src/structures/guild.ts"
import logger from "https://deno.land/x/discordeno@v7.0.0/src/utils/logger.ts"

export const guildCreate = (guild: Guild) => {
  logger.info(`[EVENT=GuildCreate]: ${guild.name} with ${guild.memberCount} members.`)
}
