
import axios from 'axios';
// const PDFExtract = require('pdf.js-extract').PDFExtract;
import fontkit from '@pdf-lib/fontkit';
import fetch from 'node-fetch'
import {PDFExtract} from 'pdf.js-extract';
const pdfExtract = new PDFExtract();
const options = {}; /* see below */

import  { degrees, PDFDocument, rgb, StandardFonts, translate } from 'pdf-lib';
import {readFile,writeFile} from 'fs/promises';

// pdfExtract.extract('../sample.pdf', options, (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
//   // console.log(data.pages.forEach(d=>console.log(d.content)))
// });

export const work = async (source) => {

// const source = '../mmm.pdf';

const allPagesData = await pdfExtract.extract(source, options)
  let pagess = allPagesData.pages[0].content;


// const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
// const readFile = require('fs').readFile;

// This should be a Uint8Array or ArrayBuffer
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()

// const doWork = async () => {


const existingPdfBytes = await readFile(source);

// Load a PDFDocument from the existing PDF bytes
const pdfDoc = await PDFDocument.load(existingPdfBytes)

// const openSansUrls = {
//   partial:
//     'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf',
//   full:
//     'https://github.com/google/fonts/raw/master/apache/opensans/OpenSans-Regular.ttf',
// };

// Download the font
// const url = openSansUrls.full;
// const url = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf';
// console.log(`Downloading font from ${url}\n`);
// const openSansBytes = await fetch(url).then((res) => res.arrayBuffer());
const openSansBytes = await readFile('../../Karma-Regular.ttf');

// Embed the Helvetica font
const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
pdfDoc.registerFontkit(fontkit);
  const openSansFont = await pdfDoc.embedFont(openSansBytes);

// Get the first page of the document
const pages = pdfDoc.getPages()
const firstPage = pages[0]

// Get the width and height of the first page
const { width, height } = firstPage.getSize()

// Draw a string of text diagonally across the first page
// firstPage.drawText('This text was added with JavaScript!', {
//   x: 5,
//   y: height / 2 + 300,
//   size: 50,
//   font: helveticaFont,
//   color: rgb(0.95, 0.1, 0.1),
//   rotate: degrees(-45),
// })

// console.log(pagess);

pagess.forEach(text => {
firstPage.drawRectangle({x: text.x,
  color: rgb(1, 1, 1),
  y: height - text.y - text.height,
  width: text.width,
  height: 75});
});


console.log(pagess.length);
// skja.sms

// import translate_api from 'google-translate-api';
// // const {translate_api} = pkg;

// const k = await translate_api('Ik spreek Engels', {to: 'en'});
// console.log(k.text);
// .then(res => {
//     console.log(res.text);
//     //=> I speak English
//     console.log(res.from.language.iso);
//     //=> nl
// }).catch(err => {
//     console.error(err);
// });



function delay(n){
  return new Promise(function(resolve){
      setTimeout(resolve,n*1000);
  });
}

const fetchPromises =async ()=>{
  let result = [];
  let i, chunk;
for (i = 0; i < pagess.length; i += 30) {
    chunk = pagess.slice(i, i + 30);
    
result.push(...chunk.map(
  (text) =>{
    console.log(text)
    console.log("len:",chunk.length,"from ",i);
    return axios({url:'https://translate.mentality.rip/translate',
    method: 'post',
    data:{
      q: text.str,
      source: "en",
      target: "hi",
      format: "text"
    },
    headers:{
      // "accept":"application/json",
      "Content-Type":"application/json",
    },
  })
}))
 if(pagess.length - i >30){
  console.log("Waiting for 60 s");
  await delay(60);
}
}
return result;
}



const translatedTexts = await Promise.all(
  await fetchPromises()
  )
    ;

translatedTexts.forEach(x=>console.log(x.data.translatedText))

for(const textNo in translatedTexts){

// translatedTexts.forEach(text => {

// try{
  console.log(translatedTexts[textNo].data.translatedText)
firstPage.drawText(translatedTexts[textNo].data.translatedText,{
  x: pagess[textNo].x,
  y: height - pagess[textNo].y,
  size: pagess[textNo].height,
  font: openSansFont,
})
// }
// catch(e) {
//   console.log(e);
// }
}


// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()

await writeFile("output.pdf",pdfBytes)

console.log("DONE")

// For example, `pdfBytes` can be:
//   • Written to a file in Node
//   • Downloaded from the browser
//   • Rendered in an <iframe>

}

