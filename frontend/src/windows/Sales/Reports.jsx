import React from 'react'

const Reports = () => {
  return (
    <React.Fragment>
      <section className="flex flex-col justify-center items-center h-screen">
        <h1 className="mb-10 tracking-wide font-semibold">Agent Reports — What They Need to See</h1>
        <div className="grid grid-cols-2 gap-2">
          <div>
              <h2>Sales Summary Reports</h2>
              <ul className="text-sm tracking-wide flex flex-col gap-2 mt-8">
                {
                  [
                    "💰 Total number of properties sold", 
                    "💵 Total value of properties sold (sum of price)", 
                    "📅 Filter by date: monthly, quarterly, yearly", 
                    "📍 Filter by location (if agents sell in multiple regions)"
                  ].map((label, index) => (
                    <li key={label}>
                      {label}
                    </li>
                  ))}
              </ul>
          </div>

          <div>
              <h2>Property Listing Report</h2>
              <ul className="text-sm tracking-wide flex flex-col gap-2 mt-8">
                {
                  [
                    "🏘️ Total properties listed", 
                    "📌 Breakdown by status: (active/available, pending sale/offer, Sold, Drafts (if using stageign feature))", 
                    "📅 Filter by date: monthly, quarterly, yearly", 
                    "📍 Filter by location (if agents sell in multiple regions)"
                  ].map((label, index) => (
                    <li key={label}>
                      {label}
                    </li>
                  ))}
              </ul>
          </div>

          <div>
              <h2>Property Listing Report</h2>
              <ul className="text-sm tracking-wide flex flex-col gap-2 mt-8">
                {
                  [
                    "🏘️ Total properties listed", 
                    "📌 Breakdown by status: (active/available, pending sale/offer, Sold, Drafts (if using stageign feature))", 
                    "📅 Commission Report (if your agency uses commissions) -> (total commissions earned, view breakdown, Export as PDF or CSV)", 
                    "📍 Filter by location (if agents sell in multiple regions)"
                  ].map((label, index) => (
                    <li key={label}>
                      {label}
                    </li>
                  ))}
              </ul>
          </div>
        </div>
        
      </section>
    </React.Fragment>
  )
}

export { Reports }