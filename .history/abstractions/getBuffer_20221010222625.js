// const getBuffer = async (url) => {
//     const res = await fetch(url);
//     return res.body;
// }

// module.exports = {
//     getBuffer
// }

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
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