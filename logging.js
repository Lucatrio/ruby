const Discord = require('discord.js');
const client = new Discord.Client();

config.token = process.env.TOKEN;

client.on("message", async message => {

client.on("guildMemberAdd", (GuildMember) => {
    let channel = message.guild.channels.find("name", "logs");
    if(!channel) return message.channel.send(`Please create a channel called logs`);

    let embed = new Discord.RichEmbed()
        .setAuthor(`${GuildMember.displayName} (${GuildMember.id})`, GuildMember.user.displayAvatarURL)
        .setDescription(`Why did you leave us :cry:`)
        .setTimestamp(new Date())
        .setFooter(`${client.user.username} logs`);
    channel.send(embed);

client.on("guildMemberRemove", (GuildMember) => {
    let channel = message.guild.channels.find("name", "logs");
    if(!channel) return message.channel.send(`Please create a channel called logs`);

    let embed = new Discord.RichEmbed()
        .setAuthor(`${GuildMember.displayName} (${GuildMember.id})`, GuildMember.user.displayAvatarURL)
        .setDescription(`Thank you for joining us on ${message.guild}!`)
        .setTimestamp(new Date())
        .setFooter(`${client.user.username} logs`);
    channel.send(embed);
});
});
});
client.login(config.token)