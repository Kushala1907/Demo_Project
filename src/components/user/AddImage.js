import { useState } from "react";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import  axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  
    const initialValues = {
      email: '',
      day:'',
      image_url: '',
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
        <h2 className="text-center mb-3">Add Image</h2>
        <div className='card text-center shadow p-3 m-3'>
        <Form>
        
        <div className="row">
          <div className="col-12 col-sm-8 col-md-6 mx-auto">
            
            <div className="mb-3">
                <label htmlFor="day">Day:</label>
                <Field as="select" id="day" name="day">
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
                <label htmlFor="imageurl">Image_url:</label>
                <Field type="text" id="imageurl" name="imageurl" />
                <ErrorMessage name="imageurl" component="div" />
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

  