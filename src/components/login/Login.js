import { useState } from "react";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import  axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  
    const initialValues = {
      email: '',
      password: '',
    };
  
    const handleSubmit = (values) => {
      // Handle form submission
      console.log(values);
    };
  
    return (
        
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <div>
        <h2 className="text-center mb-3">Login Form</h2>
        <div className='card text-center shadow p-3 m-3'>
        <Form>
        
        <div className="row">
          <div className="col-12 col-sm-8 col-md-6 mx-auto">
            
            
            <div className="mb-3">
                <label htmlFor="email">Email:</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" />
            </div>
            <div></div>
            <div className="mb-3">
                <label htmlFor="password">Password:</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" />
            </div>
          <button className="btn btn-success me-5" type="submit">Login</button>
          </div>
          </div>
        </Form>
        </div>
        </div>
      </Formik>
    );
  };
  
    

  //export register
  export default Login;

  