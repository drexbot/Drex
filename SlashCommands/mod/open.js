const { Client, CommandInteraction } = require("discord.js");
const Guild = require('../../schemas/Guild')
const db = require('quick.db')
const ms = require('ms')
const { ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "open",
    description: "To open channels",
    type: ApplicationCommandType.ChatInput,
    usage: 'open',
    admin: true,
    
    run: async (client, interaction, args, Discord, emoji, color, discordCode) => {
         let guildSettings = await Guild.findById(interaction.guild.id);

        // Check if avatar command is enabled
        if (!guildSettings.openCommandEnabled) {
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
        
        interaction.channel.permissionOverwrites.delete(interaction.guild.id);
        interaction.reply({ content: `${lang.open.done}` })

    },
};