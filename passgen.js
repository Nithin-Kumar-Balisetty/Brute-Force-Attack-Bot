const fs = require("fs");
var os = require("os");

function printAllKLength(set,k)
 {
     let n = set.length;
     printAllKLengthRec(set, "", n, k);
 }

function printAllKLengthRec(set,prefix,n,k)
{
    // Base case  k = 0,
    if (k == 0)
    {
        fs.appendFile("mypass.txt", prefix+'\n', (err) => {
            if (err) {
              console.log(err);
            }
          });
        console.log(prefix);   
        return ;
    }
   
    for (let i = 0; i < n; ++i){

        let newPrefix = prefix + set[i];
        printAllKLengthRec(set,newPrefix,n,k-1);
    }
}

let set=[];
for(let i=97;i<97+26;i++)
    set.push(String.fromCharCode(i));
for(let i=0;i<=9;i++) set.push(i);
set.push('*');
set.push('#');
set.push('$');
let k = 8;
printAllKLength(set, k); 
