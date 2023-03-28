import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCart(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCart();
  }, [userId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  const getProductById = (productId) => {
    if (!products) return null;
    return products.find(product => product._id === productId);
  }

  const handleQuantityChange = async (productId, quantity) => {
    try {
      await axios.patch(`http://localhost:5000/api/cart/${userId}/${productId}`, { quantity });
      setCart(prevCart => {
        const productIndex = prevCart.products.findIndex(p => p.productId === productId);
        const updatedProducts = [...prevCart.products];
        updatedProducts[productIndex].quantity = quantity;
        return { ...prevCart, products: updatedProducts };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
      setCart(prevCart => {
        const productIndex = prevCart.products.findIndex(p => p.productId === productId);
        const updatedProducts = [...prevCart.products];
        updatedProducts.splice(productIndex, 1);
        return { ...prevCart, products: updatedProducts };
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (!cart || !products) {
    return <p>Loading...</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Image</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cart.products.map(product => {
          const productInfo = getProductById(product.productId);
          const productPrice = productInfo.price.toFixed(2);
          const totalPrice = (productPrice * product.quantity).toFixed(2);
          return (
            <tr key={product._id}>
              <td>{productInfo.name}</td>
              <td>
                <img
                  className="cart-product-image"
                  src={`http://localhost:5000/uploads/${productInfo.image}`}
                  alt={`Image of ${productInfo.name}`}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(product.productId, e.target.value)}
                />
              </td>
              <td>{`$${productPrice}`}</td>
              <td>{`$${totalPrice}`}</td>
              <td>
                <button onClick={() => handleRemoveProduct(product.productId)}>Remove</button>
              </td>
            </tr>
          );
        })}
     
     </tbody>
</table>
);
};
export default Cart;



