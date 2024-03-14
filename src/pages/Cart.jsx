import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart, incQuantity, removeCartItem } from '../REDUX/Slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cart() {

  const cartItem = useSelector(state=>state.cartReducer)
  const [cartTotal,setCartTotal] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goHome =() =>{
    navigate('/home')
  }

  useEffect(()=>{
    if(cartItem?.length>0){
      setCartTotal(cartItem?.map(item=>item.totalPrice).reduce((t1,t2)=>t1+t2))
    }
    else{
      setCartTotal(0)
    }
  },[cartItem])

  const handleDecrementQuantity = (product) =>{
    if(product.quantity>1){
      dispatch(decQuantity(product.id))
    }
    else{
      dispatch(removeCartItem(product?.id))
    }
  }
  const handleCheckout = () =>{
    dispatch(emptyCart())
    toast.success("Order Placed Successfully... Thank you for purchasing with Us")
    setTimeout(goHome,3000)
  }

  return (
    <>
      <Header/>
      <div className="container pb-5" style={{marginTop:'100px'}}>
        {cartItem?.length>0?
                  <div className="pt-5">
                  <h1>Cart Summary</h1>
                  <div className="row mt-5">
                    <div className="col-lg-8">
                      <table className='table'>
                        <thead>
                          <th>#</th>
                          <th>Title</th>
                          <th>Image</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>...</th>
                        </thead>
                        <tbody>
                          {cartItem?.map((product,index)=>(
                          <tr>
                            <td>{index+1}</td>
                            <td>{product.title.slice(0,16)}...</td>
                            <td><img height={'60px'} width={'60px'} src={product.thumbnail}  alt="" /></td>
                            <td>
                              <div className='d-flex'>
                                <button onClick={()=>handleDecrementQuantity(product)} className='btn fw-bolder'>-</button>
                                <input value={product.quantity} type="text"  className='form-control mx-2' style={{width:'50px'}} placeholder='0' readOnly/>
                                <button onClick={()=>dispatch(incQuantity(product.id))} className='btn fw-bolder'>+</button>
                              </div>
                            </td>
                            <td>${product.totalPrice}</td>
                            <td>
                            <button onClick={()=>dispatch(removeCartItem(product?.id))} className='btn fw-bolder'><i class="fa-solid fa-trash text-danger"></i></button>
                            </td>
                          </tr>
                          ))}

                        </tbody>
                      </table>
                      <div className="d-flex justify-content-end">
                        <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-3'>Empty cart</button>
                        <button onClick={goHome} className='btn btn-success'>Shop More</button>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className=' border rounded shadow p-3'>
                        <h4>Total Items : <span className='text-danger'>{cartItem?.length}</span></h4>
                        <h3>Total Amount : <span className='text-danger'>${cartTotal}</span></h3>
                        <button onClick={handleCheckout} className='btn btn-success w-100'>Check Out</button>
                      </div>
                    </div>
                  </div>
                </div>
        :
        <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{height:"70vh"}}>
          <img src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png?f=webp" alt="" />
          <h3>Cart is empty!!!</h3>
        </div>
        }

      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Cart