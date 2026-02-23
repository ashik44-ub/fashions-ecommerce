import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import { logout } from '../redux/features/auth/authSlice'
import { useLogoutUserMutation } from '../redux/features/auth/authApi'
import CartModal from '../pages/shop/CartModal'

const Navbar = () => {

  // cartslice
  const products = useSelector((state)=> state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
 
  const { user } = useSelector((state)=> state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // handle cart toggole
  const handleCartToogle = () => {
    setIsCartOpen(!isCartOpen)
  } 
// dropdown menus
const [isDropDownOpens, setIsDropDownOpens] = useState(false);
const handleDropDownToogle = () => {
  setIsDropDownOpens(!isDropDownOpens)
}

  const userDropdownMenus = [
    {label: "Dashboard", path: "/dashboard"},
    {label: "Profile", path: "/dashboard/profile"},
    {label: "Payments", path: "/dashboard/payments"},
    {label: "Orders", path: "/dashboard/orders"}
  ]

  const adminDropdownMenus = [
    {label: "Dashboard", path: "/dashboard/admin"},
    {label: "Manage Items", path: "/dashboard/manage-products"},
    {label: "All Orders", path: "/dashboard/manage-orders"},
    {label: "Add Product", path: "/dashboard/add-product"}
  ]

  // role based dropdown show
  const dropdownmenus = user?.role === "admin" ? [...adminDropdownMenus] : [...userDropdownMenus]

  const [logoutUser] = useLogoutUserMutation()

  const handlelogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout())
      alert("Logged Out Successfull")
      navigate('/')
    } catch (error) {
      console.error("Error logging out", error)
    }
  }

  return (
    <header className="fixed-nav-bar w-nav">
      <nav
        className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <NavLink className={({ isActive, isPending }) => isActive ? 'active' : ""} to="/">Home</NavLink>
          </li>
          <li className="link">
            <NavLink className={({ isActive, isPending }) => isActive ? 'active' : ""} to="/shop">Shop</NavLink>
          </li>
          <li className="link">
            <NavLink className={({ isActive, isPending }) => isActive ? 'active' : ""} to="/pages">Pages</NavLink>
          </li>
          <li className="link">
            <NavLink className={({ isActive, isPending }) => isActive ? 'active' : ""} to="/contact">Contact</NavLink>
          </li>
        </ul>
        <div className="nav__logo">
          <Link to="/">Fashions<span>.</span></Link>
        </div>
        <div className="nav__icons relative">
          <span
          ><Link to="/search"><i className="ri-search-line"></i></Link></span>
          <span><button
          onClick={handleCartToogle}
          className="hover:text-primary">
            <i className="ri-shopping-bag-line"></i><sup
              className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center"
            >
              {products.length}
            </sup>
          </button></span><span>
            {
              user? <>
              <img onClick={handleDropDownToogle} src={ user?.profileImage || avatar} className='size-6 rounded-full cursor-pointer' alt="" />

              {
                isDropDownOpens && (
                  <div className='absolute right-0 mt-3  p-4 w-48 bg-white border-gray-200 rounded-lg z-50'>
                    <ul className='font-medium space-y-4 p-2'>
                      {
                        
                        dropdownmenus.map((menu, index) => (
                          <li key={index}>
                            <Link
                            className='dropdown-items'
                            onClick={()=> handleDropDownToogle(false)}
                            to={menu.path}>{menu.label}</Link>
                          </li>
                        ))
                      }
                      <li>
                        <Link className='dropdown-items' onClick={handlelogout}>Logout</Link>
                      </li>
                    </ul>
                  </div>
                )
              }

              </> : <Link to={'/login'}>
            <i className="ri-user-line size-6 rounded-full cursor-pointer"></i>
            </Link>
            }
            
          </span>
        </div>
      </nav>
      { isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToogle} />}
    </header>
  )
}

export default Navbar