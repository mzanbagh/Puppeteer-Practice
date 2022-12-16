
const puppeteer = require('puppeteer');

const createPDF = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto("http://google.com", { waitUntil: 'networkidle2'});
    
    const pdfConfig = {path: 'info.pdf',format: 'A4',printBackground: true,};

    const pdf = await page.pdf(pdfConfig);

    console.log('Success!')
}

createPDF()

// https://e773553956c9c1872950-735b664236457e5d52346f712a88c794.ssl.cf5.rackcdn.com/wp-content/uploads/2022/09/Academic-Programs_2022-2023.pdf