import { createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice"
import { SlashCommandBuilder } from "discord.js"
import ytdl from "ytdl-core"

export const data={
    name:"play",
    description:"Muzik çalar.",
    execute(interaction){
        if(!interaction.member.voice.channel)return interaction.reply("Ses kanalında değilsin")
        const music = ytdl(interaction.options.getString("ara"),{filter:"audioonly"})
        const connection=joinVoiceChannel({
            channelId:interaction.member.voice.channelId,
            guildId:interaction.guildId,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator
        })
        const player= createAudioPlayer()
        const resource = createAudioResource(music)
        connection.subscribe(player)
        player.play(resource)
    
    }
} 

export const slash_data=new SlashCommandBuilder()
.setName(data.name)
.setDescription(data.description)
.addStringOption(option=>option
.setName("ara")
.setDescription("Video arar")
.setRequired(true))