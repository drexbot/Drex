const { Client, CommandInteraction } = require("discord.js");
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const User = require('../../schemas/User');

module.exports = {
    name: "transfer",
    description: "Transfer money to another user",
    type: ApplicationCommandType.ChatInput,
    usage: '/transfer',
    options: [
        {
            name: 'amount',
            description: 'Amount to transfer',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: 'target',
            description: 'The user to transfer to',
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    run: async (client, interaction, args, Discord, emoji, color, discordCode) => {
        const user = interaction.user;
        const amount = interaction.options.getInteger('amount');
        const targetUser = interaction.options.getUser('target');

        if (amount <= 0) {
            return interaction.reply({
                content: 'You must enter a positive amount.',
                ephemeral: true
            });
        }

        try {
            let userData = await User.findOne({ userId: user.id });
            if (!userData || userData.money < amount) {
                return interaction.reply({
                    content: 'You do not have enough funds to make this transfer.',
                    ephemeral: true
                });
            }

            let targetData = await User.findOne({ userId: targetUser.id });
            if (!targetData) {
                targetData = await User.create({ userId: targetUser.id });
            }

            userData.money -= amount;
            targetData.money += amount;

            await userData.save();
            await targetData.save();

            await interaction.reply({
                content: `Successfully transferred $${amount} to ${targetUser.username}.`,
                ephemeral: true
            });
        } catch (error) {
            console.error("Error processing transfer:", error);
            await interaction.reply({
                content: "There was an error processing your transfer. Please try again later.",
                ephemeral: true
            });
        }
    },
};
