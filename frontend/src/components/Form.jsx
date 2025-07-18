import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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

export  { AuthForm };
