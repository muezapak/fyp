import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompnay] = React.useState('');


    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])
 
    const i=params.id;


    const getProductDetails = async () => {
      console.warn(params); // Assuming params is accessible within this scope
    
      try {
        const response = await axios.get(`http://localhost:4000/product/${params.id}`);
        const result = response.data;
    
        console.warn(result);
        console.log("value of i "+i);
    
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompnay(result.company);
       // navigate('/')
      } catch (error) {
        console.error('Error fetching product details:', error);
        // Handle error (e.g., show a message to the user)
      }
    };
    

    const updateProduct = async () => {
       // console.log("id is  "+params.name)
        // const i=JSON.stringify(params);
         console.log("id is here  "+i);
         console.warn(name, price, category, company)
         let result = await fetch(`http://localhost:4000/product/${i}`, {
             method: 'Put',
             body: JSON.stringify({ name, price, category, company }),
             headers: {
                 'Content-Type': 'Application/json'
             }
         });
         result = await result.json();
         if (result) {
            console.log("updated")
             navigate('/')
         }
      };
    


    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input type="text" placeholder='Enter product price' className='inputBox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />

            <input type="text" placeholder='Enter product category' className='inputBox'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />

            <input type="text" placeholder='Enter product company' className='inputBox'
                value={company} onChange={(e) => { setCompnay(e.target.value) }}
            />


            <button onClick={updateProduct} className='appButton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct;