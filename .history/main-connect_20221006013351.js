const { default: makeWASocket, useSingleFileAuthState, jidNormalizedUser } = require("@adiwajshing/baileys")
const { state } = useSingleFileAuthState('./sesi.json')
const ws = makeWASocket({
    printQRInTerminal: true,
    browser: ["Ramesh", "Ramesh-Connections", "1.0"],
    auth: state
})
if (ws.user && ws.user.id) ws.user.jid = jidNormalizedUser(ws.user.id)
const prefix = "."

const reply = (input_text) => {
    ws.sendMessage(messageObj.key.remoteJid, { text: input_text })
}

ws.sendButtonMsg = (jid, text = '', footer = '', but = []) => {
    let templateButtons = but
    var templateMessage = {
        text: text,
        footer: footer,
        templateButtons: templateButtons
    }
    ws.sendMessage(jid, templateMessage)
}

ws.ev.on('connection.update', async (update) => {
    const {connection} = update;
    if (connection === "open") {
        console.log("Connection Successful!");
    }
})

function businessLogic() {
    reply('firse thike bhai')
    // phone no.
    // group id - > college, branch, section.
    // get subject from mongodb
    // create buttons OR confirm input from user
}

ws.ev.on('messages.upsert', async chatUpdate => {
    try {
        messageObj = chatUpdate.messages[0]
        console.log('---------------------')
        console.log(messageObj)
        let body = messageObj.message.conversation
        let senderJid
        let groupId
        if (messageObj.key.participant) {
            senderJid = messageObj.key.participant
            groupId = messageObj.key.remoteJid
        }
        else {
            return;
        }

        // console.log(messageObj.pushName)                 // Messeage jisne bheja
        console.log(groupId)                                // groupid
        console.log(senderJid)                              // phone no
        console.log(body)                                   // message text

        console.log('---------------------')
        if (!messageObj.message) return;
        if (!messageObj.key.fromMe) {
            if (body[0] == prefix) {
                let command = body.replace(prefix, '').toLowerCase()
                switch (command) {
                    case 'present': case "p":
                        reply('thike bhai')
                        businessLogic();
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
})