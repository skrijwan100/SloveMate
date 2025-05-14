import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Markdown from 'react-markdown';
import ReactMarkdown from "react-markdown";
import { handleSuccess,handleError } from './ErrorMessage';
export default function HistoryShow() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            handleError("Login first")
            naviget('/login')
        }
        const fecthhistory= async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/aiwork/viwehistory`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            }
        })
        const data = await response.json();
        // console.log(data.history)
        setHistory(data.history)
        }

fecthhistory()
    }, [])

    const handleDelete= async (id) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/aiwork/deletechathistory/${id}`
        const token = localStorage.getItem("auth-token");
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            }
        })
        const data = await response.json();
        // console.log(data)
        if (data.message) {
            handleSuccess(data.message)
            setHistory((prevHistory) => prevHistory.filter((item) => item._id !== id));
        } else {
            handleError("Failed to delete history")
            console.error("Failed to delete history");
        }
    }
return (
    <div>
        {<div className='w-full min-h-[90vh] px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold text-center text-white mb-8 pt-4'>Your History</h1>
            <div className='max-w-4xl mx-auto space-y-4'>
                {history && history.length > 0 ? (
                    history.map((item, index) => (
                        <div key={index} className='bg-black rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-7 border border-gray-700'>
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                                <div className='space-y-2 w-full'>
                                    <p className='text-base sm:text-lg font-semibold text-white mb-4 sm:mb-8 break-words'>{item.message}</p>
                                    <div className='prose prose-invert max-w-full overflow-x-auto'>
                                        <Markdown>{item.response}</Markdown>
                                    </div>
                                    <p className='text-xs sm:text-sm text-gray-400'>{item.date ? new Date(item.date).toLocaleString() : 'Date not available'}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleDelete(item._id)}
                                className='w-full sm:w-auto mt-4 px-4 py-2 mb-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer'
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <div className='flex flex-col items-center justify-center p-4 sm:p-10'>
                        <h1 className='text-xl sm:text-2xl text-gray-500'>No History Found</h1>
                    </div>
                )}
            </div>
        </div>}
    </div>
)
}
