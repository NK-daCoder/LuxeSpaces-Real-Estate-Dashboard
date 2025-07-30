import React, { useState } from 'react'
import { PrimaryNav } from '../../components/PrimaryNav'

import { HomeScreen } from "../../windows/Sales/HomeScreen";
import { Client } from "../../windows/Sales/Client";
import { Properties } from "../../windows/Sales/Properties";
import { Reports } from "../../windows/Sales/Reports";
import { LeadsAndInquries } from "../../windows/Sales/LeadsAndInquries";
import { Settings } from "../../windows/Sales/Settings";
import { HelpDesk } from "../../windows/Sales/HelpDesk";

import { SalesDashboardPaths } from '../../constants/paths';
import { isTokenExpired } from '../../constants/util';
import { useNavigate } from 'react-router-dom';

const SalesAgent = () => {
  const [selectedButton, setSelectedButton] = useState("Home");
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  if (!token || isTokenExpired(token)) {
    alert("Your session has expired. Please log in again.");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("is_agent");
    localStorage.removeItem("user");
    navigate("/agent/login");
  }

  const renderWindow = (buttonState) => {
    switch (buttonState) {
      case "Home":
        return <HomeScreen/>
      case "Clients":
        return <Client/>
      case "Properties":
        return <Properties/>
      case "Reports":
        return <Reports/>
      case "Inquiries And Leads":
        return <LeadsAndInquries />
      case "Settings":
        return <Settings />
      case "Help":
        return <HelpDesk/>
      case "Logout":
        return window.location.href = SalesDashboardPaths.Logout
      default:
        return window.location.href = "/unauthorized"
    }
  }
  const userProfile = JSON.parse(localStorage.getItem("user"));
  // console.log(userProfile)
  return (
    <div>
      <PrimaryNav 
        buttonState={ selectedButton }
        setButtonState={ setSelectedButton }
      />

      <div>
        <header className='w-full border-b py-4 fixed top-0 left-0 bg-white z-40'>
          <section className=" flex justify-between items-center px-4 lg:max-w-[95%] sm:max-w-[75%] xs:max-w-[50%] mx-auto">
            <div className="pl-10">
                <h1 className="tracking-wide text-sm font-semibold">Welcome {userProfile.username}</h1>
                <p className="text-xs text-stone-500">This is your {selectedButton} window</p>
            </div>
            <div className="flex items-center gap-3">
                {
                  [{label: "messages", icon: "fi fi-rr-envelope"}, {label: "notifications", icon: "fi fi-rr-bell"}].map((item, index) => (
                    <button 
                      key={index} 
                      className="text-sm text-stone-500 hover:text-stone-800 rounded-md transition-colors duration-200"
                      aria-label={item.label}
                    >
                      <i className={item.icon}></i>
                    </button>
                  ))
                }
                <button
                  type='button'
                  className="text-sm text-stone-500 hover:text-stone-800 transition-colors duration-200 border size-6 rounded-full overflow-hidden"
                  aria-label='profile'
                >
                  <img src="#" alt="" className='size-full object-cover' />
                </button>
            </div>
          </section>
        </header>
        <main className='mt-20 px-4 lg:max-w-[89%] sm:max-w-[75%] xs:max-w-[50%] mx-auto'>
            {renderWindow(selectedButton)}
        </main>
      </div>
    </div>
  )
}

export default SalesAgent