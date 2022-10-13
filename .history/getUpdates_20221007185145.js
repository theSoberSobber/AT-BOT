const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
console.log(fs.promises);

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
    return new Promise(
        async (resolve, reject) => {
            var list = await manitParser();
            var fileContentsLinks;
            await fs.promises.readFile('./lastJsonDump.json').then( (result) => {
                fileContentsLinks = result;
            })
            console.log(fileContentsLinks); // this is undefined for some reason
            // check for differnce or not
            var out = {
                innerText: [],
                links: []
            };
            var empty_out = out;
            for(let i=0; i<list.links.length; i++){
                for(let j=0; j<fileContentsLinks.length; j++){
                    if(list.links[i]!=fileContentsLinks[j]){
                        out.innerText.push(list.innerText[i]);
                        out.links.push(list.links[i]);
                    }
                }
            }
            // now already searched, do dump in the file
            await fs.promises.writeFile('./lastJsonDump.json', list);
            // now if out is not empty then reply that, otherwise nothing
            if(empty_out != out){
                resolve(out);
            } else {
                resolve();
            }
        }
    )
}
module.exports = {
    checkAndReturn
}
