const getBuffer = async (url) => {
    const res = await fetch(url);
    console.log(res);
    // return res.body;
}

// module.exports = {
//     getBuffer
// }
const axios = require('axios');
const getBuffer = async (url) => {
	try {
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

module.exports = {
    getBuffer
}


