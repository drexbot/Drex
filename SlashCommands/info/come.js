const { Client, CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const GuildSettings = require('../../schemas/Guild'); // Update the path as necessary

module.exports = {
    name: "come",
    description: "To add or remove a user to the control panel",
    usage: 'trust `[add/remove]` `user:[user]`',
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: "Who is the user?",
            required: true
        }
    ],
    run: async (client, interaction) => {
      const guildId = interaction.guild.id;
        const guildSettings = await GuildSettings.findById(guildId);

        if (!guildSettings || !guildSettings.commandsEnabled) {
            return interaction.reply({ content: "This command is currently disabled for this server.", ephemeral: true });
        }
        

        try {
            let user = interaction.options.getUser("user");
            let a7a = new EmbedBuilder()
 .setColor('#5b45f9')
               
                .setDescription(`> **Done send to __${user}__** 

> **Please Wait For Him To Come And Please Don't Send Him Another Come** <a:System:1267516169070313533>`);

            interaction.reply({ embeds: [a7a] });

              if (guildSettings.comeEmbed && guildSettings.comeEmbed.enabled) {
            const embed = new EmbedBuilder()
                .setTitle(guildSettings.comeEmbed.title || "Come")
                .setDescription(guildSettings.comeEmbed.description || `
** Hey, ${user}!.

 You have been ordered to come in __${interaction.guild.name}__ 
 You were ordered by  __${interaction.user}__

 To go directly to the channel please press the button below 
      **`)
                .setImage(guildSettings.comeEmbed.image || null)
                .setThumbnail(guildSettings.comeEmbed.thumbnail || null)
                .setColor('#5b45f9');

            

            let button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("Channel")
                        .setStyle(ButtonStyle.Link)
                        .setURL(`https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}`)
                );
await user.send({ embeds: [embed], components: [button] });
        } else {
            await user.send(guildSettings.comeEmbed.content || `${user}`)
        };
           
        } catch (err) {
            console.log(err);
        }
    }
};
