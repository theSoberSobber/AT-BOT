const { checkAndReturn } = require('./features/updates/getUpdates.js');

const main = async () => {
    const result = await checkAndReturn();
    console.log(result);
}
main();