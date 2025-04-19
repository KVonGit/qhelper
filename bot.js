const { Client, GatewayIntentBits,  REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const { BOT_TOKEN, CLIENT_ID } = require('../qhelper.config.json'); // Replace with your ID

// 🔧 Slash Command Setup (run once or on start)
const commands = [
  new SlashCommandBuilder()
    .setName('qdocs')
    .setDescription('Show link to Quest documentation')
    .toJSON(),
  new SlashCommandBuilder()
    .setName('qdiscussions')
    .setDescription('Show link to Quest discussions')
    .toJSON(),
  new SlashCommandBuilder()
    .setName('qtutorial')
    .setDescription('Show link to Quest tutorial')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);
(async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Slash command registered globally.');
  } catch (error) {
    console.error('Error registering slash command:', error);
  }
})();

// 🧠 Interaction Handling
client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    if (interaction.user.bot) return; // Ignore bot commands
    if (interaction.commandName === 'qdocs') {
      return await interaction.reply({
        content: 'Here’s a quick link drop:\n<:quest59:1362982483372539997> 📘 Quest Docs: https://docs.textadventures.co.uk/quest/'
      });
    }
    else if (interaction.commandName === 'qdiscussions') {
      await interaction.reply({
        content: 'Here’s a quick link drop:\n<:vivafavicon:1362981590535504074> 💬 Quest Discussions: https://github.com/textadventures/quest/discussions/'
      });
    }
    else if (interaction.commandName === 'qtutorial') {
      await interaction.reply({
        content: 'Here’s a quick link drop:\n<:quest:1362982098964578364> 📝 Quest Tutorial: https://docs.textadventures.co.uk/quest/tutorial/'
      });
    }

  }
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(BOT_TOKEN);
