import React from 'react'

const Properties = () => {
  return (
    <React.Fragment>
      <section className="flex flex-col justify-center items-center h-screen">
        <h1 className="mb-10 tracking-wide font-semibold">Property Management</h1>
        <ul className="text-sm tracking-wide flex flex-col gap-2 mt-8">
          {
            [
              "✅ View all their listed properties", 
              "➕ Add a new property", 
              "🗑️ Delete their own properties", 
              "📊 See property status: available, sold, pending"
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

export { Properties }