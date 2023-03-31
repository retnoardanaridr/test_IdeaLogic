import React, { useContext } from "react";
import { Sidebar } from "flowbite-react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";


export default function SideBar() {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)

    const Logout = () => {
        dispatch({ type: "LOGOUT" })
        navigate('/')
      }
    return (
        <>
            <div className="w-48 md:w-fit">
                <Sidebar aria-label="Default sidebar">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item
                                href="/dashboard"
                            >
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Item
                                href="/product"
                            >
                                Products
                            </Sidebar.Item>
                            <Sidebar.Item
                                href="/categories"
                            >
                                Categories
                            </Sidebar.Item>
                            <Sidebar.Item
                                href="/count"
                            >
                                Count
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <button onClick={Logout}>
                                    Logout
                                </button>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </>
    )
}