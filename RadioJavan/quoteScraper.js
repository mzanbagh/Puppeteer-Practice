const puppeteer = require('puppeteer');

// async function run () {
//     const browser = await puppeteer.launch({headless:false});
//     const page = browser.newPage();
//     awi
//     await page.goto("https://www.radiojavan.com/playlists/playlist/mp3/0acc4ffba36b", { waitUntil: 'load' });
//     // const element = document.querySelector("#playlist > div > div.sidePanel > ul > li:nth-child(1) > a > div > span")
//     // console.log(element)

// }
// run()

(async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto("http://quotes.toscrape.com/")
    console.log("IN THE PAGE!")
    const grabQuotes = await page.evaluate(() => {
        const quotes = document.querySelectorAll(".quote")
        let quotesArr = [];
        quotes.forEach((quoteTag) => {
            const quoteInfo = quoteTag.querySelectorAll('span');
            const actualQoute = quoteInfo[0];
            const actualAuthor = quoteInfo[1];

            const authorName = actualAuthor.querySelector("small");

            quotesArr.push({
                quote : actualQoute.innerText,
                author: authorName.innerText
            });

        });
        return quotesArr;
    });
    console.log('BEFORE LOG')
    console.log(grabQuotes);
    await browser.close();
})();

