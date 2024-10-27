const { Client, CommandInteraction } = require("discord.js");
const Guild = require('../../schemas/Premium'); // Adjust path if necessary
const db = require('quick.db');
const ms = require('ms');
const { ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "set-premium",
    description: "Set the server as premium",
    type: ApplicationCommandType.ChatInput,
    usage: '',
    admin: true,

    run: async (client, interaction, args, Discord, emoji, color, discordCode) => {
        // Check if the user has the proper permissions
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({
                content: 'You do not have permission to use this command.',
                ephemeral: true
            });
        }

        // Get the guild ID
        const guildId = interaction.guildId;

        try {
            // Update the guild's premium status in the database
            await Guild.findOneAndUpdate(
                { guildId: guildId },
                { $set: { isPremium: true } },
                { upsert: true }
            );

            return interaction.reply({
                content: `The server has been set to premium.`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Error setting server as premium:', error);
            return interaction.reply({
                content: 'There was an error while setting the server as premium.',
                ephemeral: true
            });
        }
    },
};