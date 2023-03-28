const botconfig = require("../config.json");
const Discord = require("discord.js");



module.exports.run = async (client, message, args) => {
    let embed = new Discord.EmbedBuilder()
    .setTitle("Commands")
    .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley")
    .addFields( {name: 'User Commands', value: '\`help\` -  Check\`'},
                {name: 'Admin', value: '\`purge\` - Mass remove messages '})
    return message.channel.send({embeds: [embed]})

}

module.exports.help = {
    name: "help",
    aliases: ["?"],
}