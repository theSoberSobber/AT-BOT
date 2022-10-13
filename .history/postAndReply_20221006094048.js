var request = require('request');
const productionURI = 'https://ramesh-nine.vercel.app/api';
const postAndReply = (relativeUrl, object) => {
    request.post(
        productionURI+relativeUrl,
        { json: object },
        async (err, res, body) => {
            if (!err && res.statusCode == 200) {
                console.log(body);
                return body;
            }
        }
    );    
}

const abc = postAndReply('/attendance', { 'pnum': '1', 'subject': 'fod' });
console.log(abc);