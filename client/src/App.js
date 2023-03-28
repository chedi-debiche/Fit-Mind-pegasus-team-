import Header from "./components/backoffice/sharedBack/Header";
import Home from "./components/backoffice/Home";
import SideNav from "./components/backoffice/sharedBack/SideNav";
import Footer from "./components/backoffice/sharedBack/Footer";
import HeaderFront from "./components/frontoffice/shared/HeaderFront";
import HomeFront from "./components/frontoffice/HomeFront";
import FooterFront from "./components/frontoffice/shared/FooterFront";
import About from "./components/frontoffice/shared/About";
import Contact from "./components/frontoffice/contact/Contact";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/frontoffice/authentification/Login/index"
import Signup from "./components/frontoffice/authentification/Signup/index";
import ForgotPassword from "./components/frontoffice/authentification/ForgotPassword/index";
import PasswordReset from "./components/frontoffice/authentification/PasswordReset/index";
import Signedin from "./components/frontoffice/shared/signedin";
import Captcha from "./components/frontoffice/authentification/Captcha/index";
import HeaderSignedInClient from "./components/frontoffice/shared/HeaderSignedInClient";
import EmailVerify from "./components/frontoffice/authentification/EmailVerify/index";
import  User  from "./components/backoffice/usermanagement/UserList";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./components/frontoffice/authentification/Profile/index";
import { useEffect, useState } from 'react';
import UpdateUser from "./components/frontoffice/update";
import ProductList from "./components/backoffice/productmanagement/ProductList";
import Products from "./components/frontoffice/ProductManagement/Products";
import ProductCard from "./components/frontoffice/ProductManagement/ProductCard";
import Cart from "./components/frontoffice/ProductManagement/Cart"




function App() {

  return (

    <BrowserRouter>
    <div>
      <Routes>
           <Route path="/" element={<HomeFront />} />
           <Route path="/about" element={<About/>} />
           <Route path="/contact" element={<Contact/>} />
           <Route path="/signin" element={<Login/>} />
           <Route path="/signup" element={<Signup/>} />
           <Route path="/showdetails/:id" element={<Profile/>} />
           <Route path="/update/:id" element={<UpdateUser/>} />



           <Route path="/signedin" element={<Signedin/>} />
           <Route path="/test" element={<HeaderSignedInClient/>} />
           <Route path="/user" element={<User/>} />



           {/* <Route path="/Captcha" element={<Captcha/>} /> */}
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
		      <Route path="/password-reset/:id/:token" element={<PasswordReset />} />

          <Route path="/productsd" element={<ProductList/>} />
          <Route path="/Products" element={<Products/>} />
          <Route path="/productcard" element={<ProductCard/>} />
          <Route path="/cart" element={<Cart/>} />





        {/* Add more routes for other components */}
      </Routes>
        
    </div>
  </BrowserRouter>

    );
  }








export default App;
