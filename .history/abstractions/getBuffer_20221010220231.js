const getBuffer = async (url) => {
    const res = await fetch(url);
    await res.body;
}

module.exports = {
    getBuffer
}