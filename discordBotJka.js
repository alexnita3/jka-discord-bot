const Discord = require('discord.js');
const token = 'NzY2MzkzMzM0OTQ4MTY3NzEx.X4itaQ.VEmqeYxMz5pYd1XN5jjwWrswWKY';
const Gamedig = require('gamedig');

const client = new Discord.Client();

//this can support a (theoretically) unlimited number of servers.
//just make sure you cann queryServer for each one.

const server1IP = '198.50.210.67';
const server1Port = '29070';
const channelName = '671453734919995427';
const adminPassword = 'password';
//this is the default date, which can be changed
var currentByYear = new Date("2020-10-05");

client.on('message', (msg) => {
    if(msg == '!players'){
        console.log('Message recived!');
        queryServer(server1IP, server1Port, channelName, 'Server Name', msg, 15844367);
    }
    if(msg == '!date'){
        var now = new Date();
        var yearsSince = now.getFullYear() - currentByYear.getFullYear();
        yearsSince = yearsSince.toString();
        var formattedMonth = addTrailingZeroes(now.getMonth());
        var formattedHour = addTrailingZeroes(now.getHours());
        var formattedMinute = addTrailingZeroes(now.getMinutes());
        var formattedSecond = addTrailingZeroes(now.getSeconds());

        var starWarsDate = yearsSince + '.' + formattedMonth + 'ABY - ' + formattedHour + formattedMinute + '/' + formattedSecond;

        channel = client.channels.get(channelName);
        channel.send(starWarsDate);
        msg.delete();
    }
    if(msg.content.includes('!setDate ' + adminPassword)){
        helperString = '!setDate ' + adminPassword + " ";
        date = msg.content.replace(helperString, '');

        let re = /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[1-9])|(1[0-2]))\:([0-5][0-9])((\s)|(\:([0-5][0-9])\s))([AM|PM|am|pm]{2,2})))?$/;

        channel = client.channels.get(channelName);
        if(re.test(date) == true){
            currentByYear = new Date(date);
            channel.send("New BY date is: " + currentByYear);
        }else{
            channel.send("Date has to be in the Following Format: YYYY/MM/DD . PLease try again.");
        }
        msg.delete();
    }
})

function addTrailingZeroes(number){
    if(number < 10){
        var result = '0' + number.toString();
        return result;
    }
    return number.toString();
}

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