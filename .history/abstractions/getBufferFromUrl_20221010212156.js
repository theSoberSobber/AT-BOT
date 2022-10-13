// current support is for pdf's only (streamable data)
// checks can be implmented by fetching the headers and seeeing the content-type attribute in them
const getBufferFromUrl = async (url) => {
    const res = await fetch(url);
    return res.body;
}

module.exports = {
    getBufferFromUrl
}