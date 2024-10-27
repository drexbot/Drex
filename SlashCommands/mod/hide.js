const { Client, CommandInteraction } = require("discord.js");
const Guild = require('../../schemas/Guild')
const db = require('quick.db')
const ms = require('ms')
const { ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: "hide",
  description: "To hide channel",
  type: ApplicationCommandType.ChatInput,
  usage: 'hide `channel:[channel]`',
  admin: true,
  options: [
    {
      name: 'channel',
      description: 'provide channel which you want to hide',
      type: ApplicationCommandOptionType.Channel,
      required: false,
    }
  ],
  run: async (client, interaction, args, Discord, emoji, color, discordCode) => {
     let guildSettings = await Guild.findById(interaction.guild.id);

        // Check if avatar command is enabled
        if (!guildSettings.hideCommandEnabled) {
            return interaction.reply({ content: "This command is currently disabled for this server.", ephemeral: true });
        }
    const owner = await interaction.guild.fetchOwner();
    let langD = await Guild.findById(interaction.guild.id);
    let lang = client.replys.ar;
    if (langD) {
      if (langD.language) {
        lang = client.replys[langD.language]
      }
    }
    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ content: `${lang.permErr}` });

    const channel = interaction.options.getChannel('channel') || interaction.channel;
    if (!channel.permissionsFor(interaction.guild.id).has(Discord.PermissionsBitField.Flags.ViewChannel)) {
      interaction.reply(`${lang.hide.err}`)
    } else {
      channel.permissionOverwrites.set([
        {
          id: interaction.guild.id,
          deny: [Discord.PermissionsBitField.Flags.ViewChannel],
        },
      ]);
      interaction.reply(`${lang.hide.done}`)
    }

  },
};