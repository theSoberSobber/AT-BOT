const getBuffer = async (url) => {
    const res = fetch(url);
    await res.body;
}

module.exports = {
    getBuffer
}