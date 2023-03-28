const botconfig = require("../config.json");
const Discord = require("discord.js");
const { request } = require('undici');


function msToMinutesAndSeconds(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

module.exports.run = async (client, message, args) => {

    let tetris_users = ["grindstones", "tock15", "bolegnese", "lphbusted"]
    // let tetris_users = ["bolegnese"]

    let text = "";
    
    let result_times = {}
    for(let i = 0; i < tetris_users.length ; i++){
        const result = await request('https://ch.tetr.io/api/users/' + tetris_users[i] + "/records");
        const json = await result.body.json()
        // console.log(json.data["records"]["40l"]["record"]["endcontext"]["finalTime"])
        result_times[tetris_users[i]] = json.data["records"]["40l"]["record"]["endcontext"].finalTime
    }
    //https://ch.tetr.io/api/users/lphbusted
    const sortable = Object.fromEntries(
        Object.entries(result_times).sort(([,a],[,b]) => a-b)
    );
    
    // console.log(sortable);
    for(key in sortable){
        text += (key + " - " + msToMinutesAndSeconds(sortable[key])) + "\n"
    }

    let embed = new Discord.EmbedBuilder()
    .setTitle("Tetrio")
    .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley")
    .addFields( {name: 'Top 40L Scores in discord', value: text})
    return message.channel.send({embeds: [embed]})

}

module.exports.help = {
    name: "leaderboard",
    aliases: ["lb", "top"],
}

