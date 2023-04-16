import { Client, GatewayIntentBits,Collection } from "discord.js";
import { readdirSync} from "fs"
import "dotenv/config"
const client = new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers]})


readdirSync("./events").forEach(async e=>{
const event = await import(`./events/${e}`).then(e=>e.event)
event(client)
})
client.commands = new Collection()
readdirSync("./commands").forEach(category=>{
    readdirSync(`./commands/${category}`).forEach(async file=>{
        const command = await import(`./commands/${category}/${file}`)
        client.commands.set(command.data.name,command)
    })
})


client.login(process.env.token)