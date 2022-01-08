// const axios = require('axios')

// for(let i= 0;i<39;i++){

// axios({url:'https://translate.mentality.rip/translate',
//     method: 'post',
//     data:{
//       q: "Meow",
//       source: "en",
//       target: "hi",
//       format: "text"
//     },
//       headers:{
//         // "accept":"application/json",
//         "Content-Type":"application/json",
//       },
//     }).then(res=>
//       {
//         console.log(res.data)
//         // setOutput(res.data.translatedText)
//       });
//     }

const translate = require('google-translate-api');

translate('Ik spreek Engels', {from:'es',to: 'en'}).then(res => {
    console.log(res.text);
    //=> I speak English
    console.log(res.from.language.iso);
    //=> nl
}).catch(err => {
    console.error(err);
});

    