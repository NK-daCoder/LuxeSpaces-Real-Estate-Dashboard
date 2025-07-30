import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../constants/variables';


const AuthForm = ({ type, role }) => {
  const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      password2: '',
      first_name: '',
      last_name: '',
  });

  const navigate = useNavigate();
  const [openPassword, setOpenPassword] = useState(false);

  const isLogin = type === 'login';
  const isAgent = type === 'register-agent';
  const isAdmin = type === 'register-admin';

  const leadingRole = role === 'agent' ? 'Agent' : 'Admin';

  const endpointMap = {
    'login': '/api/users/login/',
    'register-agent': '/api/users/register/agent/',
    'register-admin': '/api/users/register/admin/',
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `http://127.0.0.1:8000${endpointMap[type]}`;

    const payload = isLogin
      ? { username: formData.username, password: formData.password }
      : formData;

    console.log('Sending payload:', payload);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to authenticate');

      const data = await res.json();
      console.log(data)

      // If login, handle tokens and redirect
      if (isLogin) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));

        const user = data.user;
        const department = user.department;

        if (user.is_agent && !user.is_profile_complete) {
          navigate('/complete-profile');
        } else if (user.is_agent) {
          switch (department) {
            case 'Sales':
              navigate('/agent/sales-dashboard');
              break;
            case 'Marketing':
              navigate('/agent/marketing-dashboard');
              break;
            case 'IT':
              navigate('/agent/it-dashboard');
              break;
            // etc.
            default:
              navigate('/agent/general-dashboard');
          }
        }
      } else {
        navigate(`/${role}/login`);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='bg-stone-200 p-4 min-h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-2xl border-t border-stone-200 shadow-md flex flex-col gap-4 xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-full'>
        <fieldset className="flex flex-col">
          <legend className="text-2xl mb-4 flex items-center gap-2 tracking-wide text-blue-500 font-medium font-sans">
            <span className="size-12 bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-2xl shadow-md shadow-blue-600/50 border-t border-blue-300">
              <i className="fi fi-rr-user-pen size-full flex items-center justify-center pl-1" aria-hidden={true}></i>
            </span>
            <div>
              {isLogin ? `Welcome ${leadingRole}` : `Register As ${leadingRole}`}
              {isLogin ? (<span className='text-sm text-stone-400 block'>Login to your dashboard and get ready to work...</span>) : <></>}
            </div>
          </legend>
          {
            (isLogin || isAgent || isAdmin) && (
              <React.Fragment>
                <label htmlFor="username" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                  <i className="fi fi-rr-user flex items-center justify-center" aria-label={true}></i>
                  { !isLogin ? "Custom Username" : "Username" }
                </label>
                <input type="text" id="username" name="username" placeholder="Username" required onChange={handleChange} className="text-sm border rounded-2xl px-3 py-2"/>
              </React.Fragment>
            )
          }
          
          {
            !isLogin && (
              <React.Fragment>
                <label htmlFor="email" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                  <i className="fi fi-rr-user-pen flex items-center justify-center" aria-label={true}></i>
                  First Name
                </label>
                <input type="text" id="first-name" name="first_name" placeholder="First Name" required onChange={handleChange} className="text-sm border rounded-2xl px-3 py-2"/>

                <label htmlFor="last-name" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                  <i className="fi fi-rr-user-pen flex items-center justify-center" aria-label={true}></i>
                  Last Name
                </label>
                <input type="text" id="last-name" name="last_name" placeholder="Last Name" required onChange={handleChange} className="text-sm border rounded-2xl px-3 py-2"/>
              </React.Fragment>
            )
          }
          
          {!isLogin && (
            <React.Fragment>
            <label htmlFor="email" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
              <i className="fi fi-rr-envelope flex items-center justify-center" aria-label={true}></i>
              Email
            </label>
            <input type="email" id="email" name="email" placeholder="Email" required onChange={handleChange} className="text-sm border rounded-2xl px-3 py-2"/>
            </React.Fragment>
          )}
          <label htmlFor="password" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
            <i className="fi fi-rr-lock flex items-center justify-center" aria-label={true}></i>
            Password
          </label>
          <div className='relative'>
            <input type="password" id="password" name="password" placeholder="Password" required onChange={handleChange} className="text-sm border rounded-2xl px-3 py-2 w-full"/>
            <button type="button" onClick={() => setOpenPassword(!openPassword)} aria-label="Show Password" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <i className={`fi ${openPassword ? "fi-rr-eye" : "fi-rr-eye-crossed"}  size-4 text-stone-500 hover:text-blue-500 transition-all duration-200 flex items-center`}></i>
            </button>
          </div>
          {!isLogin && (
            <React.Fragment>
              <label htmlFor="password2" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                <i className={`fi fi-rr-lock`} aria-label={true}></i>
                Retype Password
              </label>
              <div className='relative'>
                <input type="password" id="password2" name="password2" placeholder="Confirm Password" required onChange={handleChange} className="text-sm border rounded-2xl px-3 py-2 w-full"/>
                <button type="button" onClick={() => setOpenPassword(!openPassword)} aria-label="Show Password" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <i className={`fi ${openPassword ? "fi-rr-eye" : "fi-rr-eye-crossed"} size-4 text-stone-500 hover:text-blue-500 transition-all duration-200 flex items-center`}></i>
                </button>
              </div>
            </React.Fragment>
          )}
        </fieldset>
        

        <button type="submit" className="border-t-2 border-blue-400 bg-gradient-to-b from-blue-500 to-blue-600 py-3 rounded-full text-white font-medium tracking-wide shadow-lg shadow-blue-500 mt-5 transition-transform hover:scale-[1.01] ">{isLogin ? 'Continue' : 'Register'}</button>
      </form>
    </div>
  );
};


const PropertyForm = ({ currentAction, setCurrentAction, selectedProperty, propertiesList }) => {

  const getToken = localStorage.getItem("access_token");

  useEffect(() => {
        if (currentAction === 'edit-property' && selectedProperty.length === 1) {
          const propertyToEdit = selectedProperty[0];
          const prop = propertiesList.find(p => p.id === propertyToEdit);
  
          if (prop) {
            setTimeout(() => {
              const form = document.querySelector("#property-form");
              if (!form) return;
  
              form.title.value = prop.title;
              form.property_type.value = prop.property_type;
              form.location.value = prop.location;
              form.category.value = prop.category;
              form.beds.value = prop.beds;
              form.baths.value = prop.baths;
              form.price.value = prop.price;
              form.description.value = prop.description;
              form.status.value = prop.status;
              form.size.value = prop.size;
            }, 100); // Delay to ensure DOM is ready
          }
        }
  }, [currentAction, selectedProperty]);

  const handelAddProperty = async (e) => {
    e.preventDefault()
    const formEvent = e.target;

    const formData = new FormData()

    formData.append("title", formEvent.title.value);
    formData.append("property_type", formEvent.property_type.value);
    formData.append("location", formEvent.location.value);
    formData.append("category", formEvent.category.value);
    formData.append("beds", formEvent.beds.value);
    formData.append("baths", formEvent.baths.value);
    formData.append("price", formEvent.price.value);
    formData.append("description", formEvent.description.value);
    formData.append("status", formEvent.status.value);

    // images (uploaded_images[])
    const files = formEvent.images.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("uploaded_images", files[i]);
    }

    try {
      const response = await fetch(`${backendUrl}/api/agent/properties/create/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${getToken}`
          
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating property:", errorData);
        alert("Failed to create property.");
        return;
      }

      const newProperty = await response.json();
      console.log("Created Property:", newProperty);

      // optional TODO: show success message
      alert("New property added to the datasheet")

      formEvent.reset();
      setCurrentAction(""); // close the modal
      
    } catch (error) {
      console.error("Network or server error:", error);
      alert("An error occurred while creating the property.");
    }
  }

  const handelUpdateProperty = async (e) => {
    e.preventDefault();

    const property = selectedProperty[0]; // Assuming you're editing one at a time
    if (!property) return alert("No property selected for editing.");

    const formEvent = e.target;

    const formData = new FormData();
    formData.append("title", formEvent.title.value);
    formData.append("property_type", formEvent.property_type.value);
    formData.append("location", formEvent.location.value);
    formData.append("category", formEvent.category.value);
    formData.append("beds", formEvent.beds.value);
    formData.append("baths", formEvent.baths.value);
    formData.append("price", formEvent.price.value);
    formData.append("description", formEvent.description.value);
    formData.append("status", formEvent.status.value);
    formData.append("size", formEvent.size.value);

    const files = formEvent.images.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("uploaded_images", files[i]);
    }

    try {
      const response = await fetch(`${backendUrl}/api/agent/properties/${property}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating property:", errorData);
        alert("Failed to update property.");
        return;
      }

      const updatedProperty = await response.json();
      console.log("Updated Property:", updatedProperty);

      alert("Property updated successfully.");
      setCurrentAction("");
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating the property.");
    }
  };


  const handlePropertyDetail = (e) => {
    alert("clicked the read more button");
    return;
  }

  const formTypes = () => {
    switch (currentAction) {
      case 'add-property':
        return 'Create A Property';
      case 'edit-property':
        return 'Edit Property';
      case 'property-details':
        return 'Property Details';
      default:
        return ""
    }
  }
  
  return (
    <div className={`${currentAction === "" ? "hidden" : "block"} filter backdrop-blur-sm fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center`}>
      <form id="property-form" 
      onSubmit={
        currentAction === "add-property" 
          ? handelAddProperty 
          : currentAction === "edit-property" 
            ? handelUpdateProperty 
            : null
      }
      className='bg-white overflow-y-auto h-[30rem] p-6 border-t border-stone-200 shadow-md flex flex-col gap-4 rounded-2xl xl:w-[58%] lg:w-[68%] md:w-[78%] sm:w-[88%] w-full'>
        <fieldset>
          <legend className='flex justify-between w-full'>
            <h2 className="text-2xl mb-4 flex items-center gap-2 tracking-wide text-blue-500 font-medium font-sans">
              <span className="size-12 bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-2xl shadow-md shadow-blue-600/50 border-t border-blue-300 max-h-80 overflow-y-auto">
                <i className="fi fi-rr-building size-full flex items-center justify-center pl-1" aria-hidden={true}></i>
              </span>
              {formTypes()}
            </h2>
            <button
              type="button"
              onClick={() => setCurrentAction("")}
              aria-label='cancle form button'
              className='bg-gradient-to-b from-red-500 to-red-600 hover:scale-105 active:scale-95 transform rounded-2xl p-2 shadow-md shadow-red-500/50 hover:shadow-red-600/50 transition-all duration-200 flex items-center justify-center size-12'
            >
              <i className="fi fi-rr-cross text-white transition-all duration-200 flex items-center justify-center" aria-hidden={true}></i>
            </button>
          </legend>

          <section>
            {
              currentAction === 'add-property' || currentAction === 'edit-property' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>

                    <div>
                      <label htmlFor="title" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                        <i className="fi fi-rr-building flex items-center justify-center" aria-label={true}></i>
                        Property Title
                      </label>
                      <input type="text" id="title" name="title" placeholder="Property Title" required className="text-sm border rounded-2xl px-3 py-2 w-full"/>
                    </div>

                    <div>
                      <label htmlFor="property_type" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                        <i className="fi fi-rr-home flex items-center justify-center" aria-label={true}></i>
                        Property Type
                      </label>
                      <input type="text" id="property_type" name="property_type" placeholder="Property Type (e.g., Apartment, House)" required className="text-sm border rounded-2xl px-3 py-2 w-full"/>
                    </div>

                    <div>
                      <label htmlFor="location" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                        <i className="fi fi-rr-map flex items-center justify-center" aria-label={true}></i>
                        Location
                      </label>
                      <input type="text" id="location" name="location" placeholder="Property Location" required className="text-sm border rounded-2xl px-3 py-2 w-full"/>
                    </div>

                    <div>
                      <label htmlFor="price" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                        <i className="fi fi-rr-money flex items-center justify-center" aria-label={true}></i>
                        Price
                      </label>
                      <input type="number" id="price" name="price" placeholder="Property Price" required className="text-sm border rounded-2xl px-3 py-2 w-full"/>
                    </div>

                    <div>
                      <label htmlFor="bedrooms" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                        <i className="fi fi-rr-bed flex items-center justify-center" aria-label={true}></i>
                        Total Bedrooms
                      </label>
                      <input type="number" id="bedrooms" name="beds" placeholder="0" required className="text-sm border rounded-2xl px-3 py-2 w-full"/>
                    </div>

                    <div>
                      <label htmlFor="bethrooms" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                        <i className="fi fi-rr-bath flex items-center justify-center" aria-label={true}></i>
                        Total Bathrooms
                      </label>
                      <input type="number" id="bethrooms" name="baths" placeholder="0" required className="text-sm border rounded-2xl px-3 py-2 w-full"/>
                    </div>

                    <div>
                      <label htmlFor="area" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                        <i className="fi fi-rr-land-layers flex items-center justify-center" aria-label={true}></i>
                        Total Area (square feet)
                      </label>
                      <input type="number" id="area" name="size" placeholder="0" required className="text-sm border rounded-2xl px-3 py-2 w-full"/>
                    </div>
                  </div>

                  <div>
                      <div>
                        <label htmlFor="description" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                          <i className="fi fi-rr-info flex items-center justify-center" aria-label={true}></i>
                          Description
                        </label>
                        <textarea id="description" name="description" placeholder="Property Description" required className="text-sm border rounded-2xl px-3 py-2 w-full h-32"></textarea>
                      </div>
                      <div>
                        <label htmlFor="images" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                          <i className="fi fi-rr-add-image flex items-center justify-center" aria-label={true}></i>
                          Upload Images
                        </label>
                        <input type="file" id="images" name="images" multiple accept="image/*" className="text-sm border rounded-2xl px-3 py-2 w-full"/>
                        <div aria-label="images uploaded"></div>
                      </div>
                      <div>
                        <label htmlFor="category" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                          <i className="fi fi-rr-category flex items-center justify-center" aria-label={true}></i>
                          Category
                        </label>
                        <select id="category" name="category" required className="text-sm border rounded-2xl px-3 py-2 w-full">
                          <option value="rent">For Rent</option>
                          <option value="sale">For Sale</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="status" className="text-sm tracking-wide mt-5 mb-2 text-stone-600 flex items-center gap-2">
                          <i className="fi fi-rr-check-circle flex items-center justify-center" aria-label={true}></i>
                          Status
                        </label>
                        <select id="status" name="status" required className="text-sm border rounded-2xl px-3 py-2 w-full">
                          {
                            currentAction === "add-property" ? (
                              <>
                                <option value="available">Available</option>
                              </>
                            ) : (
                              <>
                                <option value="available">Available</option>
                                <option value="sold">Sold</option>
                                <option value="pending">Dealing</option>
                              </>
                            )
                          }
                          
                          
                        </select>
                      </div>
                  </div>

                  <button 
                    type="submit" 
                    className="col-span-full border-t-2 border-blue-400 bg-gradient-to-b from-blue-500 to-blue-600 py-3 rounded-full text-white font-medium tracking-wide shadow-lg shadow-blue-500 mt-5 transition-transform hover:scale-[1.01]"
                  >
                    <i className="fi fi-rr-plus size-4 mr-2"></i>
                    {currentAction === 'add-property' ? 'Add Property' : 'Update Property'}
                  </button>
                </div>
              ) : (
                <div className='text-center text-stone-500'>
                  <p className='text-sm'>This is a placeholder for property details.</p>
                </div>
              )
            }
          </section>
          
        </fieldset>
      </form>
    </div>
  )
}

export  { AuthForm, PropertyForm };
