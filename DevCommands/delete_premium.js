const { Client, CommandInteraction } = require("discord.js");
const Guild = require('../../schemas/Guild')
const db = require('quick.db')
const { ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const Premium = require("../../schemas/Premium");
const fs = require("fs");

module.exports = {
  name: "delete_premium",
  description: "To delete premium bot",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'bot_id',
      type: ApplicationCommandOptionType.String,
      description: "Put the bot Id .. !",
      required: true
    }
  ],

  run: async (client, interaction, args, Discord, emoji, color, discordCode) => {

    const bot = await Premium.findById(interaction.options.getString('bot_id'));

    if(interaction.user.id !== "919931389346975744") return;

    if(!bot || bot.use == "false") return interaction.followUp({ content: `> **The Bot not found ..**` })

    fs.unlink("./premiumBots/" + bot._id + ".js", (err) => {
      if (err) {
      }
    })

    await Premium.findByIdAndUpdate(bot._id, {
      guildId: "",
      use: "false",
      activity: "",
      owner: "",
      theme: "yellow",
    },
      {
        upsert: true
      })

    interaction.followUp({ content: `> **Done** ..`})
  },
};