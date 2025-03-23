import React, { useState,useEffect } from 'react'
import { IoLanguageOutline, IoSend } from "react-icons/io5";
import loderres from "../assets/loderres.gif"
import ReactMarkdown from "react-markdown";
import { saveAs } from 'file-saver';
import { IoMdDownload } from "react-icons/io";
import { PiSpeakerHighFill } from "react-icons/pi";
import { FaVolumeMute } from "react-icons/fa";
import Speech from 'react-speech';
import { handleError } from '../component/ErrorMessage.jsx';
import { useNavigate } from 'react-router';

const ChatContainer = () => {
    const [loder, setLoder] = useState(false)
    const [valueText, setValueText] = useState('')
    const [showLan, setShowLan] = useState(false)
    const [checkLan, setCheckLan] = useState("")
    const [resData, setResData] = useState([])
    const [Usebtn, setUsebtn] = useState(false)
    const [mutebtn,setMutebtn]= useState(false)
    const naviget=useNavigate()
    useEffect(()=>{
        const token=localStorage.getItem("auth-token");
        if(!token){
            handleError("Login frist")
            naviget('login')
        }
    },[])
        const handleclickai = async() => {
            setLoder(true)
            const url=`${import.meta.env.VITE_BACKEND_URL}/api/v2/aiwork/userquestion`
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question:valueText })
            });
            const data = await response.json();
            console.log(data)
            setResData(data.answer)
            setLoder(false)
            setValueText("")
            setUsebtn(true)
            const url1=`${import.meta.env.VITE_BACKEND_URL}/api/v2/aiwork/addchathistory`
            const token=localStorage.getItem("auth-token")
            const response1 = await fetch(url1,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token":token
                },
                body: JSON.stringify({ message:valueText,response:data.answer })
            })
            const data1 = await response1.json();
            
            console.log(data1)
        }
    const spaketheresponce = () => {
        setMutebtn(true) 
        speakText(resData);
    }
    const stopspake=()=>{
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
        setMutebtn(false)
    }
    const savefile = () => {
        // const blob = new Blob([Array.isArray(resData) ? resData.join("\n") : resData], { type: 'text/plain;charset=utf-8' });
        const blob = new Blob([resData], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'answer.txt');
    }
    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US'; // Change this for other languages
            speechSynthesis.speak(utterance);
        } else {
            alert('Text-to-Speech is not supported in this browser.');
        }
    };
    return (
        <div className='flex flex-col pt-14 items-center justify-center p-2 w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className="inputBox px-4 flex items-center justify-center w-[90%] lg:w-[70%] h-[15%] mb-2 rounded-2xl bg-gray-900">
                <div onClick={()=>setShowLan((v) => !v)} className='h-[3rem] w-[3rem] rounded-full bg-gray-600 flex items-center justify-center cursor-pointer'>
                    <IoLanguageOutline />
                </div>
                <div className='flex-1 mx-6 my-6'>
                    <textarea placeholder='Enter your doubt topic' value={valueText}  onChange={(e)=>setValueText(e.target.value)} name="" className='w-full h-full resize-none outline-none'></textarea>
                </div>
                <button onClick={handleclickai} className='h-[3rem] w-[3rem] rounded-full bg-gray-600 flex items-center justify-center cursor-pointer'>
                    <IoSend />
                </button>
            </div>

            {showLan && <div className="lan flex flex-col gap-2 fixed top-22 left-24">
                <button onClick={()=>setCheckLan("english")} className='px-4 py-2 bg-gray-600 text-black rounded-3xl cursor-pointer hover:bg-gray-400'>English</button>
                <button onClick={()=>setCheckLan("hindi")} className='px-4 py-2 bg-gray-600 text-black rounded-3xl cursor-pointer hover:bg-gray-400 '>Hindi</button>
                <button onClick={()=>setCheckLan("bengali")} className='px-4 py-2 bg-gray-600 text-black rounded-3xl cursor-pointer hover:bg-gray-400 '>Bengali</button>
                <button onClick={()=>setCheckLan("bhojpuri")} className='px-4 py-2 bg-gray-600 text-black rounded-3xl cursor-pointer hover:bg-gray-400'>Bhojpuri</button>
            </div>}

            <div className="inputBox p-4 flex flex-col items-center justify-center w-[90%] lg:w-[70%] h-[75%] bottom-6 rounded-2xl bg-gray-900 overflow-auto">
            {loder?<img src={loderres} alt="loder" className='w-20 h-20'/>:<div className='w-full h-full'><ReactMarkdown>{Array.isArray(resData) ? resData.join("\n") :resData }</ReactMarkdown><div>{Usebtn?<div className='flex gap-x-[11px] py-[9px]' ><div onClick={savefile}><IoMdDownload className='h-[30px] cursor-pointer' /></div>{mutebtn?<div onClick={stopspake}><FaVolumeMute className='cursor-pointer'/></div>:<div onClick={spaketheresponce}><PiSpeakerHighFill className='cursor-pointer'/></div>}</div>:""}</div></div>}
            
            </div>
            <div>

            
           
            </div>
           
        </div>
    )
}

export default ChatContainer