import React from "react";
import Images from "../images/Images";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";

function Home() {
  //destrcture from store
  let {userObj,status}=useSelector((state)=>state.login)
  let navigate=useNavigate()
  return (
    <div className="text-center">
      {(status === "success") && (
        <button className="btn position-absolute top-0 start-0 p-1" style={{ width: '30px', height: '30px' }}>
        <img src="https://tse4.mm.bing.net/th?id=OIP.BaMAGpD8NSNjX7wpMhq1bQHaHa&pid=Api&P=0&h=180" alt="Button Image" 
        style={{ width: '100%', height: '100%' }}
        onClick={()=>navigate(`/add-image/${userObj.email}`)} />
        </button>
      )}
      <div className="lead">
        <Images />
      </div>
    </div>
  );
}
//export Home
export default Home;