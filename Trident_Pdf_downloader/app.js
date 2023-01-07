
const puppeteer = require('puppeteer');

const request_client = require('request-promise-native');

const main = async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', async request => {
        if (request.url().indexOf('exibirFat.do')>0) { //This condition is true only in pdf page (in my case of course)
        const options = {
            encoding: null,
            method: request._method,
            uri: request._url,
            body: request._postData,
            headers: request._headers
        }
        /* add the cookies */
        const cookies = await page.cookies();
        options.headers.Cookie = cookies.map(ck => ck.name + '=' + ck.value).join(';');
        /* resend the request */
        const response = await request_client(options);
        //console.log(response); // PDF Buffer
        buffer = response;
        let filename = 'file.pdf';
        fs.writeFileSync(filename, buffer); //Save file
    } else {
        request.continue();
    }
    });
    await page.goto('https://example.com/hello-world.pdf').catch(error => {});
    await browser.close();
    console.log("Success")
};

// main()
