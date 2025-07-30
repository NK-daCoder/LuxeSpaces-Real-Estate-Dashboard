import React, { useState } from 'react'

const PropertyCard = ({title, description, image, bedroom, bathroom, price}) => {
    const [actionsMenuIsOpen, setActionsMenuIsOpen] = useState(false);

  return (
    <article className="bg-white border rounded-lg shadow-md p-4 relative flex flex-col md:flex-row w-full gap-3 md:justify-center md:items-center">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-lg mb-4 bg-stone-500" />
        <section className="flex flex-col gap-2 w-full">
            <h2 className="text-sm tracking-wide">{title}</h2>
            <p className="text-xs tracking-wide text-stone-500">{description}</p>
            <div className="flex items-center mt-2 gap-3">
                <p aria-label="total bedrooms" className="flex justify-center items-center">
                    <i className="fi fi-rr-bed flex items-center justify-center"></i>
                    <span className="ml-1 text-sm">{bedroom}</span>
                </p>
                <p aria-label="total bedrooms" className="flex justify-center items-center">
                    <i className="fi fi-rr-toilet flex items-center justify-center"></i>
                    <span className="ml-1 text-sm">{bathroom}</span>
                </p>
            </div>
            <p className="text-lg font-semibold text-blue-500 mt-2">{price}</p>
            <div aria-label="actions">
                <button 
                    className="absolute top-3 right-3"
                    onClick={() => setActionsMenuIsOpen(!actionsMenuIsOpen)}
                >
                    {
                        actionsMenuIsOpen ? (<i className="fi fi-rr-cross"></i>) : (<i className="fi fi-rr-menu-dots-vertical"></i>)
                    }
                </button>
                <div className={`absolute bg-white shadow-md rounded-lg top-5 right-7 flex flex-col p-2 w-36 border transform transition-transform ${actionsMenuIsOpen ? "scale-100" : "scale-0"}`} aria-hidden={actionsMenuIsOpen ? false : true}>
                    <button className="text-sm w-full text-left flex justify-start items-center gap-2 py-2 px-3 border rounded-full">
                        <i className="fi fi-rr-edit flex items-center justify-center"></i>
                        Edit
                    </button>
                    <button className="text-sm w-full text-left flex justify-start items-center gap-2 py-2 px-3 border rounded-full">
                        <i className="fi fi-rr-trash flex items-center justify-center"></i>
                        Delete
                    </button>
                    <button className="text-sm w-full text-left flex justify-start items-center gap-2 py-2 px-3 border rounded-full">
                        <i className="fi fi-rr-eye flex items-center justify-center"></i>
                        View
                    </button>
                </div>
            </div>
        </section>
    </article>
  )
}

export default PropertyCard