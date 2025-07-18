import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.is_admin ? "admin" : "agent";

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    race: '',
    bio: '',
    profile_image: null,
    department: '',
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

    for (let key in formData) {
      if (formData[key]) {
        body.append(key, formData[key]);
      }
    }


    const url =
      role === 'admin' ? 'http://127.0.0.1:8000/api/users/me/admin-profile/' : 'http://127.0.0.1:8000/api/users/me/profile/';

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (res.ok) {
      navigate(`/${role}/dashboard`);
    } else {
      alert('Profile update failed');
    }
  };

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate(`/${role}/login`);
    }
  }, []);

  return (
    <div className="bg-stone-200 flex flex-col justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-2xl lg:w-[60%] md:w-[70%] sm:w-[80%] w-full shadow-md flex flex-col gap-4 overflow-y-auto max-h-[35rem]"
      >
        <fieldset className="flex flex-col">
          <legend className="p-4 text-center tracking-wide text-xl flex flex-col items-center justify-center gap-2 text-blue-500 font-medium font-sans">
            <span
              aria-hidden={true}
              className="size-12 text-white bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl shadow-md shadow-blue-600/50 border-t border-blue-300"
            >
              <i className="fi fi-rr-user-pen size-full flex items-center justify-center pl-1"></i>
            </span>
            Setup Your Profile ({role})
          </legend>

          <label htmlFor="first-name" className="text-sm tracking-wide mt-5 mb-1">
            First Name:
          </label>
          <input
            name="first_name"
            type="text"
            id="first-name"
            placeholder="First Name"
            required
            onChange={handleChange}
            className="text-sm border rounded-2xl px-4 py-3"
          />

          <label htmlFor="last-name" className="text-sm tracking-wide mt-5 mb-1">
            Last Name:
          </label>
          <input
            type="text"
            name="last_name"
            id="last-name"
            placeholder="Last Name"
            required
            onChange={handleChange}
            className="text-sm border rounded-2xl px-4 py-3"
          />

          <label htmlFor="phone-number" className="text-sm tracking-wide mt-5 mb-1">
            Phone:
          </label>
          <input
            type="text"
            id="phone-number"
            name="phone_number"
            onChange={handleChange}
            className="text-sm border rounded-2xl px-4 py-3"
          />

          <label htmlFor="address" className="text-sm tracking-wide mt-5 mb-1">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
            className="text-sm border rounded-2xl px-4 py-3"
          />

          <label htmlFor="bio" className="text-sm tracking-wide mt-5 mb-1">
            Biography:
          </label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Short bio"
            onChange={handleChange}
            className="text-sm border rounded-2xl px-4 py-3 h-40"
          />

          <label htmlFor="profile_image" className="mt-5 mb-1">
            Profile Image:
          </label>
          <input
            type="file"
            id="profile_image"
            name="profile_image"
            onChange={handleChange}
            className="text-sm border rounded-2xl px-4 py-3"
          />

          <label htmlFor="race" className="mt-5 mb-1">
            Race:
          </label>
          <input
            id="race"
            type="text"
            name="race"
            onChange={handleChange}
            className="text-sm border rounded-2xl px-4 py-3"
          />

          <label htmlFor="department" className="mt-5 mb-1">
            Department:
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="text-sm border rounded-2xl px-4 py-3"
            required
          >
            <option value="">Select a department</option>
            <option value="Operations">Operations</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="HR">Human Resources</option>
            <option value="IT">IT</option>
          </select>
          

          <button
            type="submit"
            className="mt-5 p-3 bg-gradient-to-b text-white from-blue-500 to-blue-700 rounded-full tracking-wide font-medium shadow-md shadow-blue-700/30"
          >
            Save Profile
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Profile;
