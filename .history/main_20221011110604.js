const { default: makeWASocket, useSingleFileAuthState, jidNormalizedUser } = require("@adiwajshing/baileys");
const { state } = useSingleFileAuthState('./sesi.json');

const pino = require('pino');

const ws = makeWASocket({
    logger: pino({ level: 'silent' }),
    browser: ["Ramesh", "Ramesh-Connections", "1.0"],
    auth: state
})
const config = require('./AlertBot.config.js');
require('./abstractions/interactionFunctions.js')(ws);

if (ws.user && ws.user.id) ws.user.jid = jidNormalizedUser(ws.user.id)
// _______________________________________________________________

ws.ev.on('connection.update', async (update) => {
    const { connection } = update;
    if (connection === "open") {
        console.log("Connection Successful!");
        ws.sendMessage(config.jid, { text: 'Connected Successfully' })
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
        // implment better way using axios headers and content-type['application/pdf'] checking
            // var ext = i.link.slice(-4)
            if(i.link.slice(-4) == ".pdf"){
                await ws.sendFile(config.jid, i.link, i.innerText);
                await ws.sendMessage(config.jid, { text: `Brought to you by AlertBot@2022` })
            } else if (i.link.slice(-4) == ".jpg") {
                await ws.sendImage(config.jid, i.link, i.innerText);
                await ws.sendMessage(config.jid, { text: `Brought to you by AlertBot@2022` })
            } else {
                await ws.sendMessage(config.jid, { text: `${i.innerText}, Link: ${i.link}` })
                await ws.sendMessage(config.jid, { text: `Brought to you by AlertBot@2022` })
            }
        return;
    }
    return;
}

// call main every 15 minutes
const x = 60 / 60;
main();
setInterval(main, x * 60 * 1000);