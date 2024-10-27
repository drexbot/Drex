const { Client, CommandInteraction } = require("discord.js");
const Guild = require('../../schemas/Guild')
const db = require('quick.db')
const { GuildMemberManager, ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "ban",
    description: "To ban user from server",
    type: ApplicationCommandType.ChatInput,
    usage: 'ban `user:[user]` `reason:[reason]`',
    admin: true,
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: "Choose the user !",
            required: true
        },
        {
            name: 'reason',
            type: ApplicationCommandOptionType.String,
            description: "Type the reason !",
            required: false
        }
    ],
    
    run: async (client, interaction, args, Discord, emoji, color, discordCode) => {
         let guildSettings = await Guild.findById(interaction.guild.id);

        // Check if avatar command is enabled
        if (!guildSettings.banCommandEnabled) {
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
        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `${lang.permErr}`, ephemeral: true });
        
        const member = interaction.options.getMember('user');
        if(!member) return interaction.reply(`${lang.ban.choose}`);
        if(member.user.id == client.user.id) return interaction.reply({ content: `${lang.ban.me}` });

       if(
          interaction.user.id !== owner.user.id && member.roles.highest.position >= interaction.member.roles.highest.position
       ) return interaction.reply(`${lang.ban.cant}`)

        const reason = interaction.options.getString('reason') || "No reason!";

        if(interaction.guild.members.me.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                interaction.guild.members.ban(member).then(() => {
                    interaction.reply(`${lang.ban.done.replace(/\[user]/g,`${member}`)}`);
                }).catch((err) => {
                    interaction.reply({ content: lang.err.replace(/\[support]/g,`https://discord.gg/${discordCode} - **Code Error** : \`MISSING PERMISSIONS\``), ephemeral: true }) 
                })
        } else {
            interaction.reply({ content: lang.err.replace(/\[support]/g,`https://discord.gg/${discordCode} - **Code Error** : \`MISSING PERMISSIONS\``), ephemeral: true })
        }
    },
};