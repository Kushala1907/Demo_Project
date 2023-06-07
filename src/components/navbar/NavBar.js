import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {clearState} from '../../slices/loginslice';
import './NavBar.css'

function NavBar() {
  //declare useDispatch method
  let dispatch=useDispatch();
  //destrcture from store
  let {userObj,status}=useSelector((state)=>state.login)
 
  //logout
  const logout=()=>{
    sessionStorage.removeItem("token")
    dispatch(clearState())
  }
  return (
    <div className="navbar d-flex ">
      <ul className="nav ms-5">
         <li className="nav-item ">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="register"
          >
            Register
          </NavLink>
        </li> 
        {(status=="success")?(<li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="login" onClick={logout}
          >
            Logout
          </NavLink>
        </li>):
        (
        <li className="nav-item"> 
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="login"
          >
            Login
          </NavLink>
        </li>
       )} 
      </ul>
      {console.log(status)}
      
      {(status === "success") && (
      <div className="d-flex align-items-center">
        <p className="text-white ps-5 ms-5 pt-2">{userObj.email}</p>
        <img src="https://tse1.mm.bing.net/th?id=OIP.f3DM2upCo-p_NPRwBAwbKQHaHa&pid=Api&P=0&h=180" style={{ width: "30px", height: "30px" }}  className="rounded-circle align-items-lg-end" />
      </div>
    )}

    </div>
  );
}
//export NavBar
export default NavBar;