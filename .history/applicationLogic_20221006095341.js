var request = require('request');
const productionURI = 'https://ramesh-nine.vercel.app/api';
const postAndReturn = async (relativeUrl, object) => {
    request.post(
        productionURI+relativeUrl,
        { json: object },
        (err, res, body) => {
            if (!err && res.statusCode == 200) {
                return body;
            }
        }
    );    
}

// make post and return and get subjects work somehow

module.exports = applicationLogic = async (ws, chatUpdate) => {

    const postAndReply = (relativeUrl, object) => {
        request.post(
            productionURI+relativeUrl,
            { json: object },
            (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    ws.reply(res.body[0]);
                }
            }
        );    
    }

    const prefix = ".";
    // decided user flow ->
    // phone no.
    // group id - > college, branch, section.
    // get subject from mongodb
    // create buttons OR confirm input from user

    messageObj = chatUpdate.messages[0];
    // console.log('---------------------');
    // console.log(messageObj);
    let body = messageObj.message.conversation.toLowerCase();
    let senderJid;
    let groupId;
    if (messageObj.key.participant) {
        senderJid = messageObj.key.participant;
        groupId = messageObj.key.remoteJid;
    } else {
        // it's a DM
        senderJid = messageObj.key.remoteJid;
    }

    console.log(messageObj.pushName); // Messeage jisne bheja
    // console.log(groupId); // groupid
    // console.log(senderJid); // phone no
    // console.log(body); // message text
    // console.log('---------------------')

    // actual logic
    if (!messageObj.message) return;
    if (!messageObj.key.fromMe) {
        if (body[0] == prefix) {
            let command = body.replace(prefix, '').trim().split(/ +/).shift();
            let args = body.trim().split(/ +/).slice(1);
            switch (command) {
                // case _________________________________
                case 'present':
                case 'p':
                    // const subjectArr = await postAndReturn('/getSubjects', {'gno': '1234567890@g.us'});
                    // console.log(subjectArr);
                    postAndReply('/getSubjects', {'gno': '1234567890@g.us'});
                    // postAndReply('/attendance', { 'pnum': senderJid, 'subject': args[0] });
                // case __________________________________
            }
        }
    }
}