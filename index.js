const Discord = require("devland.js")
const config = require("./config")
const { Store } = require("devland.js")
const fs = require("fs")

const prefix = config.prefix

const client = new Discord.Client({
    intents: [Discord.IntentFlags.ALL],

    connect: true,

    token: config.token,

    presence: {
        activities: [{
            name: "devland.js",
            type: 5,
                }],
        status: 'idle'
            }
})

this.commands = new Store()

const subFolders = fs.readdirSync(`./commands`)
for(const category of subFolders){
    const files = fs.readdirSync(`./commands/${category}`)
    for(const file of files){
        const command = require(`./commands/${category}/${file}`)
        this.commands.set(command.data.name, command)
        console.log(`${subFolders} Commande ${file}✅`);
    }
}
  
  client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
  
    if (!this.commands.has(commandName)) return;
  
    const command = this.commands.get(commandName);
  
    try {
      command.run(message, args);
    } catch (error) {
      console.log(error);
      message.reply('Une erreur s\'est produite lors de l\'exécution de la commande.');
    }
});

client.on('ready', () => {
    console.log(`${client.user.tag} est connecté`) 
})
