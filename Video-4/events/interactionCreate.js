import { Events } from "discord.js"


export const event =(client)=>{
    client.on(Events.InteractionCreate,interaction=>{
        if(interaction.customId){
            if(interaction.customId=="stop"){
                const command = client.commands.get("stop")
                command.data.execute(interaction)
            }
            else if(interaction.customId.startsWith("play:")){
                const command = client.commands.get("play")
                command.data.execute(interaction)
            }

        }else
        {
        const command = client.commands.get(interaction.commandName)
        if(!command)return
        try{
            command.data.execute(interaction)
        }catch(err){
            console.log(err)
        }
    }
    })
}