const manitParser = () => {
    const cheerio = require('cheerio');
    const request = require('request');

    var options = {
        'method': 'GET',
        'url': 'http://www.manit.ac.in/',
    };

    var list = {
        innerText: [],
        links: []
    };

    return new Promise(
        () => {
            request(options, function (err, res) {
                if (err) throw new Error(err);
                const $ = cheerio.load(res.body);
                $('div[class="modal-body quick"]').find('div > p > a').each(function (index, element) {
                list.innerText.push($(element).text());
                list.links.push($(element).attr('href'));
                });
                console.log(list);
                return list;
            });
        }
    )
    request(options, function (err, res) {
        if (err) throw new Error(err);
        const $ = cheerio.load(res.body);
        $('div[class="modal-body quick"]').find('div > p > a').each(function (index, element) {
        list.innerText.push($(element).text());
        list.links.push($(element).attr('href'));
        });
        console.log(list);
        return list;
    });
    // return list;
}
console.log(manitParser());