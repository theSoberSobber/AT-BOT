const getBuffer = async (url) => {
    const res = await fetch(url);
    return res.body;
}

module.exports = {
    getBuffer
}