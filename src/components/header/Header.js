import styles from './Header.module.scss';
import {useState,useEffect} from "react";
import {Link,NavLink,useNavigate} from "react-router-dom";
import {FaShoppingCart,FaTimes,FaUserCircle} from "react-icons/fa";
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { onAuthStateChanged,signOut } from 'firebase/auth';
import {useDispatch,useSelector} from "react-redux";
import {REMOVE_ACTIVE_USER,SET_ACTIVE_USER} from "../../redux/slices/authSlice";
import ShowOnLogin,{ShowOnLogout} from "../hiddenLink/hiddenLink";
import {AdminOnlyLink} from "../adminOnlyRoute/AdminOnlyRoute";
import {CALCULATE_TOTAL_QUANTITY,selectCartTotalQuantity} from "../../redux/slice/cartSlice";
import {auth} from "../../firebase/config";



const logo=(
   <div className={styles.logo}>
      <Link to="/">
         <h2>
            e<span>web</span>
         </h2>
      </Link>
   </div>
)

const activeLink=({isActive})=>(isActive ? `${styles.active}`:"");

const Header=()=>{
   const [showMenu,setShowMenu]=useState(false);
   const [displayName,setDisplayName]=useState("");
   const [scrollPage,setScrollPage]=useState(false);
   const cartTotalQuantity=useSelector(selectCartTotalQuantity);
   const navigate=useNavigate();
   const dispatch=useDispatch();
   
   useEffect(()=>{
      dispatch(CALCULATE_TOTAL_QUANTITY());
   },[]);

   const fixNavbar=()=>{
      if(window.scrollY > 50){
         setScrollPage(true);
      }else{
         setScrollPage(false);
      }
   }

   window.addEventListener("scroll",fixNavbar);

   useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
         if(user){
            if(user.displayName === null){
               const u1=user.email.slice(0,-10);
               const uName=u1.charAt(0).toUpperCase()+u1.slice(1);
               setDisplayName(uName);
            } else{
               setDisplayName(user.displayName)
            }

            dispatch(
               SET_ACTIVE_USER({
                  email:user.email,
                  userName:displayName,
                  userID:user.uid,
               })
            )
         }else{
            setDisplayName("");
            dispatch(REMOVE_ACTIVE_USER());
         }
      })
   },[dispatch,displayName]);

   const toggleMenu =()=>setShowMenu(!showMenu);
   const hideMenu =()=>setShowMenu(false);

   const logoutUser=()=>{
      signOut(auth).then(()=>navigate("/"))
                  .catch((err)=>console.log(err))
   }

   const cart=(
      <span className={styles.cart}>
         <Link to="/cart">
            cart
            <FaShoppingCart size={20}/>
            <p>{cartTotalQuantity}</p>
         </Link>
      </span>
   )

     return(
        <header className={scrollPage ? `${styles.fixed}`:null}>
            <div className={styles.header}>
               {logo}

               <nav
                  className={showMenu ? `${styles["show-nave"]}`:`${styles["hide-nav"]}`}
               >
                <div
                className={
                  showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`:
                     `${styles["nav-wrapper"]}`
                }
                >
                  onClick={hideMenu}
                </div>

                <ul onClick={hideMenu}>
                  <li className={styles["logo-mobile"]}>
                  {logo} <FaTimes size={22} color="#fff" onClick={hideMenu}/>
                  </li>

                  <li>
                     <AdminOnlyLink>
                        <Link to="/admin/home">
                           <button className="--btn --btn-primary">Admin</button>
                        </Link>
                     </AdminOnlyLink>
                  </li>

                  <li>
                     <NavLink to="/" className={activeLink}>
                        Home
                     </NavLink>
                  </li>

                  <li>
                     <NavLink to="/contact" className={activeLink}>
                        Contact Us
                     </NavLink>
                  </li>
                </ul>

                <div className={styles["header-right"]} onClick={hideMenu}>
                  <span className={styles.links}>
                     <ShowOnLogout>
                        <NavLink to="/login" className={activeLink}>Login</NavLink>
                     </ShowOnLogout>
                     <ShowOnLogin>
                        <a href="#home" style={{color:"#ff7722"}}>
                           <FaUserCircle size={16}/> Hi {displayName}
                        </a>
                     </ShowOnLogin>

                     <ShowOnLogin>
                        <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
                     </ShowOnLogin>

                     <ShowOnLogin>
                        <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
                     </ShowOnLogin>
                  </span>
                  {cart}
                </div>
               </nav>

                <div className={styles["menu-icon"]}>
                  {cart}
                  <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
                </div>
            </div>
        </header>
     )
}

export default Header;