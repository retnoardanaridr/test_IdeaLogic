import React, { useContext, useState } from "react";
import { useMutation } from 'react-query';
import { Alert, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { API } from '../../config/api';
import { UserContext } from '../../context/userContext';

import login from "../../assets/login.png";

export default function Login() {
    const navigate = useNavigate()
    const [message, setMessage] = useState();
    const [, dispacth] = useContext(UserContext);
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const handleLogin = useMutation(async (e) => {
        try {
            e.preventDefault();
            const response = await API.post('/login', form)
            const alert = (
                <Alert color='success' className='font-medium'>
                    Success
                </Alert>
            )
            setMessage(alert);
            dispacth({
                type: 'LOGIN_SUCCESS',
                payload: response.data.data
            })
            navigate('/');
        } catch(error) {
            const alert = (
                <Alert color='failure' className='font-medium lg:font-medium'>
                    Failed
                </Alert>
            )
            setMessage(alert)
            console.log(error);
        }
    })


    return (
        <>
            <div className="max-w-md mx-auto rounded-xl py-5 overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="md:shrink-0 flex items-center justify-center">
                        <img className="h-48" src={login} alt="" />
                    </div>
                    {message && message}
                    <form className="p-5">
                        <h3 className="font-bold text-center">Login</h3>
                        <h6 className="text-white">b ausdjkn a scassjackncnanckac kakscnnzxncizcn ozcxz</h6>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email</label>
                            <input 
                            name='email' 
                            value={form.email}
                            onChange={(e) => setForm({
                                ...form,
                                [e.target.name] : e.target.value
                            })}
                            type="email" placeholder="Input email" className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
                            <input 
                            name="password" 
                            value={form.password} 
                            onChange={(e) => setForm({
                                ...form,
                                [e.target.name] : e.target.value
                            })} 
                            type="password" placeholder="Input password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </div>
                        <div>
                            <Button onClick={(e) => handleLogin.mutate(e)} className="w-full mt-3" gradientDuoTone="purpleToBlue">Sign In</Button>
                        </div>
                        <div className="text-center mt-2">
                            <span>Not register yet?{" "}</span>
                            <Link className="underline text-blue-500 font-bold" to={'/register'}>Click Here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}