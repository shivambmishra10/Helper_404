import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
const axios = require('axios').default;
function App() {
  const [options,setOptions]=useState([])
  const [to,setTo]=useState("en")
  const [from,setFrom]=useState("en")
  const [input,setInput]=useState("")
  const [output,setOutput]=useState("")
 
  const translate=()=>
  {
    axios({url:'https://translate.mentality.rip/translate',
    method: 'post',
    data:{
      q: input,
      source: from,
      target: to,
      format: "text"
    },
      headers:{
        // "accept":"application/json",
        "Content-Type":"application/json",
      },
    }).then(res=>
      {
        console.log(res.data)
        setOutput(res.data.translatedText)
      })
    }
  console.log("hello")
  useEffect(() => {
     axios.get('https://libretranslate.com/languages',
     {headers:{'accept':'application/json'}}).then(res=>
      {
        console.log(res.data);
        setOptions(res.data);
      })
  },[])
  // curl -X GET "https://libretranslate.com/languages" -H  "accept: application/json"
  return (
    <div className="App">
      <div>
        From ({from}):
        <select onChange={e=>setFrom(e.target.value)}>
           {options.map(opt=><option key={opt.code}  value={opt.code}>{opt.name}</option>)}
        </select>
        To ({to}):
        <select onChange={e=>setTo(e.target.value)}>
           {options.map(opt=><option key={opt.code} value={opt.code}>{opt.name}</option>)}
        </select>
    
      </div>
      <div>
        <textarea cols="50" rows="8" onInput={(e)=>setInput(e.target.value)}></textarea>
      </div>
      <div>
        <textarea cols="50" rows="8" value={output}></textarea>
      </div>
      <div>
        <button onClick={e=>translate()}>Translate</button>
      </div>
    </div>
  );
}

export default App;
