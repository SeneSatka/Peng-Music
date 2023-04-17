import { SlashCommandBuilder } from "discord.js"

export const data={
    name:"ping",
    description:"Ping yanıtlar",
    execute(interaction){
        interaction.reply("Pong")
    }
} 

export const slash_data=new SlashCommandBuilder()
.setName(data.name)
.setDescription(data.description)