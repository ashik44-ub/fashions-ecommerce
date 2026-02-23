import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import { useForm } from 'react-hook-form'
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/auth/authSlice';

const Loginpage = () => {
    const [message, setMessage] = useState('');
    
    // ADD THIS LINE BELOW:
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors },} = useForm();

        // jokhon mutation use korbo tokhon [], r jokhon query likhbo tokhon {} use korbo
    const [loginUser, {isLoading, error}] = useLoginUserMutation();


    const onSubmit = async (data) =>{
       try {
        const response = await loginUser(data).unwrap();
        const {token, user} = response;
        alert("Login Successful");
        dispatch(setUser({user}))
        // This will now work
        navigate('/'); 
       } catch (error) {
        setMessage("Please Provide a Valid Email and Password!");
        console.error({"login Failed": error});
       }
    }
    

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Login in to your account
            </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                {...register("email", { required: true })}
                                id="email"
                                type="email"
                                placeholder='Enter Your Email'
                                className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                            />
                            {errors.email && <p className='text-red-500 text-sm mt-1'>Email is Required</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                {...register("password", { required: true })}
                                id="password"
                                type="password"
                                placeholder='Enter Your Password'
                                className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                            />
                            {/* Fixed typo here: changed errors.email to errors.password */}
                            {errors.password && <p className='text-red-500 text-sm mt-1'>Password is Required</p>}
                        </div>
                    </div>

                    {message && <p className='text-red-500 text-sm'>{message}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none disabled:bg-gray-400 transition-colors">
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                        
                        <div className="text-sm py-4">
                            Don't have an account? 
                            <Link to={'/register'} className="ml-1 font-medium text-red-600 underline hover:text-red-500">
                                Register Here
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Loginpage;