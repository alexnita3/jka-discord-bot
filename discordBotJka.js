const Discord = require('discord.js');
const token = '*insert bot token*';
const Gamedig = require('gamedig');

const client = new Discord.Client();

//this can support a (theoretically) unlimited number of servers.
//just make sure you cann queryServer for each one.

const server1IP = '*insert server IP';
const server1Port = '*insert server port*';
const channelName = '*insert channel ID*';

client.on('message', (msg) => {
    if(msg == '!players'){
        console.log('Message recived!');
        queryServer(server1IP, server1Port, channelName, 'Server Name', msg, 15844367);
    }
})

function queryServer(IP, port, channelID, serverName, msg, embedColour){
    console.log('Querying server...');
    Gamedig.query({
        type: 'swjk',
        host: IP,
        port: port
    }).then((state) => {
        console.log("Here's what the server returned:");
        console.log(state);
        
        var playerNumber = state.players.length;
        var playerList = '';
        if(playerNumber != 0){
            state.players.forEach(player => {
                playerList += (player.name + '\n');
            });
        }
        
        if(playerNumber == 0){
            playerList = "No one! 😱";
        }

        console.log('Generating embed');
        const embed = new Discord.RichEmbed()
                        .setTitle('Players on ' + serverName + ':')
                        .setColor(embedColour)
                        .setURL('https://imperiumjkarp.enjin.com/')
                        .addField(playerNumber + '/32 players online', playerList, true)
                        .addField('Map: ', state.map)
                        .setFooter("Developed by: Alexa Mary Nita. \nhttps://github.com/alexnita3/jka-discord-bot");
        console.log('This is the embed that was generated:');
        console.log(embed);

        /*
        this can be used to send the message instead, which will allow the bot to
        receive and respond to PMs.
        ACTIVATE AT YOU OWN RISK - it will allow people who have left your sever PM it
        */

        //msg.reply(embed).then(msg => {
        //    msg.delete(180000)
        //});

        channel = client.channels.get(channelID);
        channel.send(embed);
        console.log('Channel Found!');

        msg.delete();

    }).catch((error) => {
        console.log('Server is offline')
        msg.reply('Server is offline').then(msg => {
            msg.delete(180000)
        });
    });
}

setInterval(() => {
    Gamedig.query({
        type: 'swjk',
        host: server1IP,
        port: server1Port
    }).then((state) => {
        var playerNumber = state.players.length + '/32';
        client.user.setActivity(playerNumber + ' | Map: ' + state.map);

    }).catch((error) => {
        console.log('Server is offline')
        client.user.setActivity("Server is offline :'(");
    });
    
    //cleanup all bot messages from the channel
    channel = client.channels.get(channelName);
    channel.fetchMessages().then(messages => messages.array().forEach(
        message => message.author.equals(client.user) && message.delete()
    ));
}, 30000);

client.on('ready', () => {
    console.log('bot is now connected');
});
client.login(token);