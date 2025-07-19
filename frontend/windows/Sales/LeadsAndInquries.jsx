import React from 'react'

const LeadsAndInquries = () => {
  return (
    <React.Fragment>
      <section className="flex flex-col justify-center items-center h-screen">
        <h1 className="mb-10 tracking-wide font-semibold">Leads and Inquiries</h1>
        <ul className="text-sm tracking-wide flex flex-col gap-2 mt-8">
          {
            [
              "📞 Contact or follow up with interested users", 
              "📥 View messages or inquiries from potential buyers/renters and total inquiries received", 
              "🧠 (Optional) Lead scoring or notes on inquiries"
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

export { LeadsAndInquries }