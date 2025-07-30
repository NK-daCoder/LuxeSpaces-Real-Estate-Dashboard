import React, { useEffect, useState } from 'react'
import { backendUrl } from '../../constants/variables';
import { PropertyForm } from '../../components/Form';
import PropertyCard from '../../components/PropertyCard';

const Properties = () => {
  const [dataView, setDataView] = useState("table-view");
  const [menuOpen, setMenuOpen] = useState(false);
  const [properties, setProperties] = useState([]);

  // state for selecting elements in the table
  const [selectedProperty, setSelectedProperty] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


  const [formType, setFormType] = useState("")

  const [stats, setStats] = useState([
    { label: "Total Properties", value: 0, icon: "fi fi-rr-building" },
    { label: "Available Properties", value: 0, icon: "fi fi-rr-check" },
    { label: "Sold Properties", value: 0, icon: "fi fi-rr-sold-house" },
    { label: "Pending Properties", value: 0, icon: "fi fi-rr-hourglass" },
    { label: "Rented Properties", value: 0, icon: "fi fi-rr-rent" }
  ]);

  const getToken = localStorage.getItem("access_token");

  const fetchProperties = async () => {

      if(!getToken) {
        alert("You are not logged in. Please log in to view properties.");
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/api/agent/properties/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();
        // console.log(data);
        setProperties(data);
        setSelectedProperty([])
        return data;
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
  }

  const handleDeleteSelected = async () => {
    if (selectedProperty.length === 0) {
      alert("No properties selected.");
      return;
    }

    if (!confirm("Are you sure you want to delete the selected properties?")) return;

    try {
      const deletePromises = selectedProperty.map(async (id) => {
        const propertyExists = properties.find((prop) => prop.id === id);
        if (!propertyExists) return;

        const response = await fetch(`${backendUrl}/api/agent/properties/${id}/`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${getToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to delete property ${id}: ${response.status}`);
        }

        return id;
      });

      const deletedIds = await Promise.all(deletePromises);
      console.log("Successfully deleted:", deletedIds.filter(Boolean));

      setSelectedProperty([]);     // <-- Clear selection
      setSelectAll(false);         // <-- Reset "select all" checkbox
      await fetchProperties();     // Refresh list
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("Deletion failed. Check console for details.");
    }
  };

  console.log("Selected properties for deletion:", selectedProperty);

  const handlePropertySelect = (id) => {
    setSelectedProperty(prev => prev.includes(id) ? prev.filter(propertyId => propertyId !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProperty([]);
    } else {
      const allIds = properties.map(p => p.id);
      setSelectedProperty(allIds);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    const init = async () => {
      const properties = await fetchProperties();
      if (!properties) return;

      const Available = properties.filter(property => property.status === "available").length;
      const Sold = properties.filter(property => property.status === "sold").length;
      const Pending = properties.filter(property => property.status === "pending").length;
      const Rented = properties.filter(property => property.status === "rented").length;
      const Total = properties.length;

      setStats([
        { label: "Total Properties", value: Total, icon: "fi fi-rr-building" },
        { label: "Available Properties", value: Available, icon: "fi fi-rr-check" },
        { label: "Sold Properties", value: Sold, icon: "fi fi-rr-sold-house" },
        { label: "Pending Properties", value: Pending, icon: "fi fi-rr-hourglass" },
        { label: "Rented Properties", value: Rented, icon: "fi fi-rr-rent" },
      ]);
    };

    init();
  }, []);


  return (
    <React.Fragment>
      {/* --- Stats Section --- */}
      <section className={`w-full pt-5`}>
        <h2 className="text-md mb-6 tracking-wide text-blue-500 flex gap-2 items-center">
          <i className="fi fi-rr-flooding bg-gradient-to-b text-white to-blue-500 from-blue-300 shadow-md shadow-blue-300 p-3 size-8 flex items-center justify-center rounded-lg"></i>
          Property Stats
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <li key={`stat-${index}`} className="hover:border-blue-500 border-l flex items-center gap-3 p-4 bg-white rounded-md shadow-md hover:shadow-stone-300 transform hover:scale-105 transition">
              <i className={`${stat.icon} text-blue-500 text-xl`}></i>
              <div>
                <p className="text-sm text-gray-700 tracking-wide">{stat.label}</p>
                <span className="text-gray-500 text-md font-semibold">{stat.value}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* --- View Switcher --- */}
      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-md mt-10 mb-6 tracking-wide text-blue-500 flex gap-2 items-center">
            <i className="fi fi-rr-building bg-gradient-to-b text-white to-blue-500 from-blue-300 shadow-md shadow-blue-300 p-3 size-8 flex items-center justify-center rounded-lg"></i>
            Properties
          </h2>
          <ul className="flex items-center gap-4">
            {[
              { label: "Table View", icon: "fi fi-rr-table" },
              { label: "Card View", icon: "fi fi-rr-cards-blank" }
            ].map((item, index) => (
              <li key={index}>
                <button
                  className={`${dataView === (item.label === "Table View" ? "table-view" : "card-view") ? "border-b-2 border-blue-500 text-blue-500" : "text-stone-400"} flex items-center gap-2`}
                  onClick={() => setDataView(item.label === "Table View" ? "table-view" : "card-view")}
                >
                  <i className={`${item.icon} size-6`}></i>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Card View Placeholder --- */}
        {dataView === "card-view" ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {
            /*
              properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  title={property.title}
                  description={property.description}
                  image={property.image}
                  bedroom={property.beds}
                  bathroom={property.baths}
                  price={`$${parseFloat(property.price).toLocaleString()}`}
                />
              ))*/
             (<p>Under development</p>)
            }
          </section>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-blue-200 hover:shadow-lg hover:shadow-blue-200">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-b from-blue-400 to-blue-500 text-white">
                  {/* the checkbox below sellects every property in the table */}
                  <th className="p-3 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {
                    ["Title", "Property Type", "Location", "Price", "Status", "Category", "Bedrooms", "Bathrooms", "Size"].map((heading) => (
                      <th key={heading} className="px-3 text-left text-base tracking-wide font-sans font-normal">{heading}</th>
                    ))
                  }
                  
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-blue-100 odd:bg-white even:bg-blue-100">
                    {/* this checkbox select a single property */}
                    <td className="border-b border-blue-200 p-3 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedProperty.includes(property.id)}
                        onChange={() => handlePropertySelect(property.id)}
                      />
                    </td>
                    <td className="border-b border-blue-200 p-3 text-sm tracking-wide">{property.title}</td>
                    <td className="border-b border-blue-200 p-3 text-sm tracking-wide">{property.property_type}</td>
                    <td className="border-b border-blue-200 p-3 text-sm tracking-wide">{property.location}</td>
                    <td className="border-b border-blue-200 p-3 text-sm tracking-wide w-20">R {parseFloat(property.price).toLocaleString()}</td>
                    <td className={`border-b border-blue-200 p-3 text-sm capitalize tracking-wide text-center`}>
                      <span className={`border-t shadow-md border-blue-300 p-2 rounded-full flex items-center justify-center bg-gradient-to-b ${property.status === "available" ? "from-green-300 to-green-500 border-green-500 shadow-green-300" : property.status === "pending" ? "from-orange-300 to-orange-500 border-orange-500  shadow-orange-300" : "from-red-300 to-red-500 border-red-500 shadow-red-300"} text-white `}>
                        {property.status}
                      </span>
                    </td>
                    <td className="border-b border-blue-200 p-3 text-sm tracking-wide">For {property.category}</td>
                    <td className="border-b border-blue-200 p-3 text-sm tracking-wide">{property.beds}</td>
                    <td className="border-b border-blue-200 p-3 text-sm tracking-wide">{property.baths}</td>
                    <td className="border-b border-blue-200 p-3 text-sm tracking-wide">{property.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- Floating Action Menu --- */}
        <section className="fixed bottom-5 right-5">
          <button
            className="bg-gradient-to-b to-blue-500 from-blue-300 rounded-full shadow-md shadow-blue-500 p-3 size-12 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fi fi-rr-settings text-white text-2xl animate-spin flex items-center justify-center"></i>
          </button>

          <div className={`fixed bottom-16 right-14 z-20 transition-transform ${menuOpen ? "scale-100" : "scale-0"}`}>
            <ul className="p-4 w-[15rem] bg-white rounded-3xl shadow-lg shadow-blue-200 flex flex-col gap-2 border-t border-l border-blue-200">
              {[
                { id:"add-property", label: "Add Property", icon: "fi fi-rr-plus" },
                { id:"edit-property", label: "Edit Property", icon: "fi fi-rr-edit" },
                { id:"property-details", label: "Details", icon: "fi fi-rr-eye" },
              ].map((action, index) => (
                <li key={`actions-${index}`}>
                  <button 
                    onClick={() => setFormType(action.id)}
                    className="w-full text-sm flex items-center gap-2 px-4 py-2 rounded-full hover:text-white hover:bg-blue-500"
                  >
                    <i className={`${action.icon} flex items-center justify-center`}></i> {action.label}
                  </button>
                </li>
              ))}
              <li>
                {/* Deleting a single selected property from the table*/}
                <button 
                    onClick={handleDeleteSelected}
                    className="w-full text-sm flex items-center gap-2 px-4 py-2 rounded-full hover:text-white hover:bg-blue-500"
                  >
                    <i className={`fi fi-rr-trash flex items-center justify-center`}></i>
                    Delete Property
                  </button>
              </li>
            </ul>
          </div>
        </section>
      </section>

      <PropertyForm 
        currentAction={formType} 
        setCurrentAction={setFormType}
        selectedProperty={selectedProperty}
        propertiesList={properties}
      />

    </React.Fragment>
  );
};

export { Properties };
