import React from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthorContext/IdentityContext.jsx';
import ECommerceHomePage from './component/ECommerceHomePage/ECommerceHomePage.jsx';
import SignIn from './component/SignIn/SignIn.jsx';
import SignUp from './component/SignUp/SignUp.jsx';
import ProductDetails from './component/ProductDetails/ProductDetails.jsx';
import Admin from './component/Admin/Admin.jsx';
import Seller from './component/Seller/Seller.jsx';
import Profile from './component/Profile/profile.jsx';
import ProductUpdate from './component/Seller/ProductUpdate.jsx'
import Cart from './component/Cart/Cart.jsx';
import Wishlist from './component/Wishlist/Wishlist.jsx'
import {useIdentity} from './AuthorContext/IdentityContext.jsx'
import About from './component/About/About.jsx'

function App() {
   
  const {user}=useIdentity()
  console.log(user)
  const taktak=(str)=>{
    var start=0
    var arr=[]
    for (var i=0;i<str.length;i++){
        if(str[i]===','){
            arr.push(str.slice(start,i))
            start=i+1
        }
    }
    return arr
}
  return (

    <Routes>
      <Route path='/' element={ <ECommerceHomePage user={user}/>}></Route>  
      <Route path='/SignIn' element={ <SignIn/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
      <Route path='/admin/:id' element={<Admin/>}></Route>
      <Route path='/seller/:id' element={ <Seller user={user}/>}></Route>
      <Route path='/Profile' element={ <Profile user={user}/>}></Route>
      <Route path='/Product/:id' element={<ProductDetails user={user} />} ></Route>
      <Route path='/Seller/product/:id' element={<ProductUpdate/>} ></Route>
      <Route path='/Cart' element={<Cart taktak={taktak} user={user}/>} ></Route>
      <Route path='/WishList' element={<Wishlist user={user}/>} ></Route>
      <Route path='/About' element={<About/>} ></Route>

 </Routes>


  );
}

export default App;