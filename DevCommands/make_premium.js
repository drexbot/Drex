const { Client, CommandInteraction } = require("discord.js");
const Guild = require('../../schemas/Guild')
const db = require('quick.db')
const { ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const Premium = require("../../schemas/Premium");
const fs = require("fs");

module.exports = {
  name: "make_premium",
  description: "To make premium custom bot",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'owner_id',
      type: ApplicationCommandOptionType.String,
      description: "Put the bot owner .. !",
      required: true
    }
  ],

  run: async (client, interaction, args, Discord, emoji, color, discordCode) => {

    const bot = interaction.options.getString('owner_id');

    if (client.user.id !== "824590114419769404") return;
    if (interaction.user.id !== "919931389346975744") return;

    const getBot = await Premium.findOne({ use: "false" })
    await Premium.findByIdAndUpdate(getBot._id, {
      _id: getBot._id,
      guildId: "",
      date: Date.now(),
      token: getBot.token,
      use: "true",
      owner: bot,
      theme: "yellow",
    },
      {
        upsert: true
      })

    // ========================= نسخ الملف =========================
    fs.copyFile(`./botMake.txt`, "./premiumBots/" + getBot._id + ".js", (err) => {
      if (err) console.log(err);
      else {

      }
    });

    // ========================= إستبدال التوكن 
    setTimeout(() => {
      fs.readFile("./premiumBots/" + getBot._id + ".js", 'utf-8',
        function(err, contents) {
          if (err) return;
          const replaced = contents.replace(/\[MyToken]/g, getBot.token)
          fs.writeFile("./premiumBots/" + getBot._id + ".js", replaced, 'utf-8',
            function(err) {

            });
        })
    }, 1000)

    // ========================= الدخول إلى البوت 
    const myTimeout = setTimeout(bruh, 2000);

    function bruh() {
      setInterval(function() {
        let File = require("../premiumBots/" + getBot._id + ".js")
      }, 5000)
    }

    /*const guild = client.guilds.cache.get("939548244021751808");
    const member = guild.members.cache.get(`${bot}`);
    const role = guild.roles.cache.get("939551075885809704");
    console.log(guild.members.cache.get("824590114419769404"))
    if(member) {
      if(role) {
        member.roles.add(role);
      }
    }*/

    interaction.followUp({ content: `> **Done ..** \n https://discord.com/api/oauth2/authorize?client_id=${getBot._id}&permissions=${client.emoji.perm}&scope=bot%20applications.commands` })
  },
};