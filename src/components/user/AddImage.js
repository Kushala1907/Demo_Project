import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AddImage() {
  // User state from store
  const { userObj } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [file, setfile] = useState({ preview: '', data: '' });
    
  const [err, setErr] = useState("");
  const token = sessionStorage.getItem("token");

  // Initialize react-hook-form
  const { register,handleSubmit,formState: { errors },} = useForm();

  const handleFileChange = (e) => {
    console.log("e=>",e.target.files[0])
    const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
    };
    setfile(img);
  };
  const onSubmit = async (data) => {
    console.log(data)
    data.email = userObj.email;
    data.image_url=file.data
    console.log(data)
    try {
      const res = await axios.post(`${process.env.REACT_APP_PATH}/user-api/add-image/${userObj.email}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.message === "Image uploaded and email sent") {
        setErr(res.data.message);
      } else {
        if (res.data.error.details) {
          setErr(res.data.error.details[0].message);
        } else {
          setErr(res.data.error);
        }
      }
    } catch (err) {
      setErr("Failed to Upload");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <h2 className="text-center mb-3">Add Image</h2>
        <h5 className="text-primary text-center">{err}</h5>
        <div className="col-sm-8 col-lg-6">
          <div className="card shadow p-3 m-3">
            <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
              <div className="row justify-content-center">
                <div className="col-sm-8">
                  <div className="mb-3">
                    <label htmlFor="day" className="form-label">
                      Day:
                    </label>
                    <select
                      id="day"
                      name="day"
                      className="form-control"
                      {...register("day", { required: true })}
                    >
                      <option value="">Select a day</option>
                      <option value="monday">MONDAY</option>
                      <option value="tuesday">TUESDAY</option>
                      <option value="wednesday">WEDNESDAY</option>
                      <option value="thursday">THURSDAY</option>
                      <option value="friday">FRIDAY</option>
                      <option value="saturday">SATURDAY</option>
                      <option value="sunday">SUNDAY</option>
                    </select>
                    {errors.day && (
                      <div className="text-danger">This field is required</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image_url" className="form-label">
                      Image_url:
                    </label>
                    <input
                        class='form-control'
                        type='file'
                        name='image_url'
                        onChange={handleFileChange}
                    ></input>
                    {errors.image_url && (
                      <div className="text-danger">This field is required</div>
                    )}
                  </div>
                  <button className="btn btn-success float-end" type="submit">
                    Upload
                  </button>
                  <button
                    className="btn btn-warning float-start"
                    onClick={() => navigate(`/user-images/${userObj.email}`)}
                  >
                    Images
                  </button>
                  </div>
                  </div>
               </form>
               </div>
               </div>
               </div>
               </div>
  )}
  export default AddImage;