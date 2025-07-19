import React, { useState } from 'react'
import { PrimaryNav } from '../../components/PrimaryNav'
import { HomeScreen } from '../../../windows/Sales/HomeScreen';
import { SalesDashboardPaths } from '../../constants/paths';
import { Client } from '../../../windows/Sales/Client';
import { Properties } from '../../../windows/Sales/Properties';
import { Reports } from '../../../windows/Sales/Reports';
import { LeadsAndInquries } from '../../../windows/Sales/LeadsAndInquries';
import { Settings } from '../../../windows/Sales/Settings';
import { HelpDesk } from '../../../windows/Sales/HelpDesk';

const SalesAgent = () => {
  const [selectedButton, setSelectedButton] = useState("Home");

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

  return (
    <div className='flex'>
      <PrimaryNav 
        buttonState={ selectedButton }
        setButtonState={ setSelectedButton }
      />

      <div className="w-full overflow-y-auto max-h-screen">
        {renderWindow(selectedButton)}
      </div>
    </div>
  )
}

export default SalesAgent