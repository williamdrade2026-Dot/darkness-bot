const { Client, GatewayIntentBits, Events } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, () => {
  console.log("Bot online!");
});

client.login("MTUyMzc5NjA1Mjk1MDM4NDY1MA.GQyFfy.oRYFckNLVJ39SpyOO1Se9Ai1m2EJ0glz7mpCqg");
