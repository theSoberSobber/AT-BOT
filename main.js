const { default: makeWASocket, useSingleFileAuthState, jidNormalizedUser } = require("@adiwajshing/baileys");
const { state } = useSingleFileAuthState('./sesi.json');

const pino = require('pino');

const ws = makeWASocket({
    logger: pino({ level: 'silent' }),
    browser: ["Ramesh", "Ramesh-Connections", "1.0"],
    auth: state
})
require('./abstractions/interactionFunctions.js')(ws);

if (ws.user && ws.user.id) ws.user.jid = jidNormalizedUser(ws.user.id)
// _______________________________________________________________

ws.ev.on('connection.update', async (update) => {
    const { connection } = update;
    if (connection === "open") {
        console.log("Connection Successful!");
        ws.sendMessage("918815065180@s.whatsapp.net", { text: 'Connected Successfully' })
    }
})

// ______________________________________________________________
ws.ev.on('messages.upsert', async chatUpdate => {
    try {
        require('./features/applicationLogic.js')(ws, chatUpdate);
    } catch (err) {
        console.log(err)
    }
})