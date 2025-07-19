import React from 'react'

const Settings = () => {
  return (
    <React.Fragment>
      <section className="flex flex-col justify-center items-center h-screen">
        <h1 className="mb-10 tracking-wide font-semibold">Profile & Account Settings</h1>
        <ul className="text-sm tracking-wide flex flex-col gap-2 mt-8">
          {
            [
              "🧍 Edit personal info (bio, profile picture, phone number, etc.)", 
              "🧭 View assigned department (like Cape Town, Durban, etc.)", 
              "🔒 Change password or update security info", 
              "🧾 Upload or view license documents"
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

export { Settings }