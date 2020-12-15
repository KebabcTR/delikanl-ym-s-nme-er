const { MessageEmbed } = require("discord.js");
// module.exports.onLoad = (client) => {}
module.exports.run = (client, message, args) => {
  
  if(!['782286462841520179', '782286463982239824',].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('782286411281858570')) return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(`Başarısız !`).setDescription(`Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta :no: \n \`u!ban @Etiket Sebep\` `))

String.prototype.replaceA = function (find, replace) {
  return this.replace(new RegExp(find, 'g'), replace);
}

const donustur = function(sayi) {
  let gorunum = sayi.toString().replace('0', '0_')
    .replaceA('1', '1_')
    .replaceA('2', '2_')
    .replaceA('3', '3_')
    .replaceA('4', '4_')
    .replaceA('5', '5_')
    .replaceA('6', '6_')
    .replaceA('7', '7_')
    .replaceA('8', '8_')
    .replaceA('9', '9_')
  
  gorunum = gorunum
    .replaceA("0_", '<a:0:782596292257120288>')
    .replaceA("1_", "<a:1:782596292664492043>")
    .replaceA("2_", "<a:2:782596291518660608>")
    .replaceA("3_", "<a:3:782595475978584104>")
    .replaceA("4_", '<a:4:782595482622492672>')
    .replaceA("5_", '<a:5:782595476871839775>')
    .replaceA("6_", '<a:6:782595479024173077>')
    .replaceA("7_", '<a:7:782595477119565845>')
    .replaceA("8_", '<a:8:782595483105099796>')
    .replaceA("9_", '<a:9:782595483137867796>')
  
  return gorunum
}
let tag = "𓄎";
  const booster = message.guild.roles.cache.get("782303047740424194").members.size
const erkek = message.guild.roles.cache.get("782286463982239824").members.size
const kız = message.guild.roles.cache.get("782286462841520179").members.size
  const online = message.guild.members.cache.filter(u => u.presence.status != "offline").size
  const ttag = message.guild.members.cache.filter(m => m.user.username.includes(tag)).size
  const toplam = message.guild.memberCount
  const ses = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b) 

  const embed = new MessageEmbed()
  .setTimestamp()
  .setColor('BLACK')
  .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
  message.channel.send(embed.setDescription(`**<a:likyasb:782891100464611354> Toplam Üye ・ ${donustur(toplam)}
 <a:likyasb:782891100464611354> Aktif Üye ・ ${donustur(online)}
 <a:likyasb:782891100464611354> Kız Üye ・ ${donustur(kız)}
 <a:likyasb:782891100464611354> Erkek Üye ・ ${donustur(erkek)}
 <a:likyasb:782891100464611354> Taglı Üye ・ ${donustur(ttag)}
 <a:likyasb:782891100464611354> Booster Üye ・ ${donustur(booster)}
 <a:likyasb:782891100464611354> Sesteki Üye ・ ${donustur(ses)}**`));
};

  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["say"],
  permLvl: 0,
}

  exports.help = {
  name: 'say'
}