const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission(`MUTE_MEMBERS`)) return message.react('❌');
    let mute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!mute) return message.channel.send(`Sorry, <@${message.author.id}> you did not define a user to mute`);
    if(mute.hasPermission(`MANAGE_MESSAGES`)) return message.channel.send('Sorry, I couldn\'t mute this user since they have the `MANAGE_MESSAGES` permission');
    let role = message.guild.roles.find("name", "Muted");
    if(!role){
        try {
            muterole = message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (err) {
            console.log(err);
        }

        let channel = message.guild.channels.find(`name`, `logs`);
        let embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} logs`, client.user.displayAvatarURL)
        .addField(`Moderator`, `<@${message.author.id}>`)
        .addField(`User`, `@<${mute.id}>`)
        .addField(`Punishment`, `mute`)
        await(mute.addRole(muterole.id));
            channel.send(embed);
    }
};