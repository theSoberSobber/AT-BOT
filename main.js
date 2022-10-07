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
        ws.sendMessage('918815065180@s.whatsapp.net', { text: 'Connected Successfully' })
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
// listen every 10 minutes for updates on the college website

const { checkAndReturn } = require('./getUpdates.js');

const main = async () => {
    const result = await checkAndReturn();
    if(result){
        for(let i=0; result.links.length; i++){
            ws.sendMessage('918815065180@s.whatsapp.net', { text: `${result.innerText[i]}, Link: ${result.links[i]}`})
        }
        return;
    }
    console.log('yaha aaya tha');
    return;
}
main();
// call main every 5 minutes
const x = 5;
setInterval(main, x*60*1000);






