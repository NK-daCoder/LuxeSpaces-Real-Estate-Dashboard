import React from 'react'

const Notification = () => {
  return (
    <React.Fragment>
        <section className="flex flex-col justify-center items-center h-full">
        <h1 className="mb-10 tracking-wide font-semibold">Profile & Account Settings</h1>
        <ul className="text-sm tracking-wide flex flex-col gap-2 mt-8">
            {
            [
                "🔔 New messages, property status updates, admin alerts", 
                "📢 News or announcements from management", 
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

export default Notification