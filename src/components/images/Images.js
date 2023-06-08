import React ,{ useState ,useEffect}from "react";
import axios from "axios";

function Image() {
    //create state to updates with empty array
    let [images,setImages]=useState([])
      
    //get all Images
    const getAllImages=async()=>{
      try{
        //req to get all images
        let res=await axios.get(`${process.env.REACT_APP_PATH}/user-api/get-images`)
        console.log(res.data)
        //set res.data.payload to upadtes
        setImages(res.data.payload)  
      }
      //if err occurs print it to console
      catch(err){
          console.log("err",err)    
      }
            
    }

    //use-effect hook
    useEffect(()=>{
      //calling getAllUpdates function
      getAllImages()
    },[])
  
    return (
      
      <div className="text-center" >
        <div className="row">
          {
            images.length > 0 ? (
              images.map(userObj=> 
                <div className="col-sm-12 col-lg-3 col-md-4 mt-4">
                  <div className='card text-center shadow'>
                    <div className='card-body'>
  
                      <img src={userObj.image_url} height="100%" width="100%"></img>
                      <p>{userObj.day}</p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <p>No images available.</p>
            )}
          
        </div>
        
      </div>
    );
  }
  //export ProjectManagerDashBoard
  export default Image;