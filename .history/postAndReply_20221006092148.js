var request = require('request');
const productionURI = 'https://ramesh-nine.vercel.app/api';
const postAndReply = (relativeUrl, object) => {
    request.post(
        productionURI+relativeUrl,
        { json: object },
        (err, res, body) => {
            if (!err && res.statusCode == 200) {
                console.log(body);
            }
        }
    );    
}

postAndReply