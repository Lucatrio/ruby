const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const logging = require('./logging.js');

config.token = process.env.TOKEN;

client.on("ready", () => {
  console.log(`${client.user.username} has logged in the database`);
  client.user.setActivity(`over my r! prefix`, { type: "WATCHING" });
});
// This loop reads the /cmd/ folder and attaches each event file to the appropriate event.
fs.readdir("./cmd/moderation/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./cmd/moderation/${file}`);
    let eventName = file.split(".")[0];
    console.log(`MODERATION - ${file} has loaded`);
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {

  const mention = new RegExp(`^<@!?${client.user.id}> `);
  const prefix = message.content.match(mention) ? message.content.match(mention)[0] : 'r!';

  if (message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let modcommandFile = require(`./cmd/moderation/${command}.js`);
    modcommandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }

});
client.login(config.token);