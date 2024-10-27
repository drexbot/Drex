const { Client, CommandInteraction } = require("discord.js");
const { ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const Guild = require('../../schemas/Guild')

module.exports = {
    name: "ping",
    description: "Ping Command!",
    type: ApplicationCommandType.ChatInput,
    usage: 'ping',
    run: async (client, interaction, args, Discord, emoji, color, discordCode) => {
       let guildSettings = await Guild.findById(interaction.guild.id);

        // Check if avatar command is enabled
        if (!guildSettings.pingCommandEnabled) {
            return interaction.reply({ content: "This command is currently disabled for this server.", ephemeral: true });
        }
        interaction.reply({ content: `**🔔 My Ping is :** \`${client.ws.ping}ms!\`` });
    },
};
