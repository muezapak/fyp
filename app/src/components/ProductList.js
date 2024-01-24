import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

   

    const getProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products');
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error (e.g., show a message to the user)
      }
    };
    


   // console.warn(products);

   const deleteProduct = async (id) => {
    console.warn(id);
    try {
      const response = await axios.delete(`http://localhost:4000/product/${id}`);
      if (response.data) {
        getProducts(); // Assuming getProducts() fetches products after deletion
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const searchHandle = async (event)=>{
    let key = event.target.value;
    try
    {
        if(key){
            let result = await axios.get(`http://localhost:4000/search/${key}`);
           
            if(result.data){
                setProducts(result.data)
            }
        }else{
            getProducts();
        }
    }
    catch (error) {
        console.error('Error in searching:', error);
        // Handle error (e.g., show a message to the user)
      }
 

}

return (
    <div className="product-list">
        <h3>Product List</h3>
        <input type="" className='search-product-box' placeholder='Search Product'
            onChange={searchHandle}
             />
        <ul>
            <li>S. No.</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
        </ul>
        {
            products.map((item,index)=>
            <ul key={item}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
        </ul>
            )
        }
    </div>
)
}

export default ProductList;