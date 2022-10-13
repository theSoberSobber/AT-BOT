#!/usr/bin/node

const { load } = require('cheerio');
const { readFile, writeFile } = require('fs/promises');

const manitParser = async () => {
    var options = {
        'method': 'GET',
        'url': 'http://www.manit.ac.in/',
    };

    var list = [];

    const res = await fetch(options.url)

    const html = await res.text();

    const $ = load(html);

    $('div[class="modal-body quick"]').find('div > p > a').each(function (_index, element) {
        list.push({
            innerText: $(element).text(),
            link: $(element).attr('href'),
        })
    });

    return list;
}


const res = await fetch("http://www.manit.ac.in/sites/default/files/Urgent%20Notice%20for%20revised%20academic%20calendar%20for%20UG%20Oct.-Dec.%202022.pdf");

async function checkAndReturn(pathOfDump) {
    const gotTest = await manitParser();

    const file = await readFile(pathOfDump, "utf-8")

    const toTest = JSON.parse(file);

    const diff = []

    for (const e of gotTest)
        if (!(toTest.filter(item => item.link === e.link).length))
            diff.push(e);

    if (!diff.length)
        return 0;

    await writeFile(pathOfDump, JSON.stringify(gotTest), "utf-8")

    return diff;
}

module.exports = {
    checkAndReturn
}

if (require.main === module) {
    checkAndReturn("data.json");
}