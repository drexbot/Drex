const { Client, CommandInteraction } = require("discord.js");
const Guild = require('../../schemas/Guild')
const db = require('quick.db')
const { ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "language",
    description: "To change server language",
    usage: 'language `language:[ar/en/ku]`',
    type: ApplicationCommandType.ChatInput,
    admin: true,
    options: [
        {
            name: 'language',
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    value: 'ar',
                    name: 'Arabic',
                },
                {
                    value: 'en',
                    name: 'English',
                },
                {
                    value: 'ku',
                    name: 'Kurdish',
                }
            ],
            description: "Choose the language .. !",
            required: true
        }
    ],
    
    run: async (client, interaction, args, Discord, emoji, color, discordCode) => {
        let guildSettings = await Guild.findById(interaction.guild.id);

        // Check if avatar command is enabled
        if (!guildSettings.langCommandEnabled) {
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
        
        
        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return await interaction.followUp({ content: `${lang.permErr}`, ephemeral: true });
        
            await Guild.findOneAndUpdate({
                _id: interaction.guild.id,
            },
            {
                language: interaction.options.getString('language'),
            },
            {
                upsert: true
            }).exec();

        let langd = await Guild.findById(interaction.guild.id);
        if(langd) {
            if(langd.language) {
               lang = client.replys[langd.language]
            }
        }
        
        interaction.reply({ content: `${lang.lang}` })
    },
};