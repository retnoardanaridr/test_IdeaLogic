import React, { useState } from "react";
import { Alert, Button } from "flowbite-react";
import { useMutation } from 'react-query';
import { API } from "../../config/api";

import register from '../../assets/register.jpeg';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    })
    const [message, setMessage] = useState()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const response = await API.post('/register', form)
            const alert = (
                <Alert color='success' className='font-medium'>
                    Success
                </Alert>
            )
            setMessage(alert);
            console.log(response)
            navigate('/login');
        } catch (error) {
            const alert = (
                <Alert color='failure' className='font-medium'>
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
                        <img className="h-48" src={register} alt="" />
                    </div>
                    {message && message}
                    <form className="p-5">
                        <h3 className="font-bold text-center">Register</h3>
                        <h6 className="text-white">b ausdjkn a scassjackncnanckac kakscnnzxncizcn ozcxz</h6>
                        <div>
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-black">Fullname</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                type="text"
                                placeholder="Input fullname"
                                className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email</label>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Input email"
                                className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
                            <input
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                type="password"
                                placeholder="Input password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </div>
                        <div>
                            <label htmlFor="countries" className="block mt-2 mb-2 text-sm font-medium text-gray-900">Role</label>
                            <select name="role" onChange={handleChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option hidden>--Choose One--</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div>
                            <Button onClick={(e) => handleSubmit.mutate(e)} className="w-full mt-3" gradientDuoTone="purpleToBlue">Sign Up</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}