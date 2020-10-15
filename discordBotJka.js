const Discord = require('discord.js');
const token = '*insert bot token here*';
const Gamedig = require('gamedig');

const client = new Discord.Client();

const server1IP = '*insert Server IP*';
const server1Port = '*insert server port*';

client.on('message', (msg) => {
    if(msg == '!players'){
        Gamedig.query({
            type: 'swjk',
            host: server1IP,
            port: server1Port
        }).then((state) => {
            console.log(state);
            
            var playerNumber = state.players.length;
            var playerList = '';
            if(playerNumber != 0){
                state.players.forEach(player => {
                    playerList += (player.name + '\n');
                });
            }
            
            
            if(playerNumber == 0){
                playerList = "No one :'(";
            }

            console.log(playerNumber);
            console.log(playerList);
            console.log(state.map);
            
            const embed = new Discord.RichEmbed()
            .setTitle('Players Server 1:')
            .addField(playerNumber + '/32 players online', playerList, true)
            .addField('Map: ', state.map)
            .setTimestamp()
            .setFooter('Hey heyyyy');
            console.log('here');
            //msg.reply(embed).then(msg => {
            //    msg.delete(180000)
            //});
            channel = client.channels.get('702863101036462094');
            console.log('channel found');
            channel.send(embed);

            msg.delete();

        }).catch((error) => {
            console.log('Server is offline')
            msg.reply('Server is offline').then(msg => {
                msg.delete(180000)
            });
        });
    }
})

setInterval(() => {
    Gamedig.query({
        type: 'swjk',
        host: serverIP,
        port: serverPort
    }).then((state) => {
        var playerNumber = state.players.length + '/32';
        client.user.setActivity(playerNumber + ' | Map: ' + state.map);

    }).catch((error) => {
        console.log('Server is offline')
        client.user.setActivity("Server is offline :'(");
    });
}, 30000);

client.on('ready', () => {
    console.log('bot is now connected');
});
client.login(token);