import React from 'react'
import { SalesDashboard } from '../constants/const.js'

const PrimaryNav = ({buttonState, setButtonState}) => {
  return (
    <nav className='h-screen bg-white border flex flex-col justify-between px-2 py-4 overflow-y-auto'>
        <div className="flex flex-col justify-center items-center text-xs font-semibold tracking-widest text-stone-700">
            <i className="fi fi-brands-astrazeneca text-2xl"></i>
            Luxes
        </div>
        <ul className="flex flex-col items-center justify-center gap-3 mt-[10%]">
            {
                SalesDashboard.primaryLinks.map((link, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <button 
                            aria-label={link.label} 
                            title={link.label}
                            className={`${buttonState === link.label && "from-blue-300 to-blue-500 shadow-blue-400 shadow-md"} rounded-xl hover:shadow-md hover:shadow-blue-400 text-gray-700 bg-gradient-to-b hover:to-blue-500 hover:from-blue-300 transition-all duration-200`}
                            onClick={() => setButtonState(link.label)}
                        >
                            <i className={`${buttonState === link.label ? link.iconTwo: link.iconOne} size-9 filter hover:brightness-0 hover:invert ${buttonState === link.label && "brightness-0 invert"} flex items-center justify-center`}></i>
                        </button>
                    </li>
                ))
            }
        </ul>
        <ul className="flex flex-col items-center justify-center gap-3">
            {
                SalesDashboard.secondayLinks.map((link, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <button 
                            aria-label={link.label} 
                            title={link.label}
                            className={`${buttonState === link.label && "from-blue-300 to-blue-500 shadow-blue-400 shadow-md"} rounded-xl hover:shadow-md hover:shadow-blue-400 text-gray-700 bg-gradient-to-b hover:to-blue-500 hover:from-blue-300 transition-all duration-200`}
                            onClick={() => setButtonState(link.label)}
                        >
                            <i className={`${buttonState === link.label ? link.iconTwo: link.iconOne} size-9 filter hover:brightness-0 hover:invert ${buttonState === link.label && "brightness-0 invert"} flex items-center justify-center`}></i>
                        </button>
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}

export { PrimaryNav }