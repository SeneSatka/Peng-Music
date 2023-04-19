import { createAudioPlayer, createAudioResource, joinVoiceChannel ,NoSubscriberBehavior} from "@discordjs/voice"
import { EmbedBuilder, SlashCommandBuilder } from "discord.js"
import play from "play-dl"

export const data={
    name:"play",
    description:"Muzik çalar.",
   async execute(interaction){
        if(!interaction.member.voice.channel)return interaction.reply("Ses kanalında değilsin")
        interaction.deferReply({ephemeral:true})
      
        const connection=joinVoiceChannel({
            channelId:interaction.member.voice.channelId,
            guildId:interaction.guildId,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator
        })
        const player= createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        })
        const video =await play.search(interaction.options.getString("ara"),{limit:1})
        const stream = await play.stream(video[0].url)
        const resource = createAudioResource(stream.stream,{
            inputType:stream.type
        })
        connection.subscribe(player)
        player.play(resource)
        const süre = video[0].durationRaw.split(":")
        const response = new EmbedBuilder()
        .setAuthor({name:video[0].title,iconURL:"https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_youtube-512.png"})
        .addFields(
            {name:"Kullanıcı", value:`${interaction.member}`,inline:true},
            {name:"Süre", value:`${süre[0]}dk ${süre[1]}sn`,inline:true},
            {name:"Görüntülenme", value:`\`\`${video[0].views}\`\``,inline:true}
            )
        .setTimestamp()
        .setImage(video[0].thumbnails[0].url)
        .setFooter({text:"Şimdi dinliyor",iconURL:interaction.member.displayAvatarURL()})
        interaction.editReply({embeds:[response]})


    
    }
} 

export const slash_data=new SlashCommandBuilder()
.setName(data.name)
.setDescription(data.description)
.addStringOption(option=>option
.setName("ara")
.setDescription("Video arar")
.setRequired(true))