var request = require('request');
const productionURI = 'https://ramesh-nine.vercel.app/api';
const postAndReply = async (relativeUrl, object) => {
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

const abc = await postAndReply('/attendance', { 'pnum': '1', 'subject': 'fod' });
console.log(abc);