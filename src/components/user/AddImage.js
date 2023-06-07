import React,{ useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import  axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";

function AddImage() {
    //user state from store
    let {userObj}=useSelector(state=>state.login)
    //const history = useHistory();
    let navigate=useNavigate()
    //taking state for error
    let [err,setErr]=useState("")
    let [message,setMessage]=useState("")
    //get token from session storage
    let token=sessionStorage.getItem("token");
    //initialze values
    const initialValues = {
      
      day:'',
      image_url: '',
    };
  
    const handleSubmit = async(userCredObj, { resetForm }) => {
      // Handle form submission
      console.log("user after submit",userCredObj);
      userCredObj.email=userObj.email;  

      try{
        //post request to create new employee
        let res=await axios.post(`http://localhost:2222/user-api/add-image/${userObj.email}`,userCredObj,{
          headers:{Authorization: `Bearer ${token}`}
        });
        console.log("response",res) 
        //if registered successfully
        if(res.data.message==="Image uploaded and email sent"){
            setMessage(res.data.message);
            //navigate('/login');
        }
        //if not registerd
        else{           
            //set err message
            setErr(res.data.message)
            setMessage("");
            console.log("err state",err)
         }
      }
      catch(err){
        console.log(err)
        setErr("Failed to Upload");
      }
      //clear form
      resetForm();
    };
  
    return (
        
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <div className="container">
        <div className=" row justify-content-md-center">
        <h2 className="text-center mb-3">Add Image</h2>
        <h5 className="text-danger text-center">{err}</h5>
        <div className="col-sm-8 col-lg-6">
        <h5 className="text-success text-center">{message}</h5>
        <div className='card text-center shadow p-3 m-3'>
        <Form>
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="mb-3">
                <label htmlFor="day" className="form-label">Day:</label>
                <Field as="select" id="day" name="day" className="form-control">
                    <option value="">Select a day</option>
                    <option value="monday">MONDAY</option>
                    <option value="tuesday">TUESDAY</option>
                    <option value="wednesday">WEDNESDAY</option>
                    <option value="thursday">THURSDAY</option>
                    <option value="friday">FRIDAY</option>
                    <option value="saturday">SATURDAY</option>
                    <option value="sunday">SUNDAY</option>
                </Field>
                <ErrorMessage name="day" component="div" />
            </div>
            <div className="mb-3">
                <label htmlFor="image_url" className="form-label">Image_url:</label>
                <Field type="url" id="image_url" name="image_url" className="form-control" />
                <ErrorMessage name="image_url" component="div" />
            </div>
            
          <button className="btn btn-success float-end" type="submit">Upload</button>
          <button className="btn btn-warning float-start" onClick={()=>navigate(`/user-images/${userObj.email}`)}>Images</button>
          </div>
          </div>
        </Form>
        </div>
        </div>
        </div>
        </div>
      </Formik>
    );
  };
  
    

  //export register
  export default AddImage;

  