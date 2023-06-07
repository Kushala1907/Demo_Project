import React ,{ useState ,useEffect}from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { Modal,Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useFormik } from 'formik';

function UserImages() {
    //get userState from redux store using useSelector hook
    let {userObj}=useSelector(state=>state.login)
    //create state to updates with empty array
    let [images,setImages]=useState([])
    let navigate=useNavigate()
    //create state to showModel
    let [showModal,setShowModal]=useState(false)
    //function to open Modal
    let openModal=()=>setShowModal(true)
    //function to closeModel
    let closeModal=()=>setShowModal(false)
    //use state
    let [imageId,setImageId]=useState()
    //get token from session storage
    let token=sessionStorage.getItem("token");

    //update image
    const updateImageDetails=(obj)=>{
        console.log(obj)
        setImageId(obj.id)
        openModal()
    }

    // after submitting form from modal
    const onSubmit =async( values)=>{
      console.log("onSubmit",values)
      values.id = imageId
      let res = await axios.put(`http://localhost:2222/user-api/update-image/${userObj.email}`,values,{
            headers:{Authorization: `Bearer ${token}`}
      })
      console.log("response",res)
      closeModal()
      getUserImages()
    }

    const getUserImages=async()=>{
      try{
        //req to get user images
        let res=await axios.get(`http://localhost:2222/user-api/get-user-images/${userObj.email}`,{
            headers:{Authorization: `Bearer ${token}`}
        })
        console.log(res.data)
        //set res.data.payload to upadtes
        setImages(res.data.payload)  
      }
      //if err occurs print it to console
      catch(err){
          console.log("err",err)    
      }        
    }

    //delete user-image
    const deleteImage=async(image_id)=>{
    //req to delete project-update
        let res= await axios.delete(`http://localhost:2222/user-api/delete-image/${userObj.email}/${image_id}`,{
            headers:{Authorization: `Bearer ${token}`}
        })
        //if deleted successfully
        if(res.data.message=="Image deleted"){
            getUserImages()
        }
        //if not deleted login to get delete-access
        else{

            navigate(`/login`)
        }
    }

    //use-effect hook
    useEffect(()=>{
      //calling getAllUpdates function
      getUserImages()
    },[])
  
    return (
      
      <div className="text-center" >
        <div>
        <button className="btn position-absolute top-0 start-0 p-1" style={{ width: '30px', height: '30px' }}>
        <img src="https://tse4.mm.bing.net/th?id=OIP.BaMAGpD8NSNjX7wpMhq1bQHaHa&pid=Api&P=0&h=180" alt="Button Image" 
        style={{ width: '100%', height: '100%' }}
        onClick={()=>navigate(`/add-image/${userObj.email}`)} />
        </button>

        <div className="row">
          {  
            images.length > 0 ? (
              images.map(userObj=> 
                <div className="col-sm-12 col-lg-3 col-md-4">
                  <div className='card text-center shadow'>
                    <div className='card-body'>
  
                      <img src={userObj.image_url} height="100%" width="100%"></img>
                      <p>{userObj.day}</p>
                        {/* button to create update */}
                        <button className="btn btn-success me-2" onClick={()=>updateImageDetails(userObj)}>Update</button>
                        {/* button to raise concern */}
                        <button className="btn btn-danger ms-2" onClick={()=>deleteImage(userObj.id)}>Delete</button>

                    </div>
                  </div>
                </div>
              )
            ) : (
              <p>No images available.</p>
            )} 
        </div>
        {/**Modal */}
        <Modal show={showModal} onHide={closeModal} backdrop="static" className="bg-secondary">
        <Modal.Header closeButton>
            <Modal.Title>Update Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik initialValues={{ image_url: '' }} onSubmit={onSubmit} >
          <Form >
            <div>
                <Field type="url" name="image_url" placeholder="Image_Url" />
                <ErrorMessage name="image_url" component="div" />
            </div>
            <Button variant="success" type="submit" className="float-end">Save</Button>
          </Form>
        </Formik>
        </Modal.Body>
       
            
      
    </Modal>
      </div>
      </div>
    );
  }
  //export ProjectManagerDashBoard
  export default UserImages;