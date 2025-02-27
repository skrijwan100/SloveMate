import React, { useState } from 'react'
import { IoLanguageOutline, IoSend } from "react-icons/io5";

const ChatContainer = () => {
    const [valueText, setValueText] = useState('')
    const [showLan, setShowLan] = useState(false)
    const [checkLan, setCheckLan] = useState("")
    const showValue = () => {
        console.log(valueText)
    }
    return (
        <div className='flex flex-wrap w-full h-full relative'>
            <div className="inputBox px-4 flex items-center justify-center fixed left-1/2 transform -translate-x-1/2 w-[70%] h-[15%] my-auto top-22 rounded-2xl bg-gray-900">
                <div onClick={()=>setShowLan((v) => !v)} className='h-[3rem] w-[3rem] rounded-full bg-gray-600 flex items-center justify-center'>
                    <IoLanguageOutline />
                </div>
                <div className='flex-1 mx-6 my-6'>
                    <textarea value={valueText} onChange={(e)=>setValueText(e.target.value)} name="" className='w-full h-full resize-none outline-none'></textarea>
                </div>
                <button onClick={showValue} className='h-[3rem] w-[3rem] rounded-full bg-gray-600 flex items-center justify-center'>
                    <IoSend />
                </button>
            </div>

            {showLan && <div className="lan flex flex-col gap-2 fixed top-22 left-24">
                <button onClick={()=>setCheckLan("english")} className='px-4 py-2 bg-gray-600 text-black rounded-3xl cursor-pointer hover:bg-gray-400'>English</button>
                <button onClick={()=>setCheckLan("hindi")} className='px-4 py-2 bg-gray-600 text-black rounded-3xl cursor-pointer hover:bg-gray-400 '>Hindi</button>
                <button onClick={()=>setCheckLan("bhojpuri")} className='px-4 py-2 bg-gray-600 text-black rounded-3xl cursor-pointer hover:bg-gray-400'>Bhojpuri</button>
            </div>}

            <div className="inputBox px-4 flex items-center justify-center fixed left-1/2 transform -translate-x-1/2 w-[70%] h-[65%] my-auto bottom-6 rounded-2xl bg-gray-900">
                
            </div>
        </div>
    )
}

export default ChatContainer