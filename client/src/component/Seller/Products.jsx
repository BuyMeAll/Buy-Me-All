import React, { useEffect, useState } from 'react';
import './Seller.css'
import axios from 'axios';
import Header from '../Header/Header';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';


const Products = ({user}) => {
    const [data,setData]=useState([])
    const [refresh,setRefresh]=useState(false)
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [quantity,setQuantity]=useState("")
    const [rate,setRate]=useState("")
    const [description,setDescription]=useState("")
    const [img,setImage]=useState("")
    const [hhh,setHhh]=useState("")
    const [category,setCategory]=useState("")
    const [arrCat,setArrCat]=useState([])
    const [show,setShow]=useState(true)


    const navigate=useNavigate()
    const id=(user===null)?0:user.id
    useEffect(()=>{
        axios.get(`http://localhost:3000/api/BuyMeAll/seller/products/${id}`).then((res)=>{
            setData(res.data)
        })
    },[refresh])

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/BuyMeAll/category`).then((res)=>{
            setArrCat(res.data)
        })
    },[refresh])

    const handleDelete=(idProd)=>{
        axios.delete(`http://localhost:3000/api/BuyMeAll/product/${idProd}`).then(()=>{
            setRefresh(!refresh)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const handleAdd=(obj)=>{
        axios.post(`http://localhost:3000/api/BuyMeAll/product`,obj).then((res)=>{
            console.log(res)
            setRefresh(!refresh)
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleImageUpload = async (e) => {
          const file = e.target.files[0];
          const form = new FormData();
          form.append('file', file);
          form.append('upload_preset', 'patient');
      
          try {
            const response = await axios.post(
              'https://api.cloudinary.com/v1_1/dodim9flq/image/upload',
              form,
              {
                headers: {
                  'Content-Type': 'multipart/form-data' 
                }
              }
            );
      
            const imageUrl = response
            console.log(imageUrl.data.secure_url)
            setImage(img+imageUrl.data.secure_url+",");
            setHhh(imageUrl.data.secure_url);
          } catch (err) {
            console.log(err);
          }
        }
console.log(arrCat)
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

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

    return (
        <div>
        <div className='flex'>
            <h1>Sellers Products</h1>
        </div>
        <div className='flex-col'>
            <button className='bt' onClick={()=>{setShow(!show)}}>Add Product</button>
           {!show&&<div className='inputs'><Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <div>
        <TextField
          label="Product Name"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '40ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          onChange={(e)=>{setName(e.target.value)}}
        />
        <FormControl sx={{ m: 1, width: '25ch' }}>
          <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Price"
            onChange={(e)=>{setPrice(e.target.value)}}
          />
        </FormControl>
        </div>
        <TextField
          label="Quantity"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '22ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          onChange={(e)=>{setQuantity(e.target.value)}}
        />
        <TextField
          label="Rate"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '22ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          onChange={(e)=>{setRate(e.target.value)}}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category}
          onChange={handleChange}
          label="Category"
        >
          {arrCat.map((el)=>(<MenuItem value={el.id}>{el.ca_name}</MenuItem>))}
        </Select>
      </FormControl>
        <TextField
          label="description"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '60ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          onChange={(e)=>{setDescription(e.target.value)}}
        />
        

        
      </div>
    </Box>
            <div>
      
    </div>
    
            <div class="input-div">
      <label class="file-label">
        <input class="input" name="picture" type="file" onChange={handleImageUpload}/>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon">
          <polyline points="16 16 12 12 8 16"></polyline>
          <line y2="21" x2="12" y1="12" x1="12"></line>
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
          <polyline points="16 16 12 12 8 16"></polyline>
        </svg>
      </label>
    </div>
    <div className='image-add'>
        {taktak(img.slice(0,img.length-1)).map((el)=>(
            <div className='image-width'>
    <img src={el} alt="" />
    </div>))}
    <button onClick={()=>{handleAdd({
        product_name:name,
        price:price,
        quantity:quantity,
        image:img.slice(0,img.length-1),
        rate:rate,
        description:description,
        seller_id:id,
        categoryId:category
    })}}>add</button>
    </div>
    </div>}
        </div>
      <div className='seller-products'>
        {data.map((el,i)=>(
      <div key={i} className="one-product">
          <div className="div-95">
            <div className="div-96">
              <img
                loading="lazy"
                src={taktak(el.image)[0]}
                className="img-17"
              />
            </div>
            <div className="div-98">
                <div >
                <DeleteOutlineIcon onClick={()=>{handleDelete(el.id)}}/>
              </div>
                <div onClick={()=>{
                    navigate(`/Seller/product/${el.id}`)
                }}>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/92f95af307a693492ef165c4482565d88008392560df9e3855fc15ed6903d028?"
                    className="img-19"
                />
                </div>
            </div>
          </div>
          <div className="div-99">{el.product_name}</div>
          <div className="div-100">
            <div className="div-101">{el.price}$</div>
            {/*      */}
          </div>
          <div className="div-103">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f79bd71a6471f38d5d1fc5e45c151fa99346fc4a5342fd2b25d87f1e68ade395?"
              className="img-20"
            />
            <div className="div-104">({el.quantity})</div>
          </div>
        </div>))}
     
        </div>  
        
    </div>
    );
};

export default Products;