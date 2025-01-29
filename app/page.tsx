'use client'
import Image from "next/image";
import React, {useState, useEffect, useRef} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import { HiOutlineSpeakerWave as SpeakerOn} from "react-icons/hi2";
import { HiOutlineSpeakerXMark as SpeakerOff } from "react-icons/hi2";
import { IoMicOffOutline as MicOff } from "react-icons/io5";
import { IoMicOutline as MicOn } from "react-icons/io5";
import { LuSquareX as FieldOff } from "react-icons/lu";
import { LuSquareCheck as FieldOn } from "react-icons/lu";
import { LuPointerOff as ClickOff } from "react-icons/lu";
import { LuPointer as ClickOn } from "react-icons/lu";
import { GoNumber as CounterOn } from "react-icons/go";
import { RiNumber0 as CounterOff } from "react-icons/ri";








export default function Home() {
  
  // configuration
  const [showComponentA, setShowComponentA] = useState(true)
  const [readAloud, setReadAloud] = useState(true)
  const [clickForNextField, setClickForNextField] = useState(true)
  const [operateWithVoice, setOperateWithVoice] = useState(false)
  const [showFieldColor, setShowFieldColor] = useState(true)
  const [fieldCounter, setFieldCounter] = useState(true)

  const [counter, setCounter] = useState(0)

  const recognitionRef = useRef(null)
  const [isListening, setIsListening] = useState(false)
  
  const [fieldColor, setFieldColor] = useState('white')

  const [speakWord, setSpeakWord] = useState(false)
  const [randomField, setRandomField] = useState('a1')
  const [transcriptValue, setTranscriptValue] = useState('.')
  const randomFieldRef = useRef(randomField); 

  const example = "hallo world"
  const readAloudTxt = "Laut Lesen"
  const nextFieldOnClickTxt = "Für nächstes Feld klicken"
  const operateWithVoiceTxt = "Mit Stimme bedienen"
  const showFieldColorTxt = "Feldfarbe anzeigen"
  const filedCounterTxt = "Feldzähler"
  
  const startTxt = "Starten" 
  const introductionTxt = "Schachfelder auf dem Brett simulieren"

  // let utterance = new SpeechSynthesisUtterance(example);
  
  // Function Returns Random Chess Field
  function GetRandomChessField() {
    const files = "abcdefgh";
    const ranks = "12345678";
    const randomField = files[Math.floor(Math.random() * 8)] + ranks[Math.floor(Math.random() * 8)];
    return randomField;
  }

// Function That Speaks Text (Passes as Parameter) out
  function DoSpeakText(text:string){

    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';

    const voices = speechSynthesis.getVoices();
    const germanVoice = voices.find(voice => 
      voice.lang === 'de-DE' && !voice.name.includes('Google')
    );
    
    if (germanVoice) {
      utterance.voice = germanVoice;
    }
    
    speechSynthesis.speak(utterance)
  }

  // const [isListening, setIsListening] = useState(false);

  // const DoListenForText = () => {
  //   if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
  //     console.error("Speech Recognition API is not supported in this browser.");
  //     return;
  //   }
  //   const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  //   recognition.lang = 'de-DE';
  //   // recognition.continuous = true;
  //   recognition.interimResults = true;
  
  //   recognition.onresult = (event:any) => {
  //     for(let i = event.resultIndex; i <event.results.length; i++){
  //         console.log(event.results[i][0].transcript.trim())
  //         DoCheckField(event.results[i][0].transcript.trim())
  //     }
  //   };
  //   recognition.onerror = (err: any) => {
  //     console.error("Speech recognition error:", err);
  //   };
  //   recognition.onend = () => {
  //     console.log("Speech recognition stopped.");
  //   };
  //   recognitionRef.current = recognition;

  // };
  // if(command === 'start'){
  //   recognition.start();
  // }else if(command === 'stop'){
  //   recognition.abort();
  //   recognition.stop();
  // }
  
  // Aufruf
  // listenForText();

  // function HandlePlay(){
  //   let field = GetRandomChessField()
  //   DoSpeakText(field)
  //   setRandomField(field)
  // }
  // function DoNextField(){
  //   let field = GetRandomChessField()
  //   setRandomField(field)
  // }
  // function DoReadField(){
  //   DoSpeakText(randomField)
  // }
  // function DoCheckField(text:string){
  //   let possibleValues = GetAllPossibleValues()
  //   let currentField = randomFieldRef.current;
  //   console.log('current Value in docheckfield: ', currentField)
  //   possibleValues = possibleValues[currentField]
  //   for(let value of possibleValues){
  //     if (text === value){
  //       console.log("treffer!")
  //       let newField = GetRandomChessField()
  //       setRandomField(newField)
  //       return
  //     }
  //   }
  // }
  
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
  // function GetAllPossibleValues(){
  //   const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];

  //   const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  //   const phoneticAlphabet = {
  //     a: ['anton', 'Ah'],
  //     b: ['berta', 'Be'],
  //     c: ['caesar', 'z'],
  //     d: ['dora','die','der', 'dee'],
  //     e: ['emil','emails', 'e mail', 'ä','äh'],
  //     f: ['friedrich', 'Ef'],
  //     g: ['gustav', 'gehe'],
  //     h: ['heinrich', 'Haa']
  //   };
  //   const phoneticAlphabet1 = {
  //     a: ['Anton'],
  //     b: ['Berta'],
  //     c: ['Caesar','Z'],
  //     d: ['Dora','Die','Der'],
  //     e: ['Emil','Emails','E mail','Ä','Äh','Äh,'],
  //     f: ['Friedrich'],
  //     g: ['Gustav','Gehe'],
  //     h: ['Heinrich']
  //   };
  //   const mappings = {}

  //   for(let column of columns){
  //     for(let row of rows){
  //       const field = `${column}${row}`;
  //       const variations = [
  //         field, 
  //         `${column} ${row}`,
  //         `${column.toUpperCase()}${row}`,
  //         `${column.toUpperCase()} ${row}`,
  //       ];
  //       const phonetics = phoneticAlphabet[column]?.map(
  //         (phonetic:string)=>`${phonetic} ${row}`
  //       )||[];
  //       const phonetics1 = phoneticAlphabet1[column]?.map(
  //         (phonetic:string)=>`${phonetic} ${row}.`
  //       )||[];
  //       mappings[field] = [...variations, ...phonetics, ...phonetics1]
  //     }
  //   }
  //   return mappings
  // }

  function DoRun(){
    let field = GetRandomChessField()
    setRandomField(field)
    if(readAloud) DoSpeakText(field)
    if(fieldCounter) setCounter((p)=>p=p+1)
    DoFieldColor(field)
  }
  
  function HandleFieldClick(){
    DoRun()
    console.log(fieldColor)
  }


// Beispielverwendung:

// useEffect(() => {
//   randomFieldRef.current = randomField; // Aktualisiere das Ref, wenn randomField sich ändert
//   // DoFieldColor(randomField); // "schwarz"
// }, [randomField]);

  // function HandleStart(){
  //   // listenForText('start')
  //   // setShowComponentA((p)=>!p)
  //   // DoShowField()
  // }
  // function HtmlSlider({text_, checked_, setChecked_, index}){
  //   let uniqueID = `checkbox${index}`
  //   // setChecked_((p:boolean)=>!p)
  //   return(
  //     <div className={`settings--option`} >
  //           <label className="cursor-pointer" htmlFor={uniqueID} > {text_}</label>
  //           <label className="switch" htmlFor={uniqueID}>
  //             <input type="checkbox"  id={uniqueID} checked={checked_} onChange={(e)=>setChecked_(e.target.checked)} />
  //             <div className={`slider round`}></div>
  //           </label>
  //     </div>
  //   )
  // }

  // function HtmlPlayground({DoHandleFieldClick}){

  //   function DoStartListen(){
  //     // setIsListening(true)
  //     recognitionRef.current.start()
  //   }
  //   function DoStopListen(){
  //     // setIsListening(false)
  //     recognitionRef.current.abort()
  //     recognitionRef.current.stop()

  //     console.log('stopping')
  //   }
  //   function HandleReadAloud(){
  //     if(!readAloud&&operateWithVoice){
  //       setReadAloud(true)
  //       setOperateWithVoice(false)
  //     } else{
  //       setReadAloud((p:boolean)=>!p)
  //     }
  //   }

  //   function HandleOperateWithVoice(){
  //     if(!operateWithVoice&&readAloud){
  //       setReadAloud(false)
  //       setOperateWithVoice(true)
  //     }else{
  //       setOperateWithVoice((p:boolean)=>!p)
  //     }
  //   }
  //   function HandleClickForNextField(){
  //     if(!operateWithVoice && clickForNextField){
  //       setOperateWithVoice(true)
  //       setClickForNextField(false)
  //     }else{
  //       setClickForNextField((p:boolean)=>!p)
  //     }
  //   }
  //   useEffect(() => {
  //     if(!operateWithVoice){
  //       setClickForNextField(true)
  //     }
  //   }, [operateWithVoice])
    
  //   useEffect(()=>{
  //     // DoListenForText()
  //   },[])
  //   return(
      
  //   )
  // }

  // function HtmlSettings({readAloud, setReadAloud, clickForNextField, setClickForNextField, operateWithVoice, setOperateWithVoice, showFieldColor, setShowFieldColor, fieldCounter, setFieldCounter}){

    // function HandleReadAloud(){
    //   if(!readAloud&&operateWithVoice){
    //     setReadAloud(true)
    //     setOperateWithVoice(false)
    //   } else{
    //     setReadAloud((p:boolean)=>!p)
    //   }
    // }

  //   function HandleOperateWithVoice(){
  //     if(!operateWithVoice&&readAloud){
  //       setReadAloud(false)
  //       setOperateWithVoice(true)
  //     }else{
  //       setOperateWithVoice((p:boolean)=>!p)
  //     }
  //   }
    // function HandleClickForNextField(){
    //   if(!operateWithVoice && clickForNextField){
    //     setOperateWithVoice(true)
    //     setClickForNextField(false)
    //   }else{
    //     setClickForNextField((p:boolean)=>!p)
    //   }
    // }
  //   useEffect(() => {
  //     if(!operateWithVoice){
  //       setClickForNextField(true)
  //     }
  //   }, [operateWithVoice])
    
  //   return(
  //     <div className='SettingBody'>
  //       <div className='Setting--introduction'>
  //         <h2 className='introduction--text'>{introductionTxt}</h2>
  //       </div>
  //       <div className="Setting--options">
  //         <HtmlSlider text_={readAloudTxt} checked_={readAloud} setChecked_={HandleReadAloud} index={1} />
  //         {/* <HtmlSlider text_={nextFieldOnClickTxt} checked_={clickForNextField} setChecked_={HandleClickForNextField} index={2} /> */}
  //         {/* <HtmlSlider text_={operateWithVoiceTxt} checked_={operateWithVoice} setChecked_={HandleOperateWithVoice} index={3} /> */}
  //         <HtmlSlider text_={showFieldColorTxt} checked_={showFieldColor} setChecked_={setShowFieldColor} index={4} />
  //         <HtmlSlider text_={filedCounterTxt} checked_={fieldCounter} setChecked_={setFieldCounter} index={5} />
  //       </div>
  //       <div className="Setting--action">
  //         <button type="button" className="action--button" onClick={HandleStart}>{startTxt}</button>
  //       </div>
  //     </div>
  //   )
  // }

  // function DoChangeState(){
  //   setReadAloud((p)=>!p)
  // }
  return (
    <div className="Home relative overflow-hidden">

      <div className={`HomeBody`}>
          <div className="counter--section">
            <p className={`${fieldCounter ? 'text-gray-700' : 'text-beige'}`}>
              {counter}
            </p>
          </div>
        <div className={`field--section ${showFieldColor ? (fieldColor ==='white'?'bg-white':'bg-black') : 'bg-beige'}`} onClick={()=>{HandleFieldClick()}}>
          <p className={`transition-all duration-600 field--text`}>
            {randomField}
          </p>
        </div>

          <div className="options--section">
          <button type="button" onClick={()=>{setReadAloud((p:boolean)=>!p)}} className="option--button">{readAloud ? <SpeakerOn/> : <SpeakerOff/>}</button>
          <button type="button" onClick={()=>{setShowFieldColor((p)=>!p)}} className="option--button">{showFieldColor? <FieldOn/> : <FieldOff/>}</button>
          <button type="button" className="option--button" onClick={()=>{setFieldCounter((p)=>!p)}}>{fieldCounter? <CounterOn/> : <CounterOff/>}</button>
          </div>
        </div>
        
      </div>
  );
}
