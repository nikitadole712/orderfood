import React,{useState} from 'react'
import { UilUtensilsAlt } from '@iconscout/react-unicons'
import {Link,useNavigate} from "react-router-dom"
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '/home/vmaral/Desktop/Nikita/Projects/orderfood/src/Components/ContextReducer.js';
import Modal from '../Modal';
import Cart from '/home/vmaral/Desktop/Nikita/Projects/orderfood/src/Screens/Cart.js'

export default function Navbar(props) {
  const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')

        navigate("/login")
    }

    const loadCart = () => {
        setCartView(true)
    }

    const items = useCart();
  return (
    
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark shadow-lg p-3 rounded position-sticky" style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
   <div className="container-fluid">
    <UilUtensilsAlt className ="mx-1"/>
    <Link className="navbar-brand fs-1 fst-italic mx-2 text-black" to="#">Taste4U</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5 mx-2 text-black" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("token")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active text-black" aria-current="page" to="/myorder" >My Orders</Link>  {/* index.css - nav-link color white */}
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-black mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-black mx-1" to="/createuser">Signup</Link>
                            </form> :
                            <div>

                                <div className="text-black mx-2 " onClick={loadCart}>
                                    <Badge color="secondary" badgeContent={items.length} >
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </div>

                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                              <button onClick={handleLogout} className="btn text-black" >Logout</button></div>}
                    </div>
                </div>
            </nav>
      </div> 
  )
}
