const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) message.react('❌');

    let banned = message.mentions.members.first();
    if(!banned) return message.channel.send(`<@${message.author.id}>, please mention a user of this guild`);
    if(!banned.kickable) return message.channel.send(`Sorry <@${message.author.id}>, <@${banned.id}> cannot be kicked`); 
    let reason = args.slice(1).join(' ');
    let channel = message.guild.channels.find("name", "logs");
    if(!channel) return message.channel.send(`Please, create a channel called logs`); 
    if(!reason) reason = 'Breaking Rules';
    let embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} logs`, client.user.displayAvatarURL)
        .addField(`Moderator`, `<@${message.author.id}>`)
        .addField(`User`, `@<${banned.id}>`)
        .addField(`Punishment`, `kick`)
        .addField(`Reason`, reason);

    await banned.kick(reason)
        .catch(error => message.reply(`<@${message.author.id}>, stall pass since there was a fatal error`));
        message.react('👌');
    channel.send(embed);
};