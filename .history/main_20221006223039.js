const { default: makeWASocket, useSingleFileAuthState, jidNormalizedUser } = require("@adiwajshing/baileys");
const { state } = useSingleFileAuthState('./sesi.json');

const ws = makeWASocket({
    printQRInTerminal: true,
    browser: ["Ramesh", "Ramesh-Connections", "1.0"],
    auth: state
})

if (ws.user && ws.user.id) ws.user.jid = jidNormalizedUser(ws.user.id)

// _____________________________________________________________
const reply = (input_text) => {
    ws.sendMessage(messageObj.key.remoteJid, { text: input_text })
}
ws.reply = reply;

ws.sendButtonMsg = (jid, text = '', footer = '', but = []) => {
    let templateButtons = but
    var templateMessage = {
        text: text,
        footer: footer,
        templateButtons: templateButtons
    }
    ws.sendMessage(jid, templateMessage)
}

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
// check if the updates are changed
