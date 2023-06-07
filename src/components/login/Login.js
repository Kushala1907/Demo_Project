import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import {userLogin} from '../../slices/loginslice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from "react-router-dom";

function Login() {
    //get userState from redux store using useSelector hook
    let {userObj,status,errorMessage}=useSelector(state=>state.login)
    //decalre useNavigate method
    let navigate=useNavigate()
    //declare dispatch method
    let dispatch=useDispatch()

    //useEffect
    useEffect(()=>{
      //if login success
      if(status==="success"){
        //if user is super admin  
        navigate(`/add-image/${userObj.email}`)  
      }
      //if login failed 
      else{
        //if login fails naviagte login agian
        navigate('/login')
      }
    },[status])
    const initialValues = {
      email: '',
      password: '',
    };  
    const handleSubmit = async(user, { resetForm }) => {
      // Handle form submission
      console.log("user after submit",user);  
      dispatch(userLogin(user))
      
    };
  
    return (
        
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <div className="container">
        <div className=" row justify-content-md-center">
        <h2 className="text-center mb-3">Login Form</h2>
        <div className="col-sm-8 col-lg-6">
        <div className='card shadow p-3 m-3 text-center'>
        <Form>
          <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <Field type="email" id="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" />
            </div>
            <div></div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <Field type="password" id="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" />
            </div>
          <button className="btn btn-success float-end" type="submit">Login</button>
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
  export default Login;

  