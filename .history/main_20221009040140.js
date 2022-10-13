const { default: makeWASocket, useSingleFileAuthState, jidNormalizedUser } = require("@adiwajshing/baileys");
const { state } = useSingleFileAuthState('./sesi.json');

const ws = makeWASocket({
    printQRInTerminal: true,
    browser: ["Ramesh", "Ramesh-Connections", "1.0"],
    auth: state
})

require('./abstractions/interactionFunctionsImplementation.js')(ws);

if (ws.user && ws.user.id) ws.user.jid = jidNormalizedUser(ws.user.id)
// _______________________________________________________________

ws.ev.on('connection.update', async (update) => {
    const { connection } = update;
    if (connection === "open") {
        console.log("Connection Successful!");
        ws.sendMessage('918815065180@s.whatsapp.net', { text: 'Connected Successfully' })
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

// _______________________________________________________________
// listen every X minutes for updates on the college website

const { checkAndReturn } = require('./features/updates/getUpdates.js');
const pathOfDump = "./data.json";

const main = async () => {
    const result = await checkAndReturn(pathOfDump);
    if (result) {
        for (const i of result)
            ws.sendMessage('918815065180@s.whatsapp.net', { text: `${i.innerText}, Link: ${i.link}` })
        return;
    }
    console.log('yaha aaya tha');
    return;
}

// call main every 15 minutes
const x = 5 / 60;
main();
setInterval(main, x * 60 * 1000);