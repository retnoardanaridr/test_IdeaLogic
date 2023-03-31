import { Card } from "flowbite-react";
import React from "react";
import SideBar from "../components/sideBar";
import { API } from "../config/api";
import { useQuery } from "react-query";

export default function Products() {
    let { data: products }= useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
    })

    return (
        <>
            <div className="flex">
                <SideBar/>
                <div>
                    <h3 className="font-medium text-xl mb-3">View Product</h3>
                    <div className="grid lg:grid-cols-4 gap-4 sm:grid-col-1">
                        {products?.map((item, index) => (
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