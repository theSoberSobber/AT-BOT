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
// all this is supposed to be returned in promises
async function checkAndReturn(){
    // flow of function
        // fetch updates
        // check for each link if it exists in the last recent JSON dump
        // is no ->
            // send for the new ones
            // dump the new JSOn in last recent JSON file
        // is yes -> 
            // don't do anything
            // return null;
        // if not then - 
            // 1) sendMessage
            // 2) updateTxt
        // is same
            // return with null
    return new Promise(
        async (resolve, reject) => {
            var list = await manitParser();
            const fileContentsLinks = await fs.promises.readFile('./lastJsonDump.json').links;

            // check for differnce or not
            for(let i=0; i<list.links.length; i++){
                for(let j=0; j<fileContentsLinks.length; j++){
                    if(list.links[i]!=fileContentsLinks[j]){
                        resolve([list.innerText[i], list.links[i]]);
                    } else {
                        resolve();
                    }
                }
            }


        }
    )
}
// checkAndReturn();