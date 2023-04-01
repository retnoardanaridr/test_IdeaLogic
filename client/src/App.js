import React, { useContext, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from './components/auth/login';
import Header from './components/navbar';
import Register from './components/auth/register';
import LandingPage from './pages/landingPage';
import { API, setAuthToken } from './config/api';
import { UserContext } from './context/userContext';
import Dashboard from './pages/dashboard';
import Products from './pages/product';
import Categories from './pages/category';
import Count from './pages/count';
import AddProduct from './pages/addProduct';
import AddCategory from './pages/addCategory';


function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.user.role === 'admin') {
      navigate('/index-admin');
      console.log(state.user.role)
    } else if (state.user.role === 'user') {
      navigate('/')
      console.log(state.user.role)
    }
  }, [state]);

  const checkUserAuth = async () => {
    try {
      if (localStorage.token) { 
        setAuthToken(localStorage.token); 
        const response = await API.get("/check-auth"); 

        let payload = response.data.data; 
        payload.token = localStorage.token;
        console.log(localStorage.token);
   
        dispatch({ 
           type: "USER_SUCCESS", 
           payload, 
        }); 
     } 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, [])


  return (
    <>
      <Header/>
      <Routes>
        <Route exact path='/' element={<LandingPage/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/dashboard' element={<Dashboard/>} />
        <Route exact path='/product' element={<Products/>} />
        <Route exact path='/categories' element={<Categories/>} />
        <Route exact path='/count' element={<Count/>} />
        <Route exact path='/add-product' element={<AddProduct/>} />
        <Route exact path='/add-category' element={<AddCategory/>} />
      </Routes>
    </>
  );
}

export default App;
