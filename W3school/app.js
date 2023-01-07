const puppeteer = require('puppeteer')
const fs = require('fs')

async function start(){
    // Browser * option? headless:true
    const browser = await puppeteer.launch({headless:true,
        args: [
        '--start-maximized',
        '--incognito'
        ],
        defaultViewport: null});
    // Page
        const page = await browser.newPage();
    // goto
        await page.goto('https://www.w3schools.com/quiztest/', {waitUntil:'networkidle2'});
    //selector
    const names = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('#leftmenuinnerinner > a')).map (x => x.textContent)
    });
    //log * ?option
    //console.log(names);
    //file
    fs.writeFileSync('info.txt', names.join('\r\n'))
    //close
    browser.close()
    console.log("Success")
}

// call
start()