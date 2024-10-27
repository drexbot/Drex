const { Client, CommandInteraction } = require("discord.js");
const Guild = require('../../schemas/Guild')
const db = require('quick.db')
const ms = require('ms')
const { ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "close",
    description: "To close channels",
    type: ApplicationCommandType.ChatInput,
    usage: 'close',
    admin: true,
    
    run: async (client, interaction, args, Discord, emoji, color, discordCode) => {
        let guildSettings = await Guild.findById(interaction.guild.id);

        // Check if avatar command is enabled
        if (!guildSettings.closeCommandEnabled) {
            return interaction.reply({ content: "This command is currently disabled for this server.", ephemeral: true });
        }
        const owner = await interaction.guild.fetchOwner();
        let langD = await Guild.findById(interaction.guild.id);
        let lang = client.replys.ar;
        if(langD) {
            if(langD.language) {
                lang = client.replys[langD.language]
            }
        }
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: `${lang.permErr}`});
        
        interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
        interaction.reply({ content: `${lang.close.done}` })

    },
};