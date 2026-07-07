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

client.login(process.env.TOKEN);

// Servidor HTTP para o Render
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot online!");
}).listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
