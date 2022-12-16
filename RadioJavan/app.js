
const puppeteer = require('puppeteer');
const fs = require('fs');
const { Console } = require('console');

(async () => {
    // browser config
    const browser = await puppeteer.launch({headless:true,
        args: [
        '--start-maximized',
        ],
        defaultViewport: null});
    const page = await browser.newPage();
    await page.goto('https://www.radiojavan.com/');
   
    await page.waitForSelector('.grid');
    await page.click("#featuredPlaylists > div.grid > a:nth-child(3) > img");
    // node
    const info = await page.evaluate(()=>{
        const songs = document.querySelectorAll(".song");
        const artists = document.querySelectorAll(".artist");
        // song array
        let song = []
        songs.forEach(element => {
            let x = element.textContent.trim()
            song.push(x)
        });
        // artist array
        let artist = []
        artists.forEach(element => {
            let x = element.textContent.trim()
            artist.push(x)
        });

        res = song.concat(artist)
        return res
    })
// file write
await fs.writeFileSync("info.txt", info.join("\r\n"))

// console.log(info)
browser.close()
console.log("Success");
})();