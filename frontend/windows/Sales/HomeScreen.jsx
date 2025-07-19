import React from 'react'

const HomeScreen = () => {
  return (
    <React.Fragment>
      <section className="flex flex-col justify-center items-center h-screen border">
        <h1 className="mb-10 tracking-wide font-semibold">Sales/Performance Overview</h1>
        <ul className="text-sm tracking-wide flex flex-col gap-2 mt-8">
          {
            [
              "💰 Total properties sold", 
              "🔁 Active listings", 
              "📈 Monthly performance chart (optional)", 
              "🎯 Target vs Achieved (if your business tracks KPIs)"
            ].map((label, index) => (
              <li key={label}>
                {label}
              </li>
            ))}
        </ul>
      </section>
    </React.Fragment>
  )
}

export { HomeScreen }