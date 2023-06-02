import { useState } from "react";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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
            setErr(res.data.message)
            console.log("err state",err)
         }
      }
      catch(err){
        console.log(err)
        setErr("Failed to Register");
      }
      //clear form
      resetForm();
    };
  
    return (  
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <div>
        <h2 className="text-center mb-3">Registration Form</h2>
        <h5 className="text-danger text-center">{err}</h5>
        <div className='card text-center shadow p-3 m-3'>
        <Form>
        <div className="row">
          <div className="col-12 col-sm-8 col-md-6 mx-auto">
            <div className="mb-3">
                <label htmlFor="name">Name:</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" />
            </div>
            <div className="mb-3">
                <label htmlFor="email">Email:</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" />
            </div>
            <div className="mb-3">
                <label htmlFor="password">Password:</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" />
            </div>
          <button className="btn btn-success me-5" type="submit">Submit</button>
          </div>
          </div>
        </Form>
        </div>
        </div>
      </Formik>
    );
  };
  //export register
  export default Register;

  