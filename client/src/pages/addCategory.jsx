import React, { useState } from "react";
import SideBar from "../components/sideBar";
import { Alert, Button, Card } from "flowbite-react";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

export default function AddCategory() {
    const [message, setMessage] = useState()
    const [form, setForm] = useState({
        name: '',
    })

    let { data: categori }= useQuery('categoriCache', async () => {
        const response = await API.get('/categories');
        return response.data.data;
    })

    const handleSave = useMutation(async (e) => {
        try {
            e.preventDefault();
            const response = await API.post('/category', form)
            const alert = (
                <Alert color='success' className="font-medium">
                    Success
                </Alert>
            )
            setMessage(alert)
            console.log(response);
        } catch(error) {
            const alert = (
                <Alert color='failure' className="font-medium">
                    Failed
                </Alert>
            )
            setMessage(alert)
            console.log(error)
        }
    })

    return(
        <>
            <div className="flex">
                <SideBar/>
                <div>
                    <form>
                        {message && message}
                        <h3 className="font-bold text-lg mb-5">ADD CATEGORY</h3>
                        <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-black">Name Category</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={(e) => setForm({
                                        ...form,
                                        [e.target.name]: e.target.value
                                    })}
                                    type="text"
                                    className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                                />
                            </div>
                            <Button onClick={(e) => handleSave.mutate} className="w-full">
                                Save
                            </Button>
                    </form>
                    <div className="mt-10 grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-col-1">
                        {categori?.map((item, index) => (
                            <Card key={index}>
                                <h3>{item.name}</h3>
                            </Card>
                        ))}
                    </div>                
                </div>
            </div>
        </>
    )
}