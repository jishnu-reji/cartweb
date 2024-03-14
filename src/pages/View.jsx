import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistItem } from '../REDUX/Slices/wishlistSlice'
import { useParams } from 'react-router-dom'
import { addToCart } from '../REDUX/Slices/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function View() {

  const {id} = useParams()
  // console.log(id);
  const [product,setProduct] = useState()

  useEffect(()=>{
    if(sessionStorage.getItem("allProducts")){
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      // console.log(allProducts);
      setProduct(allProducts.find(item=>item.id==id))
    }
  },[])

  console.log(product);
  const cart = useSelector(state=>state.cartReducer)
  const wishlist = useSelector(state=>state.wishlistReducer)
  const dispatch = useDispatch()

  const handleWishlist = (product) =>{
    if(wishlist?.includes(product)){
      toast.info("item already in your wishlist!!!")
    }
    else{
      dispatch(addWishlistItem(product))
    }
  }

  const handleCart = (product)=>{
    const existingProduct = cart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      toast.success("products added to cart")
    }
    else{
      dispatch(addToCart(product))
    }
  }

  return (
    <>
      <Header/>
      <div style={{marginTop:'150px'}} className='container'>
        <div className='row mb-5 align-items-center'>
          <div className="col-lg-6">
            <img height={'400px'} width={'400px'} src={product?.thumbnail} alt="" />
          </div>
          <div className="col-lg-6 d-flex flex-column justify-content-center ">
            <h5>PID : {product?.id}</h5>
            <h1>{product?.title}</h1>
            <h3 className='text-primary fw-bolder'>$ {product?.price}</h3>
            <p style={{textAlign:"justify"}}> <b>Description</b> : {product?.description} </p>
            <div className="d-flex justify-content-between">
              <button onClick={()=>handleWishlist(product)} className='btn btn-outline-primary'><i class="fa-solid fa-heart me-2"></i>Add to wishlist</button>
              <button onClick={()=>handleCart(product)} className='btn btn-outline-primary'><i class="fa-solid fa-cart-shopping me-2"></i>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default View