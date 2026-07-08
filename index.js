const {
  Client,
  GatewayIntentBits,
  Events,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ChannelType,
  PermissionsBitField,
} = require("discord.js");
const http = require("http");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () => {
  console.log(`Bot online!`);
});
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!painel") {

    const embed = new EmbedBuilder()
      .setTitle("🎫 Sistema de Tickets")
      .setDescription("Clique no botão abaixo para abrir um ticket.")
      .setColor("DarkPurple");

    const botao = new ButtonBuilder()
      .setCustomId("abrir_ticket")
      .setLabel("Abrir Ticket")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(botao);

    await message.channel.send({
      embeds: [embed],
      components: [row],
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "abrir_ticket") {
    const ticketExistente = interaction.guild.channels.cache.find(
  (c) => c.name === `ticket-${interaction.user.username}`
);

if (ticketExistente) {
  return interaction.reply({
    content: "❌ Você já possui um ticket aberto!",
    ephemeral: true,
  });
}

    const canal = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
  {
    id: interaction.guild.id,
    deny: [PermissionsBitField.Flags.ViewChannel],
  },
  {
    id: interaction.user.id,
    allow: [
      PermissionsBitField.Flags.ViewChannel,
      PermissionsBitField.Flags.SendMessages,
      PermissionsBitField.Flags.ReadMessageHistory,
    ],
  },
  {
    id: client.user.id,
    allow: [
      PermissionsBitField.Flags.ViewChannel,
      PermissionsBitField.Flags.SendMessages,
      PermissionsBitField.Flags.ReadMessageHistory,
    ],
  },
  {
    id: "1479667519928139906",
    allow: [
      PermissionsBitField.Flags.ViewChannel,
      PermissionsBitField.Flags.SendMessages,
      PermissionsBitField.Flags.ReadMessageHistory,
    ],
  },
],
});

    const fechar = new ButtonBuilder()
  .setCustomId("fechar_ticket")
  .setLabel("🔒 Fechar Ticket")
  .setStyle(ButtonStyle.Danger);

const row = new ActionRowBuilder().addComponents(fechar);

await canal.send({
  content: `${interaction.user}, seu ticket foi criado! Explique seu problema e aguarde a equipe de suporte.`,
  components: [row],
});

await interaction.reply({
  content: `✅ Seu ticket foi criado: ${canal}`,
  ephemeral: true,
});
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "fechar_ticket") {

    await interaction.reply({
      content: "🔒 Ticket fechado! O canal será apagado em 5 segundos.",
    });

    setTimeout(async () => {
      await interaction.channel.delete().catch(console.error);
    }, 5000);

  }
});
client.login(process.env.TOKEN);

// Servidor HTTP para o Render
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot online!");
}).listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
