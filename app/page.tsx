'use client'
import Image from "next/image";
import React, {useState, useEffect, useRef} from 'react'
import {motion, AnimatePresence} from 'framer-motion'

export default function Home() {
  
  const [showComponentA, setShowComponentA] = useState(true)
  const [readAloud, setReadAloud] = useState(false)
  const [clickForNextField, setClickForNextField] = useState(false)
  const [operateWithVoice, setOperateWithVoice] = useState(true)
  const [showFieldColor, setShowFieldColor] = useState(false)
  const [fieldCounter, setFieldCounter] = useState(false)
  
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
  
  function GetRandomChessField() {
    const files = "abcdefgh";
    const ranks = "12345678";
    const randomField = files[Math.floor(Math.random() * 8)] + ranks[Math.floor(Math.random() * 8)];
    return randomField;
  }
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

  const [isListening, setIsListening] = useState(false);

  const listenForText = (command:string) => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      console.error("Speech Recognition API is not supported in this browser.");
      return;
    }
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'de-DE';
    recognition.continuous = true;
    recognition.interimResults = true;
  
    recognition.onresult = (event:any) => {
      for(let i = event.resultIndex; i <event.results.length; i++){
          console.log(event.results[i][0].transcript.trim())
          DoCheckField(event.results[i][0].transcript.trim())
      }
    };
    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
    };
    recognition.onend = () => {
      console.log("Speech recognition stopped.");
    };
    if(command === 'start'){
      recognition.start();
    }else if(command === 'stop'){
      recognition.abort();
      recognition.stop();
    }
  };
  
  // Aufruf
  // listenForText();

  function HandlePlay(){
    let field = GetRandomChessField()
    DoSpeakText(field)
    setRandomField(field)
  }
  function DoNextField(){
    let field = GetRandomChessField()
    setRandomField(field)
  }
  function DoReadField(){
    DoSpeakText(randomField)
  }
  function DoCheckField(text:string){
    let possibleValues = GetAllPossibleValues()
    let currentField = randomFieldRef.current;
    console.log('current Value in docheckfield: ', currentField)
    possibleValues = possibleValues[currentField]
    for(let value of possibleValues){
      if (text === value){
        console.log("treffer!")
        let newField = GetRandomChessField()
        setRandomField(newField)
        return
      }
    }
  }
  function DoStartListen(){
    listenForText('start')
  }
  function DoStopListen(){
    listenForText('stop')
  }
  function GetAllPossibleValues(){
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];

    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const phoneticAlphabet = {
      a: ['anton', 'Ah'],
      b: ['berta', 'Be'],
      c: ['caesar', 'z'],
      d: ['dora','die','der', 'dee'],
      e: ['emil','emails', 'e mail', 'ä','äh'],
      f: ['friedrich', 'Ef'],
      g: ['gustav', 'gehe'],
      h: ['heinrich', 'Haa']
    };
    const phoneticAlphabet1 = {
      a: ['Anton'],
      b: ['Berta'],
      c: ['Caesar','Z'],
      d: ['Dora','Die','Der'],
      e: ['Emil','Emails','E mail','Ä','Äh','Äh,'],
      f: ['Friedrich'],
      g: ['Gustav','Gehe'],
      h: ['Heinrich']
    };
    const mappings = {}

    for(let column of columns){
      for(let row of rows){
        const field = `${column}${row}`;
        const variations = [
          field, 
          `${column} ${row}`,
          `${column.toUpperCase()}${row}`,
          `${column.toUpperCase()} ${row}`,
        ];
        const phonetics = phoneticAlphabet[column]?.map(
          (phonetic:string)=>`${phonetic} ${row}`
        )||[];
        const phonetics1 = phoneticAlphabet1[column]?.map(
          (phonetic:string)=>`${phonetic} ${row}.`
        )||[];
        mappings[field] = [...variations, ...phonetics, ...phonetics1]
      }
    }
    return mappings
  }
  useEffect(() => {
    randomFieldRef.current = randomField; // Aktualisiere das Ref, wenn randomField sich ändert
  }, [randomField]);
  useEffect(() => {
    function Run(){
      let field = GetRandomChessField()
      setRandomField(field)
      DoSpeakText(field)
      // DoCheckField()
    }
    const chessFieldMapping = GetAllPossibleValues()
    console.log(chessFieldMapping)
  
    return () => {
      
    }
  }, [])

  function HandleStart(){
    setShowComponentA((p)=>!p)
  }
  
  
  function HtmlSlider({text_, checked_, setChecked_, index}){
    let uniqueID = `checkbox${index}`
    return(
      <div className='settings--option'>
            <label className="cursor-pointer" htmlFor={uniqueID} > {text_}</label>
            <label className="switch" htmlFor={uniqueID}>
              <input type="checkbox" id={uniqueID} checked={checked_} onChange={()=>{setChecked_((p:boolean)=>!p)}} />
              <div className="slider round"></div>
            </label>
      </div>
    )
  }

  function HtmlPlayground(){
    return(
      <div className='Playground'>
        <div className='PlaygroundBody'>
          <button type="button" className="play--button" onClick={HandlePlay}>Klick mich zum Abspielen</button>
          <button type="button" className="play--button" onClick={DoNextField} > Nächstes Feld ooo </button>
          <button type="button" className="play--button" onClick={DoReadField} > Lese Feld ooo </button>
          <button type="button" className="play--button" onClick={DoStartListen} > Hören Starten ooo </button>
          <button type="button" className="play--button" onClick={DoStopListen} > Hören Stoppen ooo </button>
          <p className="display--field">{randomField}</p>
        </div>
      </div>
    )
  }
  function HtmlSettings(){
    return(
      <div className='SettingBody'>
        <div className='Setting--introduction'>
          <h3 className='introduction--text'>{introductionTxt}</h3>
        </div>
        <div className="Setting--options">
          <HtmlSlider text_={readAloudTxt} checked_={readAloud} setChecked_={setReadAloud} index={1} />
          <HtmlSlider text_={nextFieldOnClickTxt} checked_={clickForNextField} setChecked_={setClickForNextField} index={2} />
          <HtmlSlider text_={operateWithVoiceTxt} checked_={operateWithVoice} setChecked_={setOperateWithVoice} index={3} />
          <HtmlSlider text_={showFieldColorTxt} checked_={showFieldColor} setChecked_={setShowFieldColor} index={4} />
          <HtmlSlider text_={filedCounterTxt} checked_={fieldCounter} setChecked_={setFieldCounter} index={5} />
        </div>
        <div className="Setting--action">
          <button type="button" className="action--button" onClick={HandleStart}>{startTxt}</button>
        </div>
      </div>
    )
  }
  return (
    <div className="Home relative overflow-hidden">

    <AnimatePresence mode="wait">
      {
        showComponentA ? (
          <motion.div
          key="ComponentA"
          initial={{opacity:0, x:-100}}
          animate={{opacity:1, x:0}}
          exit={{opacity:0, x:100}}
          transition={{duration:0.5}}
          className={'w-full h-full'}
          >
            <HtmlSettings/>
          </motion.div>
        ) : 
        <motion.div
        key="ComponentB"
          initial={{opacity:0, x:-100}}
          animate={{opacity:1, x:0}}
          exit={{opacity:0, x:100}}
          transition={{duration:0.5}}
          className={'w-full h-full'}
        >
          <HtmlPlayground/>
        </motion.div>
      }
    </AnimatePresence>
      
    </div>
  );
}
