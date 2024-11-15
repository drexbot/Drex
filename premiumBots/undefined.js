//require("http").createServer((req, res) => res.end(process.version)).listen()

const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const Discord = require("discord.js");
const colors = require("colors");
const { promisify } = require("util");
const { glob } = require("glob");

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

const path = require("path")
var scriptName = path.basename(__filename);

// ==================== المتغيرات
const Token = "MTI1ODA0NDY1MTg5MDQxMzYxOA.GF0MWs.DfwUP6lo5yfVs8Fh4DIKFkuIWoEEepK791yIcY"
// ==================== تسجيل الدخول للبوت
client.login(Token).catch((e) => {
  console.warn("[Error] Token error at : " + scriptName)
})

module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("../config.json");
const emoji = require("../emoji.json");
client.emoji = require("../emoji.json");
client.replys = require("../replys.json");
client.guild = require("../schemas/Guild");
client.premium = require("../schemas/Premium");

client.gloabalCommands = new Collection();
client.adminCommands = new Collection();
client.premiumCommands = new Collection();

// Enmap Data Base
const db = require("quick.db");


// Initializing the project
require("../handler")(client);

process.on("uncaughtException", err => {
  return;
})
process.on('warning', (warning) => {
  // console.log(warning.stack);
  return;
})
process.on("unhandledRejection", err => {
  return;
})

process.on("rejectionHandled", error => {
  return;
});