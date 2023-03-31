import React from "react";
import SideBar from "../components/sideBar";
import { Card } from "flowbite-react";

import dash from '../assets/banner.png'

export default function Dashboard() {
    return(
        <>
        <div className="flex">
            <SideBar/>
            <div className="">
                <Card>
                    <img src={dash} alt="" />
                </Card>
            </div>
        </div>
        </>
    )
}