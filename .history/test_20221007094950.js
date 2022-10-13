const { postAndReturn } = require('./postAndReturn.js')

const abc = async () => {
    const abc = await postAndReturn('/attendance', { 'pnum': '1', 'subject': 'fod' });
    console.log(abc);
};
abc();
