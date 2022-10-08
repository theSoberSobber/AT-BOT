const { checkAndReturn } = require('./features/updates/getUpdates.js');
const pathOfDump = "./lastJsonDump.json";

const main = async () => {
    const result = await checkAndReturn(pathOfDump);
    console.log(result);
}
main();