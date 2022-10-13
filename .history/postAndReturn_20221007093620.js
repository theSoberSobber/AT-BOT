var request = require('request');
const productionURI = 'https://ramesh-nine.vercel.app/api';
const postAndReply = (relativeUrl, object) => {

    return new Promise(
        (resolve, reject) => {
            request.post(
                productionURI+relativeUrl,
                { json: object },
                async (err, res, body) => {
                    if (!err && res.statusCode == 200) {
                        console.log(body);
                        await postAndReply.body;
                        // return await body;
                        return postAndReply;
                    }
                }
            );
        }
    )
    request.post(
        productionURI+relativeUrl,
        { json: object },
        async (err, res, body) => {
            if (!err && res.statusCode == 200) {
                console.log(body);
                await postAndReply.body;
                // return await body;
                return postAndReply;
            }
        }
    );    
}

// const abc = await postAndReply('/attendance', { 'pnum': '1', 'subject': 'fod' });
// console.log(abc);


const abc = async () => {
    const abc = await postAndReply('/attendance', { 'pnum': '1', 'subject': 'fod' });
    console.log(abc);
};
abc();