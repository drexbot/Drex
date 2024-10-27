const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const Discord = require("discord.js");
const colors = require("colors");
const { promisify } = require("util");
const { glob } = require("glob");
const CustomCommand = require("./schemas/CustomCommand");
const User1 = require("./schemas/Econo");
const Guild = require("./schemas/Guild");

const globPromise = promisify(glob)

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
     GatewayIntentBits.GuildMessageTyping,
   GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
     GatewayIntentBits.DirectMessageTyping,
     GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
  ],
  partials: [Partials.Channel],
});



async function login() {
  await client.login("NzczNDgzOTY5Njk3ODA4Mzg1.GL3L94.SDmb54EqbltYFTsbS77W4stchx6nc8RnPSKjys");
}

login();

module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.devCommands = new Collection();
client.config = require("./config.json");
const emoji = require("./emoji.json");
client.emoji = require("./emoji.json");
client.replys = require("./replys.json");
client.guild = require("./schemas/Guild");
client.premium = require("./schemas/Premium");
client.CustomCommand = require("./schemas/CustomCommand");

client.gloabalCommands = new Collection();
client.adminCommands = new Collection();
client.premiumCommands = new Collection();

//  Data Base
const db = require("quick.db");

client.login("NzczNDgzOTY5Njk3ODA4Mzg1.GL3L94.SDmb54EqbltYFTsbS77W4stchx6nc8RnPSKjys").then(() => {
  console.log("Loggin ..!")
}).catch(err => { console.log(err) })

// Initializing the project
require("./handler")(client);

client.on("ready", () => {
  client.user.setPresence({ activities: [{ name: `/help - Protect your server !` }], status: "idle" })
  client.user.setStatus('idle');
  require("./dashboard/index.js")(client);
})
client.on("ready", () => {
  
client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignore bot messages

  const guildSettings = await Guild.findById(message.guild.id);
  if (!guildSettings) return; // If no settings found, skip

  // Handle command1
  if (
    guildSettings.command1Enabled &&
    guildSettings.command1Prefixes.includes(message.content.split(' ')[0]) &&
    !guildSettings.command1BlockedChannels.includes(message.channel.id) &&
    (guildSettings.command1AllowedChannels.length === 0 ||
      guildSettings.command1AllowedChannels.includes(message.channel.id))
  ) {
    message.channel.send(guildSettings.command1Response);
  }

  // Handle command2
  if (
    guildSettings.command2Enabled &&
    guildSettings.command2Prefixes.includes(message.content.split(' ')[0]) &&
    !guildSettings.command2BlockedChannels.includes(message.channel.id) &&
    (guildSettings.command2AllowedChannels.length === 0 ||
      guildSettings.command2AllowedChannels.includes(message.channel.id))
  ) {
    message.channel.send(guildSettings.command2Response);
  }
});
client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.guild) return;

  const customCommands = await CustomCommand.find({ guildId: message.guild.id });
  
  customCommands.forEach(cmd => {
    if (message.content.startsWith(cmd.prefix + cmd.commandName)) {
      if (cmd.contentEnabled) {
        message.channel.send(cmd.contentText);
      }

      if (cmd.embedEnabled) {
        const embed = new Discord.EmbedBuilder()
          .setTitle(cmd.embed.title)
          .setDescription(cmd.embed.description)
          .setImage(cmd.embed.image)
          .setThumbnail(cmd.embed.thumbnail)
          .setColor("#4c4748");
        message.channel.send({ embeds: [embed] });
      }
    }
  });
})

});
process.on("uncaughtException", err => {
  console.log(err)
  return;
})
process.on('warning', (warning) => {
  // console.log(warning.stack);
  return;
})
process.on("unhandledRejection", err => {
  console.log(err)
  return;
})

process.on("rejectionHandled", err => {
  console.log(err)
  return;
});

// ========= تسجيل الدخول الى البوتات
const fs = require("fs");
const path = require("path")

const dirPathPremium = path.join(__dirname, 'premiumBots')

setTimeout(function() {
  fs.readdir(dirPathPremium, (err, files) => {
    files.forEach((PremiumFile) => {
      function bruhBc() {
        let File = require("./premiumBots/" + PremiumFile)
      }
      bruhBc()
    })
  })
}, 5000)

setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("Client Login")
  }
}, 30000);