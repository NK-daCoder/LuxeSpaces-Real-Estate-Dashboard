import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      phone_number: '',
      address: '',
      race: '',
      bio: '',
      profile_image: null,
    });

    const handleChange = (e) => {
      const { name, value, files } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const token = localStorage.getItem('access_token');
      const body = new FormData();

      for (const key in formData) {
        body.append(key, formData[key]);
      }

      const res = await fetch('http://127.0.0.1:8000/api/users/me/profile/', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      if (res.ok) {
        navigate('/agent/dashboard'); // or /admin/dashboard
      } else {
        alert('Profile update failed');
      }
    };

  return (
    <div className="bg-stone-200 flex flex-col justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl lg:w-[60%] md:w-[70%] sm:w-[80%] w-full shadow-md flex flex-col gap-4 overflow-y-auto max-h-[35rem]">
        <fieldset className="flex flex-col">
          <legend className="p-4 text-center tracking-wide text-xl flex flex-col items-center justify-center gap-2 text-blue-500 font-medium font-sans">
            <span aria-hidden={true} className='size-12 text-white bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl shadow-md shadow-blue-600/50 border-t border-blue-300'>
              <i className="fi fi-rr-user-pen size-full flex items-center justify-center pl-1" aria-hidden={true}></i>
            </span>
            Setup Your Profile
          </legend>

          <label htmlFor="first-name" className="text-sm tracking-wide mt-5 mb-1 flex gap-2">
            First Name:
          </label>
          <input name="first_name" type="text" id="first-name" placeholder="First Name" required onChange={handleChange} className="text-sm border rounded-2xl px-4 py-3"/>

          <label htmlFor="last-name" className="text-sm tracking-wide mt-5 mb-1 flex gap-2">
            Last name:
          </label>
          <input type="text" name="last_name" id="last-name" placeholder="Last Name" required onChange={handleChange} className="text-sm border rounded-2xl px-4 py-3"/>

          <label htmlFor="phone-number" className="text-sm tracking-wide mt-5 mb-1 flex gap-2">
            Tel:
          </label>
          <input type="text" id="phone-number" name="phone_number" onChange={handleChange} className="text-sm border rounded-2xl px-4 py-3"/>

          <label htmlFor="address" className="text-sm tracking-wide mt-5 mb-1 flex gap-2">
            Address:
          </label>
          <input type="text" id="address" name="address" onChange={handleChange} className="text-sm border rounded-2xl px-4 py-3"/>

          <label htmlFor="bio" className="text-sm tracking-wide mt-5 mb-1 flex gap-2">
            Biography:
          </label>
          <textarea id="bio" name='bio' placeholder="Bio" onChange={handleChange} className="text-sm border rounded-2xl px-4 py-3 h-40"/>

          <label htmlFor="image-uploader" className='mt-5 mb-1 flex gap-2'>
            Profile Image
          </label>
          <input type="file" id="image-upoader" name="profile_image" onChange={handleChange} className="text-sm border rounded-2xl px-4 py-3"/>
          <label htmlFor="race" className="">Race:</label>
          <input id="race" type="text" className="text-sm border rounded-2xl" name="race" onChange={handleChange}/>
          <button type="submit" className="mt-5 p-3 bg-gradient-to-b text-white from-blue-500 to-blue-700 rounded-full tracking-wide font-medium shadow-md shadow-blue-700/30">Save Profile</button>
        </fieldset>
      </form>
    </div>
  )
}

export default Profile