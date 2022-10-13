// ______________________________INTERACTION Functions IMPLEMENTATION_____________________________
// Take care to define all here as a method of the ws object as they need to be accesible to other files
// without needing to import this file in the applicationLogic script 
// _____________________________________________________________
const axios = require('axios');
module.exports = iFunctions = async (ws) => {
    const reply = (input_text) => {
        ws.sendMessage(messageObj.key.remoteJid, { text: input_text })
    }
    ws.reply = reply;

    // untested though
    ws.sendButtonMsg = (jid, text = '', footer = '', but = []) => {
        let templateButtons = but
        var templateMessage = {
            text: text,
            footer: footer,
            templateButtons: templateButtons
        }
        ws.sendMessage(jid, templateMessage)
    }

    ws.sendFile = async (jid, url, caption, quoted, options = {}) => {
        let mime = '';
        let res = await axios.head(url)
        mime = res.headers['content-type']
        if (mime.split("/")[1] === "gif") {
            return ws.sendMessage(jid, {
                video: await getBuffer(url),
                caption: caption,
                gifPlayback: true,
                ...options
            }, {
                quoted: quoted,
                ...options
            })
        }
    //________________________________________________________________________________________
}