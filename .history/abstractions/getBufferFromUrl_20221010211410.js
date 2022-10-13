const getBufferFromUrl = async (url) => {
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
    getBufferFromUrl
}