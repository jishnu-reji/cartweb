import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchProduct } from "../REDUX/Slices/productSlice";

function Header({insideHome}) {

  const dispatch = useDispatch()
  const wishlistCount = useSelector(state=>state.wishlistReducer).length
  const cartCount = useSelector(state=>state.cartReducer).length

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary fixed-top w-100" data-bs-theme="dark">
        <div className="container">
          <Link to={'/'} style={{textDecoration:"none",color:'white'}}><i className="fa-solid fa-truck text-warning me-2"></i>E Cart</Link>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            {
            insideHome && <form className="d-flex ms-auto me-auto">
              <input onChange={(e)=>dispatch(searchProduct(e.target.value.toLowerCase()))} className="form-control me-sm-2" type="search" placeholder="Search Products here"/>
            </form>
            }
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={'/wishlist'} className="me-2" style={{textDecoration:"none",color:'white'}}><i className="fa-solid fa-clipboard-list text-danger me-2"></i>Wishlist<span className="badge badge-light">{wishlistCount}</span></Link>
              </li>
              <li className="nav-item">
                <Link to={'/cart'} style={{textDecoration:"none",color:'white'}}><i className="fa-solid fa-cart-shopping text-success me-2"></i>Cart<span className="badge badge-light">{cartCount}</span></Link>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
