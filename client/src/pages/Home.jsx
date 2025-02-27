import React from 'react'
import logo from '../assets/logo.jpeg'
import { GrSecure } from "react-icons/gr";
import { RiScanLine } from "react-icons/ri";
import { TiWarningOutline } from "react-icons/ti";
import { FaArrowRight } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { TypeAnimation } from 'react-type-animation';
const Home = () => {
  return (
    <div className='w-full h-screen backgroundNew'>
      <section className="flex items-center justify-center min-h-screen">
        <div className="text-center flex flex-col items-center">
          <div className="mb-6 h-26 w-26 centerItem">
            <img src={logo} alt="" className='h-full w-full object-cover rounded-full' />
          </div>
          <div className="flex justify-center flex-wrap space-x-4 mb-6">
            <div className="flex items-center justify-center space-x-2 neon-button bg-opacity-50 px-4 py-2 rounded-full">
              <GrSecure />
              <span className="text-blue-400 hover:text-[#050e1a]">Secured</span>
            </div>
            <div className="flex justify-center items-center space-x-2 neon-button bg-opacity-50 px-4 py-2 rounded-full">
              <RiScanLine />
              <span className="text-blue-400 hover:text-[#050e1a]">Real-time Analysis</span>
            </div>
            <div className="flex justify-center items-center space-x-2 neon-button bg-opacity-50 px-4 py-2 rounded-full hover:text-[#050e1a]">
              <TiWarningOutline />
              <span className="text-blue-400 hover:text-[#050e1a]">Threat Detection</span>
            </div>
          </div>
          <h1 className="text-9xl font-bold gradient-text my-4">SloveMate AI</h1>
          <TypeAnimation sequence={[
                // Same substring at the start will only be typed out once, initially
                'Let AI Solve Your Legal Problems',
              ]}
              className="text-2xl text-blue-300 mb-6"
              wrapper='p'/>
          {/* <p className="text-xl text-blue-300 mb-6">Next Generation Legal Intelligence</p> */}
          <p className="text-lg mb-8">Stay Alert, Stay Ahead with AI-Powered Legal Intelligence</p>
          <div className="flex justify-center gap-4">
            <button className="gradient-btn">Launch System <FaArrowRight /></button>
            <button className="demo-btn">Watch Demo <FaPlayCircle /></button>
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-blue-500">Powerful Features</h1>
          <p className="text-gray-400 mt-2">Comprehensive legal solutions powered by advanced artificial intelligence</p>
        </div>
        <div className="max-w-7xl h-[60vh] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gradient-to-r hover:from-blue-900 hover:to-purple-900 transition-colors duration-300">
              <div className="flex h-[5rem] text-4xl items-center justify-items-end mb-4">
                <div className='h-[4rem] w-[4rem] rounded-full bg-cyan-500/10 flex items-center justify-center'>
                  <FiFileText />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-blue-400">Document Generator</h2>
              <p className="text-gray-400 mt-2">Automated legal document generation system with multi-language support and context-aware legal adjustments for various document types.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gradient-to-r hover:from-blue-900 hover:to-purple-900 transition-colors duration-300">
              <div className="flex h-[5rem] text-4xl items-center justify-items-end mb-4">
                <div className='h-[4rem] w-[4rem] rounded-full bg-cyan-500/10 flex items-center justify-center'>
                  <FiFileText />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-blue-400">Document Generator</h2>
              <p className="text-gray-400 mt-2">Automated legal document generation system with multi-language support and context-aware legal adjustments for various document types.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gradient-to-r hover:from-blue-900 hover:to-purple-900 transition-colors duration-300">
              <div className="flex h-[5rem] text-4xl items-center justify-items-end mb-4">
                <div className='h-[4rem] w-[4rem] rounded-full bg-cyan-500/10 flex items-center justify-center'>
                  <FiFileText />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-blue-400">Legal Knowledge</h2>
              <p className="text-gray-400 mt-2">Real-time legal knowledge retrieval system with dynamic updates from Indian legal portals and natural language querying capabilities.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gradient-to-r hover:from-blue-900 hover:to-purple-900 transition-colors duration-300">
              <div className="flex h-[5rem] text-4xl items-center justify-items-end mb-4">
                <div className='h-[4rem] w-[4rem] rounded-full bg-cyan-500/10 flex items-center justify-center'>
                  <FiFileText />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-blue-400">Suraksha Setu</h2>
              <p className="text-gray-400 mt-2">Advanced emergency management and riot control system with real-time surveillance and AI-guided decision-making capabilities.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home