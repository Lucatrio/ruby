const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('BAN_MEMBERS')) message.react('❌');

    let banned = message.mentions.members.first();
    if(!banned) return message.channel.send(`<@${message.author.id}>, please mention a user of this guild`);
    if(!banned.bannble) return message.channel.send(`Sorry <@${message.author.id}>, <@${banned.id}> cannot be banned`); 
    let reason = args.slice(1).join(' ');
    let channel = message.guild.channels.find("name", "logs");
    let yes = client.emojis.get("461202062026473472");
    if(!reason) reason = 'Breaking Rules';
    let embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} logs`, client.user.displayAvatarURL)
        .addField(`Moderator`, `<@${message.author.id}>`)
        .addField(`User`, `@<${banned.id}>`)
        .addField(`Punishment`, `ban`)
        .addField(`Reason`, reason);

    await banned.ban(reason)
        .catch(error => message.channel.send(`<@${message.author.id}>, stall pass since there was a fatal error`));
        message.react('👌');
    channel.send(embed);
};
