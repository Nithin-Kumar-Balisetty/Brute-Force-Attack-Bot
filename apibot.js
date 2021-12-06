let http= require('http');
let cheerio = require('cheerio');

async function retPromise(counter){
    return new Promise((resolve,reject)=>{
        let data="",html="";
        http.get("http://192.168.2.5/otaku/anime/"+counter,(res)=>{
            if(res.statusCode!=404){
                res.on('data',(chunk)=>{
                    data+=chunk;
                })
                res.on('end',()=>{
                    const $ = cheerio.load(data);
                    html+=($('.synopsis').text());
                    resolve(html);
                })
            }
            else{
                resolve(null);
            }
        });
    });
}

(async function fun(){
    let counter=0;
    while(true){
        counter++;
        console.log("http://192.168.2.5/otaku/anime/"+counter);
        console.log(await retPromise(counter));
        if(counter===100) break;
    }
})();