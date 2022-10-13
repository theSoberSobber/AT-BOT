var request = require('request');
const productionURI = 'https://ramesh-nine.vercel.app/api';
const postAndReply = async (relativeUrl, object) => {
    request.post(
        productionURI+relativeUrl,
        { json: object },
        (err, res, body) => {
            if (!err && res.statusCode == 200) {
                // console.log(body);
                return postAndReply.body;
            }
        }
    );    
}

const abc = postAndReply('/attendance', { 'pnum': '1', 'subject': 'fod' });
console.log(abc);