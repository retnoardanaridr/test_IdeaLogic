import React, { useContext } from "react";
import { Navbar, Button } from "flowbite-react"
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";


function Header() {
    const [state, dispatch] = useContext(UserContext);

    return (
        <>
            <Navbar>
                <Navbar.Brand href="/">
                    <span className="self-center whitespace-nowrap text-xl font-semibold font-culpa">
                        IdeaLogic
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    {state.isLogin ? (
                        <>
                            <Link to={'/dashboard'}>
                                Dashboard
                            </Link>
                        </>
                    ) : (
                        <>
                            <Button outline={true} gradientDuoTone="purpleToBlue" href="/register">
                                Register
                            </Button>
                            <Button gradientDuoTone="purpleToBlue" className="px-8" href="/login">
                                Login
                            </Button>
                        </>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </> 
    )
}


export default Header;