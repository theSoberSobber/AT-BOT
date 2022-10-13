
    const cheerio = require('cheerio');
    const request = require('request');

    var options = {
        'method': 'GET',
        'url': 'http://www.manit.ac.in/',
    };
    
    request(options, async function (a, b) {
        if (a) throw new Error(a);
        const $ = cheerio.load(b.body);
        var list = {
        innerText: [],
        links: []
        };
        $('div[class="modal-body quick"]').find('div > p > a').each(function (index, element) {
        list.innerText.push($(element).text());
        list.links.push($(element).attr('href'));
        });

        console.log(list);
        return list;
        // await list.then(
        //     async () => {
        //         return list;
        //     }
        // );
        
    });
