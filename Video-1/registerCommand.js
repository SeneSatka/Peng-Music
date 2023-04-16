

export default client =>{
    const commands = client.commands.map(e=>e.slash_data)
    // console.log(commands)
    client.application.commands.set(commands)
}