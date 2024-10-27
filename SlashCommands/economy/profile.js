const { Client, CommandInteraction } = require("discord.js");
const { ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const Canvas = require('canvas');
const User = require('../../schemas/Econo');

module.exports = {
    name: "profile",
    description: "Check your profile, including balance, level, XP progress, and messages sent",
    type: ApplicationCommandType.ChatInput,
    usage: '/profile',
    run: async (client, interaction, args, Discord, emoji, color, discordCode) => {
        const user = interaction.user;

        try {
            let userData = await User.findOne({ userId: user.id });
            if (!userData) {
                userData = await User.create({ userId: user.id });
            }

            const canvas = Canvas.createCanvas(400, 400); // Canvas size set to 400x400
            const context = canvas.getContext('2d');

            // Background
            context.fillStyle = '#23272A'; // Discord dark background color
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Draw user avatar (100x100)
            const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png' }));
            context.drawImage(avatar, 25, 25, 100, 100); // Resizing avatar to 100x100 pixels

            // Add username
            context.font = '28px sans-serif';
            context.fillStyle = '#ffffff';
            context.fillText(`${user.username}#${user.discriminator}`, 150, 75);

            // Add balance and level
            context.font = '22px sans-serif';
            context.fillStyle = '#ffffff';
            context.fillText(`Balance: $${userData.money}`, 25, 150);
            context.fillText(`Level: ${userData.level}`, 25, 200);
            context.fillText(`Messages Sent: ${userData.messagesSent}`, 25, 250);

            // Calculate XP progress
            const requiredXP = getMessagesRequiredForLevel(userData.level);
            const currentXP = userData.messagesSent;
            const xpPercentage = Math.min(currentXP / requiredXP, 1);

            // Draw XP bar background
            context.fillStyle = '#555555';
            context.fillRect(25, 300, 350, 25); // Adjusted for the new canvas size

            // Draw XP bar fill
            context.fillStyle = '#00FF00'; // Green color for XP bar
            context.fillRect(25, 300, 350 * xpPercentage, 25);

            // Add XP text
            context.font = '18px sans-serif';
            context.fillStyle = '#ffffff';
            context.fillText(`${currentXP} / ${requiredXP} XP`, 150, 320);

            // Convert canvas to image and send it
            const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), 'profile-image.png');

            await interaction.reply({
                content: `${user.username}'s Profile`,
                files: [attachment],
                ephemeral: true
            });
        } catch (error) {
            console.error("Error creating profile image:", error);
            await interaction.reply({
                content: "There was an error generating your profile image. Please try again later.",
                ephemeral: true
            });
        }
    },
};

// Helper function to calculate the messages required for the next level
function getMessagesRequiredForLevel(level) {
    if (level < 2) return 10; // Level 2 requires 10 messages
    if (level < 4) return 20; // Level 3 requires 20 messages
    if (level < 5) return 40; // Level 4 requires 40 messages

    // Levels 5 and above
    let requiredMessages = 40;
    for (let i = 5; i <= level; i++) {
        requiredMessages *= i % 2 === 0 ? 2 : 4; // Double or quadruple the required messages
    }
    return requiredMessages;
}
