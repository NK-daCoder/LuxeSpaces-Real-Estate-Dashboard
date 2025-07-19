import React from 'react'

const HelpDesk = () => {
  return (
    <React.Fragment>
        <section className="flex flex-col justify-center items-center h-screen">
          <h1 className="mb-10 tracking-wide font-semibold">Help desk</h1>
          <ul className="text-sm tracking-wide flex flex-col gap-2 mt-8">
              {
              [
                  "❓Access to FAQs or help desk", 
                  "📬 Contact Admin/Manager for technical help", 
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

export { HelpDesk }