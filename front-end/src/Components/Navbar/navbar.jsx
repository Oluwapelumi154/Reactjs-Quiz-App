/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../Redux/Slices/loginSlices";
const Navbar = () => {
   let user = useSelector((state) => state.user);

   const dispatch = useDispatch();
   const { userInfo } = user;

   const LogoutHandler = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      dispatch(signOut());
   };

   return (
      <div className='navigation-bar'>
         <nav className='navbar navbar-expand-lg'>
            <div className='container'>
               <h6 className='navbar-brand'>quiz-App</h6>
               <button
                  className='navbar-toggler'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#navbarSupportedContent'
                  aria-controls='navbarSupportedContent'
                  aria-expanded='false'
                  aria-label='Toggle navigation'>
                  <span className='navbar-toggler-icon text-white text-lowercase'></span>
               </button>
               <div
                  className='collapse navbar-collapse'
                  id='navbarSupportedContent'>
                  {userInfo ? (
                     <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                        <li class='nav-item dropdown'>
                           <a
                              class='nav-link '
                              href='#'
                              id='navbarDropdown'
                              role='button'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              {userInfo.firstName}
                           </a>
                           <ul
                              class='dropdown-menu'
                              aria-labelledby='navbarDropdown'>
                              <li>
                                 <Link to='/profile' className='dropdown-item'>
                                    AccountDetails
                                 </Link>
                              </li>
                              <li>
                                 <Link
                                    to='/login'
                                    className='dropdown-item'
                                    onClick={LogoutHandler}>
                                    log Out
                                 </Link>
                              </li>
                           </ul>
                        </li>
                     </ul>
                  ) : (
                     <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                        <li>
                           <Link to='/login' className='nav-link'>
                              sign In
                           </Link>
                        </li>
                        <li>
                           <Link to='/register' className='nav-link'>
                              sign Up
                           </Link>
                        </li>
                     </ul>
                  )}
               </div>
            </div>
         </nav>
      </div>
   );
};
export default Navbar;
