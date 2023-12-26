import React, { useEffect, useState } from "react";
import '../ProductDetails/ProductDetails.css'
import TopHeader from "../Top Header/TopHeader.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


const ProductUpdate=() =>{
  const [oneProduct,SetOneProduct]=useState([])
  const [oneProdImg,setOneProdImg]=useState([])
  const [idImg,setIdImg]=useState(0)

  const {id}=useParams()

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
  useEffect(()=>{
    axios.get(`http://localhost:3000/api/BuyMeAll/products/${id}`).then((result)=>{
      SetOneProduct(result.data)
      setOneProdImg(taktak(result.data.image))
    })
  },[])
  
console.log(id)
  return (
    <>
      <div className="divP">
        <div className="divProduct23">
          
          <div className="divProduct28">
            <div className="divProduct29">
              <div className="columnP">
               { oneProdImg.map((el,i)=>(
                <div key={i} onClick={()=>{setIdImg(i)}} className="divProduct30">
                  <div className="divProduct31">
                    <img
                      loading="lazy"
                      srcSet={el?el:""}
                      className="imgProduct5"
                    />
                  </div>
                </div>
                 ))}
              </div>
              <div className="columnProduct2">
                <div className="divProduct35">
                  <img
                    loading="lazy"
                    srcSet={oneProdImg[idImg]}
                    className="imgProduct9"
                  />
                </div>
              </div>
              <div className="columnProduct3">
                <div className="divProduct36">
                  <div className="divProduct37">{oneProduct.product_name}</div>
                  <div className="divProduct38">
                    <div className="divProduct39">
                         {parseFloat(oneProduct.rate)&&<Stack spacing={1}>
                       <Rating name="half-rating" defaultValue={parseFloat(oneProduct.rate)} precision={0.5} readOnly />
                            </Stack>}
                      <div className="divProduct40">({oneProduct.quantity})</div>
                    </div>
                    <div className="divProduct41">In Stock</div>
                  </div>
                  <div className="divProduct42">${oneProduct.price}</div>
                  <div className="divProduct43">{oneProduct.description}</div>
                  <div className="divProduct44" />
                  
                  
                  
                
                </div>
              </div>
            </div>
          </div>
          
         
        </div>
      </div>
    </>
  );
}

export default ProductUpdate
