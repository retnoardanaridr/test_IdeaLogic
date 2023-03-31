import { Card } from "flowbite-react";
import React from "react";

import home from '../assets/home.png';
import icon from '../assets/banner.png';

export default function LandingPage() {
    return(
        <>
            <Card className="rounded-none shadow-none bg-gradient-to-tr from-purple-500 to-blue-500">
                <div className="md:flex items-center justify-center md:justify-center p-3 md:p-5">
                    <div className="text-sm text-center md:text-left md:text-xl font-mono font-medium px-5 "> 
                        <h3>Welcome to this pages</h3>
                        <h3>Great service and professional support</h3>
                    </div>
                    <div className="flex justify-center items-center">
                        <img src={home} alt="" />
                    </div>
                </div>
            </Card>
            <Card>
                <div className="md:flex items-center justify-center md:justify-center p-3 md:p-5">
                    <div>
                        <img src={icon} alt="" />
                    </div>
                    <div className="ml-5">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque, reiciendis dignissimos in totam distinctio enim voluptatem. Dolorum ducimus enim repellat velit, itaque fuga eius sit placeat ad! Molestias, suscipit aliquam.</p>
                    </div>
                </div>
            </Card>
        </>
    )
}