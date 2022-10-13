const cheerio = require('cheerio');
const request = require('request');

const manitParser = () => {
    var options = {
        'method': 'GET',
        'url': 'http://www.manit.ac.in/',
    };

    var list = {
        innerText: [],
        links: []
    };

    return new Promise(
        (resolve, reject) => {
            request(options, function (err, res) {
                if (err) throw new Error(err);
                if (err) reject(error);
                const $ = cheerio.load(res.body);
                $('div[class="modal-body quick"]').find('div > p > a').each(function (index, element) {
                list.innerText.push($(element).text());
                list.links.push($(element).attr('href'));
                });
                resolve(list);
            });
        }
    )
}

// this function is meant to be exported and called every 5 minutes by main.js
// meant to return link if there is something new
// otherwise null
async function checkAndReturn(){
    // flow of function
        // fetch updates
        // check if the txt == latestLink
        // if not then - 
            // 1) sendMessage
            // 2) updateTxt
        // is sa
    var list = await manitParser();
    console.log(list);
}
checkAndReturn();