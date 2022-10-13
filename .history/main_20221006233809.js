const { default: makeWASocket, useSingleFileAuthState, jidNormalizedUser } = require("@adiwajshing/baileys");
const { state } = useSingleFileAuthState('./sesi.json');

const ws = makeWASocket({
    printQRInTerminal: true,
    browser: ["Ramesh", "Ramesh-Connections", "1.0"],
    auth: state
})

require('./interactionFunctionsImplementation.js')(ws);

if (ws.user && ws.user.id) ws.user.jid = jidNormalizedUser(ws.user.id)
// _______________________________________________________________

ws.ev.on('connection.update', async (update) => {
    const {connection} = update;
    if (connection === "open") {
        console.log("Connection Successful!");
    }
})

// ______________________________________________________________
ws.ev.on('messages.upsert', async chatUpdate => {
    try {        
        require('./applicationLogic.js')(ws, chatUpdate);
    } catch (err) {
        console.log(err)
    }
})

// _______________________________________________________________
// listen event 10 minutes for updates on the college website









