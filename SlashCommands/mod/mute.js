const { Client, CommandInteraction } = require("discord.js");
const Guild = require('../../schemas/Guild')
const db = require('quick.db')
const ms = require('ms')
const { ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "mute",
    description: "To mute users",
    type: ApplicationCommandType.ChatInput,
    usage: 'mute `user:[user]` `time:[time]`',
    admin: true,
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: "Choose the user !",
            required: true
        },
        {
            name: 'time',
            type: ApplicationCommandOptionType.String,
            description: "Type the time !",
            required: true
        }
    ],
    
    run: async (client, interaction, args, Discord, emoji, color, discordCode) => {
        let guildSettings = await Guild.findById(interaction.guild.id);

        // Check if avatar command is enabled
        if (!guildSettings.muteCommandEnabled) {
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
        const time = interaction.options.getString('time');

        if(Member.user.id == client.user.id) return interaction.reply({ content: `${lang.mute.me}` });
        
        if(!Member) return interaction.reply('Member is not found.')
        if(interaction.user.id !== owner.user.id && Member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply(`${lang.mute.cant}`)
            
        await Member.timeout(ms(time), { reason: `By : ${interaction.user.tag}, For : ${ms(time)}` }).then(() => { interaction.reply(lang.mute.done.replace(/\[user]/g, Member.user)) }).catch((err) => { interaction.reply(lang.permErr) })
        
    },
};