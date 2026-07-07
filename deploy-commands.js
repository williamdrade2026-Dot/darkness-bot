const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("painel")
    .setDescription("Envia o painel de tickets.")
    .toJSON(),
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registrando comandos...");

    await rest.put(
      Routes.applicationGuildCommands(
        "1523796052950384650",
        "1479645636805660742"
      ),
      { body: commands }
    );

    console.log("Comandos registrados com sucesso!");
  } catch (error) {
    console.error(error);
  }
})();
