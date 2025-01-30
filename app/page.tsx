'use client'
import React, {useState, useEffect} from 'react'
import { HiOutlineSpeakerWave as SpeakerOn} from "react-icons/hi2";
import { HiOutlineSpeakerXMark as SpeakerOff } from "react-icons/hi2";
import { LuSquareX as FieldOff } from "react-icons/lu";
import { LuSquareCheck as FieldOn } from "react-icons/lu";
import { GoNumber as CounterOn } from "react-icons/go";
import { RiNumber0 as CounterOff } from "react-icons/ri";


export default function Home() {
  
  const [readAloud, setReadAloud] = useState(true)
  const [showFieldColor, setShowFieldColor] = useState(true)
  const [fieldCounter, setFieldCounter] = useState(true)
  const [counter, setCounter] = useState(0)
  const [fieldColor, setFieldColor] = useState('white')
  const [randomField, setRandomField] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  // const [smallScreen, setSmallScreen] = useState(false)
  
  // Function Returns Random Chess Field
  function GetRandomChessField() {
    const files = "abcdefgh";
    const ranks = "12345678";
    const randomField = files[Math.floor(Math.random() * 8)] + ranks[Math.floor(Math.random() * 8)];
    return randomField;
  }

  // Function That Speaks Text (Passes as Parameter) out
  function DoSpeakText(text:string){

    setIsSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';

    const voices = speechSynthesis.getVoices();
    const germanVoice = voices.find(voice => voice.lang === 'de-DE' && voice.name.includes('Stefan'));
    
    if (germanVoice) {
      utterance.voice = germanVoice;
    }
    utterance.onend = () =>{
      setIsSpeaking(false)
    }
    speechSynthesis.speak(utterance)
  }

  //  Function That Sets Field Color of The Given Field (as Parameter)
  function DoFieldColor(squareName:string) {
    // Überprüfen, ob der Eingabeparameter gültig ist
    if (!/^[a-h][1-8]$/.test(squareName)) {
        throw new Error("Ungültiger Schachfeldname. Gültig sind z.B. 'a1', 'h8'.");
    }
    // Spalte (Buchstabe) und Reihe (Zahl) extrahieren
    const column = squareName.charCodeAt(0) - 'a'.charCodeAt(0); // 'a' -> 0, ..., 'h' -> 7
    const row = parseInt(squareName[1], 10) - 1; // '1' -> 0, ..., '8' -> 7

    const currentFieldColor = (column + row) % 2 === 0 ? "black" : "white" 
    setFieldColor(currentFieldColor)
    // Farbe berechnen (Schwarz, wenn die Summe von Spalte und Reihe ungerade ist)
  }

  // Wrapper Function 
  function DoRun(){
    const field = GetRandomChessField()
    setRandomField(field)
    if(readAloud && counter!==0 && !isSpeaking) DoSpeakText(field)
    if(fieldCounter) setCounter((p)=>p=p+1)
    DoFieldColor(field)
  }
  
  function HandleFieldClick(){
    DoRun()
  }

  useEffect(() => {
    // if(window.innerWidth < 450) setSmallScreen(true)
    DoRun()

  }, [])
  

  return (
    <div className="Home relative overflow-hidden">
      <div className={`HomeBody`}>

        { fieldCounter && <div className="counter--section">
            <p className={`${fieldCounter ? 'text-gray-700' : 'text-beige'}`}>
              {counter}
            </p>
        </div>}

        <div className={`pseudo--container ${showFieldColor ? (fieldColor ==='white'?'bg-white':'bg-black') : 'bg-beige'}`}></div>

        <div className={`field--section ${showFieldColor ? (fieldColor ==='white'?'bg-white':'bg-black') : 'bg-beige'}`} onClick={()=>{HandleFieldClick()}}>
          <p className={`transition-all duration-600 field--text`}>
            {randomField}
          </p>
        </div>

        <div className={`pseudo--container ${showFieldColor ? (fieldColor ==='white'?'bg-white':'bg-black') : 'bg-beige'}`}></div>

        <div className="options--section">
            <button type="button" onClick={()=>{setReadAloud((p:boolean)=>!p)}} className="option--button">{readAloud ? <SpeakerOn/> : <SpeakerOff/>}</button>
            <button type="button" onClick={()=>{setShowFieldColor((p)=>!p)}} className="option--button">{showFieldColor? <FieldOn/> : <FieldOff/>}</button>
            <button type="button" className="option--button" onClick={()=>{setFieldCounter((p)=>!p)}}>{fieldCounter? <CounterOn/> : <CounterOff/>}</button>
        </div>

      </div>
    </div>
  );
}
