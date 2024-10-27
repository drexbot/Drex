const { Client, CommandInteraction } = require("discord.js");
const Guild = require('../../schemas/Guild')
const db = require('quick.db')
const ms = require('ms')
const { ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "unmute",
    description: "To unmute users",
    type: ApplicationCommandType.ChatInput,
    usage: 'unmute `user:[user]`',
    admin: true,
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: "Choose the user !",
            required: true
        }
    ],
    
    run: async (client, interaction, args, Discord, emoji, color, discordCode) => {
         let guildSettings = await Guild.findById(interaction.guild.id);

        // Check if avatar command is enabled
        if (!guildSettings.unmuteCommandEnabled) {
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
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) return interaction.reply({content: `${lang.permErr}`});
        
        const Member = interaction.options.getMember('user');
        
        if(!Member) return interaction.reply('Member is not found.')
        if(interaction.user.id !== owner.user.id && Member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp(`${lang.unmute.cant}`)

        await Member.timeout(null).then(() => { interaction.reply(lang.unmute.done.replace(/\[user]/g, Member.user)) }).catch((err) => { interaction.reply(lang.permErr) })
        
    },
};