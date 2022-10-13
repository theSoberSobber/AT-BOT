// current support is for pdf's only (streamable data)
// checks can be implmented by fetching the headers and seeeing the content-type attribute in them
// this was converted into a module, so that support for more types may be added in the future
const getBufferFromUrl = async (url) => {
    const res = await fetch(url);
    return res.body;
}

module.exports = {
    getBufferFromUrl
}

if (require.main === module) {
    getBufferFromUrl("http://www.manit.ac.in/sites/default/files/Urgent%20Notice%20for%20revised%20academic%20calendar%20for%20UG%20Oct.-Dec.%202022.pdf");
}