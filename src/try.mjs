

// const PDFExtract = require('pdf.js-extract').PDFExtract;
import {PDFExtract} from 'pdf.js-extract';
const pdfExtract = new PDFExtract();
const options = {}; /* see below */

// pdfExtract.extract('../sample.pdf', options, (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
//   // console.log(data.pages.forEach(d=>console.log(d.content)))
// });

const allPagesData = await pdfExtract.extract('../sample.pdf', options)
  const page = allPagesData.pages[0].content[0];


// const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
import  { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
// const readFile = require('fs').readFile;
import {readFile,writeFile} from 'fs/promises';

// This should be a Uint8Array or ArrayBuffer
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()

// const doWork = async () => {


const existingPdfBytes = await readFile("../sample.pdf");

// Load a PDFDocument from the existing PDF bytes
const pdfDoc = await PDFDocument.load(existingPdfBytes)

// Embed the Helvetica font
const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

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

console.log(page);

firstPage.drawRectangle({x: page.x,
  color: rgb(1, 1, 1),
  y: height - page.y - page.height,
  width: 250,
  height: 75})

firstPage.drawText("bla bla bla",{
  x: page.x,
  y: height - page.y,
  size: 27,
  font: helveticaFont,
})


// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()

await writeFile("../modified-sample.pdf",pdfBytes)

console.log("DOE")

// For example, `pdfBytes` can be:
//   • Written to a file in Node
//   • Downloaded from the browser
//   • Rendered in an <iframe>


