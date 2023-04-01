import React, { useState } from "react";
import { Alert, Button, Checkbox, Label, Card } from "flowbite-react";
import SideBar from "../components/sideBar";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

export default function AddProduct() {
    const [message, setMessage] = useState()
    let { data: categories } = useQuery('categoCache', async () => {
        let response = await API.get('/categories');
        return response.data.data;
    })
    let { data: produks } = useQuery('produkCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
    })

    const [form, setForm] = useState({
        name: '',
        idCategory: [],
    })
    console.log(form);

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            const response = await API.post('/product', form)
            const alert = (
                <Alert color='success' className="font-medium">
                    Success
                </Alert>
            )
            setMessage(alert)
            console.log(response)
        } catch (error) {
            const alert = (
                <Alert color='failure' className="font-medium">
                    Failed
                </Alert>
            )
            setMessage(alert)
            console.log(error);
        }
    })

    return (
        <>
            <div className="flex">
                <SideBar />
                <div>
                    <form>
                        <h3 className="font-bold text-lg mb-5">ADD PRODUCT</h3>
                        {message && message}
                        <div>
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-black">Name Product</label>
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
                        <label htmlFor="" className="block mb-2 text-sm font-medium text-black">Categories</label>
                        <div className="flex items-center gap-2">
                            {categories?.map((item, index) => (
                                <>
                                    <Label htmlFor="category" key={index}>
                                        {item.name}
                                    </Label>
                                    <Checkbox
                                        id="category"
                                        name={item.name}
                                        value={item.id}
                                        onChange={(e) => setForm({
                                            ...form,
                                            [e.target.name]: e.target.value
                                        })}
                                    />
                                </>
                            ))}
                        </div>
                        <Button onClick={(e) => handleSubmit.mutate(e)} className="w-full mt-5">
                            Save
                        </Button>
                    </form>
                    <div className="mt-10 grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-col-1">
                        {produks?.map((item, index) => (
                            <Card key={index}>
                                <h3>{item.product_name}</h3>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}