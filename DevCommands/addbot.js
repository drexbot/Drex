
const { Client, CommandInteraction } = require("discord.js");
const Guild = require('../../schemas/Guild')
const db = require('quick.db')
const { ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const Premium = require("../../schemas/Premium");
const fs = require("fs");
const { GatewayIntentBits, Partials } = require("discord.js");

const client2 = new Client({
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

module.exports = {
  name: "addbot",
  description: "To make premium bot",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'token',
      type: ApplicationCommandOptionType.String,
      description: "Put the bot token .. !",
      required: true
    }
  ],

  run: async (client, interaction, args, Discord, emoji, color, discordCode) => {

    const bot = await Premium.findById(interaction.options.getString('token'));

    if (client.user.id !== "955838703874473984") return;
    if (interaction.user.id !== "955570036616081468") return;

    client2.login(bot)
      .then(async () => {
        const botFind = await Premium.findById(client2.user.id)
        if (botFind) return interaction.followUp(`> **I find the bot ..**`);

        clientName = client2.user.username;
        clientId = client2.user.id;
        avatar = client2.user.displayAvatarURL({ format: "png", size: 1024 });

        await client2.destroy()

        await Premium.findByIdAndUpdate(clientId, {
          _id: clientId,
          guildId: "",
          token: bot,
          use: "false",
          theme: "yellow",
          username: clientName,
          avatar: avatar,
        },
          {
            upsert: true
          })

        interaction.followUp(`> **Done..**`)

      }).catch(() => { })
  },
};