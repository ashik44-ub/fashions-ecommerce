import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Register = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // এটি রিডাইরেক্ট করতে সাহায্য করবে
    
    // react-hook-form সেটআপ
    const { register, handleSubmit, formState: { errors } } = useForm();

    // RTK Query Mutation সেটআপ
    const [registerUser, {isLoading}] = useRegisterUserMutation();


    const onSubmit = async (data) => {
        try {
            await registerUser(data).unwrap();
            alert("Registration Succesfull!")
            navigate("/login");
        } catch (error) {
            setMessage("Your Username and Email invalid!")
        }
    }

    return (
        <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Please Register
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register("username", { required: "Username is required" })}
                                    id="username"
                                    type="text"
                                    placeholder='Enter Your Username'
                                    className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
                                />
                                {errors.username && <p className='text-red-500 text-xs mt-1'>{errors.username.message}</p>}
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register("email", { required: "Email is required" })}
                                    id="email"
                                    type="email"
                                    placeholder='Enter Your Email'
                                    className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
                                />
                                {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register("password", { required: "Password is required" })}
                                    id="password"
                                    type="password"
                                    placeholder='Enter Your Password'
                                    className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
                                />
                                {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
                            </div>
                        </div>

                        {message && <p className='text-red-500 font-semibold text-sm'>{message}</p>}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none transition-colors disabled:bg-gray-400">
                                {isLoading ? "Registering..." : "Register"}
                            </button>
                            
                            <div className="text-sm py-4">
                                Already have an account? 
                                <Link to='/login' className="ml-1 font-medium text-red-600 underline hover:text-red-500">
                                    Login Here
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;