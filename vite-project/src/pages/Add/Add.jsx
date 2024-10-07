/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './Add.css'
import {assets} from '../../assets/assets.js'
import axios from 'axios';
import { toast } from 'react-toastify';
const Add = ({url}) => {
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:'',
    description:'',
    price:'',
    category:'Meat',
  
  });
  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const onSubmitHandler = async (event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append('image',image);
    formData.append('name',data.name);
    formData.append('description',data.description);
    formData.append('price',data.price);
    formData.append('category',data.category);
    const response = await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
      setData({
        name:'',
        description:'',
        price:'',
        category:'Meat',
      })
      setImage(false);
      toast.success('Product Added Successfully');
    }else{
      toast.error(response.data.message);
    }
  }
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className="add-img-upload flex-col">
             <p>Upload Image</p>
             <label htmlFor="image">
               <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
              </label>
              <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id="image" hidden required />
          </div>
          <div className="add-product-name">
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Enter Name'/>
          </div>
          <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Enter Description' required>

            </textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product Category</p>
              <select onChange={onChangeHandler} name="category">
                <option value="Meat">Meat</option>
                <option value="Meals">Meals</option>
                <option value="BBQ">BBQ</option>
                <option value="Fried">Fried</option>
                <option value="Fishes">Fishes</option>
                <option value="Pizza">PIzza</option>
                <option value="Crepe">Crepe</option>
                <option value="Deserts">Deserts</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product Price</p>
              <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$' required/>
            </div>

          </div>
          <button type='submit' className='add-btn'>Add Product</button>
        </form>
    </div>
  )
}

export default Add