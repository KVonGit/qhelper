const { Client, GatewayIntentBits, REST, Routes, ButtonBuilder, ButtonStyle, ActionRowBuilder, InteractionType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const { YOUR_BOT_TOKEN, YOUR_USER_ID } = require('../qhelper.config.json'); // Replace with your ID

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.user.id !== YOUR_USER_ID) return;

    if (interaction.commandName === 'questdocs') {
      const button = new ButtonBuilder()
        .setCustomId('show_to_everyone')
        .setLabel('Show to everyone')
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder().addComponents(button);

      await interaction.reply({
        content: 'Here’s the Quest documentation: https://docs.textadventures.co.uk/quest/',
        components: [row],
        ephemeral: true
      });
    }
  }

  // Handle button press
  if (interaction.isButton()) {
    if (interaction.customId === 'show_to_everyone') {
      if (interaction.user.id !== YOUR_USER_ID) {
        await interaction.reply({ content: 'Only KV can share this publicly.', ephemeral: true });
        return;
      }

      await interaction.reply({
        content: 'Here’s the Quest documentation for everyone: https://docs.textadventures.co.uk/quest/',
        ephemeral: false
      });
    }
  }
});

client.login('YOUR_BOT_TOKEN'); // or use environment variable
