module.exports = requester = () => {

    var request = require('request');
    const postAndReturn = (relativeUrl, object) => {
        return new Promise(
            (resolve, reject) => {
                const productionURI = 'https://ramesh-nine.vercel.app/api';
                request.post(
                    productionURI+relativeUrl,
                    { json: object },
                    async (err, res, body) => {
                        if (!err && res.statusCode == 200) {
                            resolve(body);
                        } else {
                            reject(err);
                            throw new err;
                        }
                    }
                );
            }
        )
    }
}


const abc = async () => {
    const abc = await postAndReturn('/attendance', { 'pnum': '1', 'subject': 'fod' });
    console.log(abc);
};
abc();