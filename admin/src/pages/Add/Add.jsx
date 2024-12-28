import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/admin_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
   
   const [image,setImage] = useState(false)
   const [data,setData] = useState({
    name:'',
    description:'',
    price:'',
    category:'Salad'
   })

   const onChangeHandler=(e)=>{
       const name=e.target.name
       const value=e.target.value
       setData(prev=>({...prev,[name]:value}))
   }
   const onSubmitHandler= async (e)=>{
        e.preventDefault() //to prevent reload
        const formData= new FormData()
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)

        //api call
        const response = await axios.post(`${url}/api/food/add`,formData)
        if(response.data.success){
          //reset data
             setData({
              name:'',
              description:'',
              price:'',
              category:'Salad'
             })
             setImage(false)
             toast.success(response.data.message)
            }else{
          toast.error(response.data.message)
        }
   }


  return (
    <for className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input type="text" onChange={onChangeHandler} value={data.name} name="name" placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} rows='6' name="description" placeholder='Write content here'></textarea>
        </div>
        <div className="add-category-price">
          <div className='add-category flex-col'>
            <p>Product category</p>
            <select name="category" onChange={onChangeHandler} value={data.category}>
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Deserts'>Deserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='$20' />
          </div>
        </div>
        <button className='add-btn' type='submit'>ADD</button>
      </form>
    </for>
  )
}

export default Add
