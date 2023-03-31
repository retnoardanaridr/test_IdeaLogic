import React, { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import SideBar from "../components/sideBar";
import { Button } from "flowbite-react";

export default function Count() {
    let { data: product } = useQuery('productCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
    })

    let { data: category } = useQuery('categoryCache', async() => {
        const response = await API.get('/categories');
        return response.data.data;
    })

    let { data: price } = useQuery('priceCache', async() => {
        const response = await API.get('/varprices');
        return response.data.data;
    })


    return(
        <>
            <div className="flex">
                <SideBar/>
                <div>
                    <h3 className="text-xl font-bold">Form Group</h3>
                    <form>
                        <h1 className="text-white">m zdjndjcmzdkcmzdczczjx c zcasc  sdasdnkadas fza asdhansddnkjSDndvsfvsdsdn</h1>
                        <div>
                            <label htmlFor="category" className="block mt-2 mb-2 text-sm font-medium text-gray-900">Kategori Pekerjaan</label>
                            <select name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                {category?.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="category" className="block mt-2 mb-2 text-sm font-medium text-gray-900">Name Produk</label>
                            <select name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                {product?.map((item, index) => (
                                    <option key={index} value={item.id} className="w-full">{item.product_name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="jumlah" className="block mb-2 mt-2 text-sm font-medium text-black">Jumlah Pesanan</label>
                            <input
                                name="jumlah"
                                // value={form.password}
                                // onChange={handleChange}
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
                        </div>
                        <Button className="mt-4 w-full">
                            count
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}