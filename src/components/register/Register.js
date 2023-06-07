import { useState } from "react";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import  axios from "axios";
import { useNavigate } from 'react-router-dom';


function Register() {
    //const history = useHistory();
    let navigate=useNavigate()
    //taking state for error
     let [err,setErr]=useState("")
    //initialze values
    const initialValues = {
      name: '',
      email: '',
      password: '',
    }; 
    const handleSubmit = async(user, { resetForm }) => {
      // Handle form submission
      console.log("user after submit",user);  
      try{
        //post request to create new employee
        let res=await axios.post("http://localhost:2222/user-api/register-user",user);
        console.log("response",res) 
        //if registered successfully
        if(res.data.message==="User registered successfully"){
            setErr("");
            navigate('/login');
        }
        //if not registerd
        else{           
            //set err message

            if(res.data.error.details)
            { setErr(res.data.error.details[0].message) }
            else{
              setErr(res.data.error);
            }
            
            console.log("err state",err)
         }
      }
      catch(err){
        //console.log(err)
        setErr(err.message);
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
        <h2 className="text-center mb-3">Registration Form</h2>
        <div className="col-sm-8 col-lg-6">
        <h5 className="text-danger text-center">{err}</h5>
        <div className='card text-center shadow p-3 m-3'>
        <Form>
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <Field type="text" id="name" name="name" className="form-control" />
                <ErrorMessage name="name" component="div" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <Field type="email" id="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <Field type="password" id="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" />
            </div>
          <button className="btn btn-success float-end" type="submit">Submit</button>
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
  export default Register;

  