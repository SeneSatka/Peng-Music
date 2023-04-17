import { Events } from "discord.js"


export const event =(client)=>{
    client.on(Events.InteractionCreate,interaction=>{
        const command = client.commands.get(interaction.commandName)
        if(!command)return
        try{
            command.data.execute(interaction)
        }catch(err){
            console.log(err)
        }
    })
}