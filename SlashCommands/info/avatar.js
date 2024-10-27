const { Client, CommandInteraction } = require("discord.js");
const Guild = require('../../schemas/Guild');
const Canvas = require("canvas");
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Get user avatar",
    type: ApplicationCommandType.ChatInput,
    usage: 'avatar `user:[user]`',
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: "To show any user avatar",
            required: false
        }
    ],
    
    run: async (client, interaction, args, Discord, emoji, color, discordCode) => {
        let guildSettings = await Guild.findById(interaction.guild.id);

        // Check if avatar command is enabled
        if (!guildSettings.avatarCommandEnabled) {
            return interaction.reply({ content: "This command is currently disabled for this server.", ephemeral: true });
        }

        let lang = client.replys.ar;
        if (guildSettings.language) {
            lang = client.replys[guildSettings.language];
        }

        let member = interaction.options.getUser('user') || interaction.user;

        const embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(`${member.username} ${lang.avatar.title}`)
            .setDescription(`[PNG](${member.displayAvatarURL({ format: "png", size: 1024 })}) | [JPG](${member.displayAvatarURL({ format: "jpg", size: 1024 })}) | [GIF](${member.displayAvatarURL({ format: "gif", size: 1024, dynamic: true })}) | [WEBP](${member.displayAvatarURL({ format: "webp", size: 1024 })})`)
            .setImage(member.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true, size: 1024 }) })
            .setTimestamp();

        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel(lang.avatar.button)
					.setStyle(ButtonStyle.Link)
                    .setURL(`${member.displayAvatarURL({ format: "webp", size: 1024 })}`)
                    .setEmoji(emoji.linkID)
			);

        interaction.reply({embeds: [embed], components: [row] });
    },
};
