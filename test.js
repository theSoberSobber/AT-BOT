const { checkAndReturn } = require('./getUpdates.js');

const main = async () => {
    var result = await checkAndReturn();
    console.log(result);
}
main();