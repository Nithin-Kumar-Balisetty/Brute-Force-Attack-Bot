 //const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/imdbstore');

//const itemModel = mongoose.model('IMDBitems', { id : Number,name : String,synopsis : String });

const puppeteer=require('puppeteer');
(async ()=>{
    const browser = await puppeteer.launch({headless : true});
    const page = await browser.newPage();
    let counter=0;
    let iter=1;
    let temp="0000000";
    do{
        try{
            counter++;
            samp=await page.goto("https://www.imdb.com/title/tt"+temp.slice(0,7-iter.toString().length)+iter.toString());
            console.log("https://www.imdb.com/title/tt"+temp.slice(0,7-iter.toString().length)+iter.toString());
            try{
                let synopsis=await page.waitForSelector('.Storyline__StorylineWrapper-sc-1b58ttw-0.iywpty div div div');
                let syn = await synopsis.evaluate(el => {return el.textContent});
                let name=await page.waitForSelector('.TitleHeader__TitleText-sc-1wu6n3d-0.dxSWFG');
                let title=await name.evaluate(el => {return el.textContent});
                console.log("Title : "+title);
                console.log("Synopsis : "+syn); 
                console.log();
            }
            catch{
                console.log("Not a type of Movie Either Series or Documentary");
            }
            /*(new itemModel({ id : temp.slice(0,7-iter.toString().length)+iter.toString() , name : title , synopsis : syn })).save().catch((err)=>{
                console.log(err);
            }); */
            iter++;
        }
        catch(e){
            helper(e); 
            iter++;   
        }
    }while((samp._status)!=404)
    await browser.close();
})();
var helper=(obj)=>{
    console.log(obj);
} 


