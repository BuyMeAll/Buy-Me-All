import React from "react";
import Footer from "../Footer/Footer";
import TopHeader from "../Top Header/TopHeader";
import Header from "../Header/Header";
import "./Cart.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Cart=({taktak,user})=> {

  const navigate=useNavigate()



  const stor=JSON.parse(localStorage.getItem("basket"))?JSON.parse(localStorage.getItem("basket")):[]
  const totalPrice=()=>{
  const totalArray= stor.map((el)=>el.price)
  let res=0
  for (let i=0;i<totalArray.length;i++){
    res+=totalArray[i]
  }
  return res
}

 const addOrder=async(obj)=>{
  const result=await axios.post("http://localhost:3000/api/BuyMeAll/orders",obj)
 }

 const handlePurchase=()=>{
  stor.map((el,i)=>{
    addOrder({
      send:false,
      userId:user.id,
      productId:el.id
  })
  })
  localStorage.removeItem("basket")
  alert("thanks for your purchase")
  navigate('/')
 }
  return (
    <>
      <div className="divCart">
      <TopHeader/>
      <Header/>

        
        <div className="divCart23">
          
          <div className="divCart27">
            <div className="divCart28">
              <div className="divCart29">Product</div>
              <div className="divCart29">Price</div>
              <div className="divCart29">Quantity</div>
              <div className="divCart29">Subtotal</div>
            </div>
          </div>
          {stor.length?stor.map((el,i)=>(
          <div key={i} className="divCart33">
            <div className="divCart34">
              <img
                loading="lazy"
                srcSet={taktak(el.image)[0]}
                className="imgCart5"
              />
              
            </div>
            <div className="divCart36">{el.product_name}</div>
            <div>1</div>
            <div className="divCart37">{el.price}</div>
          </div>)):<h1>Empty Busket</h1>}
          
          <div className="divCart43">
            
          </div>
          <div className="divCart46">
            <div className="divCart47">
              <div className="columnCart2">
                <div className="divCart51">
                  <div className="divCart52">Cart Total</div>
                  <div className="divCart53">
                    <div className="divCart54">Subtotal:</div>
                    <div className="divCart55">${totalPrice()}</div>
                  </div>
                  <div className="divCart56" />
                  <div className="divCart57">
                    <div className="divCart58">Shipping:</div>
                    <div className="divCart59">Free</div>
                  </div>
                  <div className="divCart60" />
                  <div className="divCart61">
                    <div className="divCart62">Total:</div>
                    <div className="divCart63">${totalPrice()}</div>
                  </div>
                  <div className="divCart64" onClick={()=>{
                    user===null?navigate('/SignIn'):
                    handlePurchase()
                    }}>Purchase</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    <Footer/>
      </div>
    </>
  );
}


export default Cart