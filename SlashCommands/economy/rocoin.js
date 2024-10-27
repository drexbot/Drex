const { Client, CommandInteraction } = require("discord.js");
const { ApplicationCommandType } = require('discord.js');
const User = require('../../schemas/Econo');

module.exports = {
    name: "balance",
    description: "Check your balance",
    type: ApplicationCommandType.ChatInput,
    usage: '/balance',
    run: async (client, interaction, args, Discord, emoji, color, discordCode) => {
        const user = interaction.user;

        try {
            let userData = await User.findOne({ userId: user.id });
            if (!userData) {
                userData = await User.create({ userId: user.id });
            }

            await interaction.reply({
                content: `You have $${userData.money} in your account.`,
                ephemeral: true
            });
        } catch (error) {
            console.error("Error fetching balance:", error);
            await interaction.reply({
                content: "There was an error retrieving your balance. Please try again later.",
                ephemeral: true
            });
        }
    },
};
