const Discord = require('discord.js');
const config = require('config');
const Gamedig = require('gamedig');

const client = new Discord.Client();

//this can support a (theoretically) unlimited number of servers.
//just make sure you call queryServer for each one.

const token = config.get('token');
const server1IP = config.get('server1IP');
const server1Port = config.get('server1Port');
const channelName = config.get('channelName');
const adminPassword = config.get('adminPassword');
const server1Name = config.get('server1Name');
const server1URL = config.get('server1URL')


//this is the default date, which can be changed
var currentByYear = new Date(config.get('currentByYear'));

client.on('message', (msg) => {
    if(msg == config.get('commands.getPlayersCommand')){
        console.log('Message recived!');
        queryServer(server1IP, server1Port, channelName, server1Name, msg, 15844367, server1URL);
    }
    if(msg == config.get('commands.getStarWarsDateCommand')){
        console.log('Date command received!');

        var starWarsDate = formatSwDate();

        channel = client.channels.get(channelName);
        channel.send(starWarsDate);
        msg.delete();
    }
    if(msg.content.includes(config.get('commands.setStarWarsDateCommand') + " " + adminPassword)){

        console.log('Set date command received!');
        
        var [isValid, date] = isDateValid(msg.content);

        channel = client.channels.get(channelName);
        console.log(isValid);
        if(isValid){
            currentByYear = new Date(date);
            channel.send("New BY date is: " + currentByYear);
        }else{
            channel.send("Date has to be in the Following Format: YYYY-MM-DD . Please try again.");
        }
        msg.delete();
    }
})

function isDateValid(message){
    toBeStripped = config.get('commands.setStarWarsDateCommand') + " " + adminPassword + " ";
    date = message.replace(toBeStripped, '');

    let re = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

    if(re.test(date) == true){
        return [true, date];
    }else{
        return [false, date];
    }
}

function formatSwDate(){
    var now = new Date();
    var yearsSince = now.getFullYear() - currentByYear.getFullYear();
    var formattedYear = yearsSince.toString();
    var formattedMonth = addTrailingZeroes(now.getMonth());
    var formattedHour = addTrailingZeroes(now.getHours());
    var formattedMinute = addTrailingZeroes(now.getMinutes());
    var formattedSecond = addTrailingZeroes(now.getSeconds());

    var starWarsDate = formattedYear + '.' + formattedMonth + 'ABY - ' + formattedHour + formattedMinute + '/' + formattedSecond;

    return starWarsDate;
}

function addTrailingZeroes(number){
    if(number < 10){
        var result = '0' + number.toString();
        return result;
    }
    return number.toString();
}

function queryServer(IP, port, channelID, serverName, msg, embedColour, serverURL){
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
                        .setURL(serverURL)
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