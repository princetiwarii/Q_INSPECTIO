import React from 'react'
import logo from "./assets/logo.avif"

const Top_bar = () => {
  return (
    <div class="flex w-full font-sans px-6 py-2 border-b border-gray-400 shadow-md bg-[#fbfbfc]">
      <div >
        <img src={logo} alt="logo" class="w-13 h-auto"></img>
      </div>
      <div>
      <h1 class="text-3xl"><b>IScan</b></h1>
      <p class="text-md text-black/50">AI-powered welding defect detection</p>
      </div>
    </div>
  )
}

export default Top_bar