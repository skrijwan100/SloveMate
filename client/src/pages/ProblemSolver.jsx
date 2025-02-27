import React from 'react'

const ProblemSolver = () => {
    const handleclickai = async() => {
        const url=`${import.meta.env.VITE_BACKEND_URL}/api/v2/aiwork/userquestion`
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: "what is MERN stack" }),
        });
        const data = await response.json();
        console.log(data)
    }
  return (
    <>
   <button>this is try button</button>
    <button onClick={handleclickai} type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">send messaege</button>

    <button>This is rijwan </button>
    </>
  )
}

export default ProblemSolver