const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);







// This is the needed event to use the welcome!
client.on('guildMemberAdd', async newMember => {
    // IMPORTANT NOTE: Make Sure To Use async and rename bot to client or whatever name you have for your bot events!
    const welcomeChannel = newMember.guild.channels.cache.find(channel => channel.name === 'the channel name here, make sure the ')
    welcomeChannel.send('Input your message here, if you want an embed then do a "let msgEmbed = new Discord.messageEmbed  /  and input the title and all the embed stuff, customize the message as much as you want!"')
const strigalog = new Discord.MessageEmbed()
      .setAuthor(newMember.guild.name)
  .setDescription("**Hoşgeldin! <@" + newMember + "> Seninle \`" + newMember.guild.memberCount + "\` Kişiyiz.\n\nMüsait olduğunda Confirmed Odalarından Birine Geçip Kaydını Yaptırabilirsin. <@&787736310990503954> \n\n<@&787736310990503954> seninle ilgilenicektir. \n\nHesabın Oluşturulma Tarihi: " + moment(newMember.user.createdAt).format("`YYYY DD MMMM dddd`") +  "\n\n"  +  + "\n\nTagımızı alarak ` ☸  ` bize destek olabilirsin.**\n")
   .setImage("https://tenor.com/view/discord-loading-spin-gif-11230336")

    // Optional Part (you can modify those extra things if you'd like!) :D
    let msgEmbed = new Discord.MessageEmbed()
    .setTitle (`This is a title for a test`)
    // welcomeChannel.send(msgEmbed) | (that's commented so you know to use it only if you want an embed and also don't delete the other "welcomeChannel.send" just change it in there and say "welcomeChannel.send(msgEmbed)" and define the msgEmbed variable as a let and define it above the "welcomeChannel.send" so the bot will check and see that it's defined so errors won't happen!
    if (newMember.bot) return; // checks if it's a bot that joined so the channel won't be spammed with "*Discord Bot* has joined the server" and stuff like that, so check that.
    const newbieRole = newMember.roles.cache.find(role => role.name === 'Role Name here') // that was to define the role to give newbies (you can name the variable however you want that doesn't matter!)
    newMember.roles.add(newbieRole.id) // this will add the role to that member!
    // All the things that are under the "Optional Part" are 100 % Optional! No Requirement to use those, just use it if you want and they won't affect the welcome message at all!
})
