import { Events } from "discord.js"
import registerCommand from "../registerCommand.js"

export const event=(client)=>{
    client.on(Events.ClientReady,client=>{
        registerCommand(client)

        console.log(`${client.user.username} giriş yaptı`)
    })
}