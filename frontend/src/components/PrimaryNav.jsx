import React from 'react'
import { SalesDashboard } from '../constants/const.js'
import { useNavigate } from 'react-router-dom';

const PrimaryNav = ({buttonState, setButtonState}) => {
    const handelLogOut = () => {
        localStorage.clear();
        window.location.href = "/agent/login"
    }
  return (
    <nav className='h-screen bg-white border flex flex-col justify-between px-4 py-4 overflow-y-auto fixed left-0 top-0 z-50'>
        <div className="flex flex-col justify-center items-center text-sm font-semibold tracking-wide text-stone-700">
            <i className="fi fi-brands-astrazeneca text-lg"></i>
            Luxes
        </div>
        <ul className="flex flex-col items-center justify-center gap-3 mt-[10%]">
            {
                SalesDashboard.primaryLinks.map((link, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <button 
                            aria-label={link.label} 
                            title={link.label}
                            className={`${buttonState === link.label && "from-blue-300 to-blue-500 shadow-blue-400 shadow-md"} rounded-xl text-gray-700 bg-gradient-to-b hover:bg-blue-400 hover:frbg-blue-500 transition-all duration-200`}
                            onClick={() => setButtonState(link.label)}
                        >
                            <i className={`${buttonState === link.label ? link.iconTwo: link.iconOne} size-9 text-stone-400 filter hover:brightness-0 hover:invert ${buttonState === link.label && "brightness-0 invert"} flex items-center justify-center`}></i>
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
                            className={`${buttonState === link.label && "from-blue-300 to-blue-500 shadow-blue-400 shadow-md"} rounded-xl text-gray-700 bg-gradient-to-b hover:bg-blue-400 hover:frbg-blue-500 transition-all duration-200`}
                            onClick={() => setButtonState(link.label)}
                        >
                            <i className={`${buttonState === link.label ? link.iconTwo: link.iconOne} text-stone-400 size-9 filter hover:brightness-0 hover:invert ${buttonState === link.label && "brightness-0 invert"} flex items-center justify-center`}></i>
                        </button>
                    </li>
                ))
            }
            <li className="flex items-center gap-2">
                <button 
                    aria-label='logout' 
                    title='logout'
                    onClick={handelLogOut}
                >
                    <i className={`fi fi-rr-sign-out-alt text-stone-400 size-9 filter hover:brightness-0 hover:invert`}></i>
                </button>
                {/* 
                 {iconOne:"fi fi-rr-sign-out-alt", iconTwo:"fi fi-sr-sign-out-alt" ,label: 'Logout', to: SalesDashboardPaths.Logout}
                */}
            </li>
        </ul>
    </nav>
  )
}

export { PrimaryNav }