import { SlashCommandBuilder } from "discord.js"
import { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior } from "@discordjs/voice"


export const data={
    name:"stop",
    description:"Müziği kapatır",
    execute(interaction){
        
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator
        })
        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        })
        connection.subscribe(player)

        player.stop()
        interaction.reply("Müzik kapatıldı.")
    }
}

export const slash_data= new SlashCommandBuilder()
.setName(data.name)
.setDescription(data.description)