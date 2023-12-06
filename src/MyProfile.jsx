import React from "react";
import { Formik, Field, Form } from "formik";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import style from "./MyProfile.module.css";
import { localValue } from "./ducks/Auth.duck";
import { useNavigate } from "react-router-dom";
import { createUser } from "./ducks/Users.duck";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",

};

export default function MyProfile() {

  const [images, setImages] = useState("");
  console.log("values", images);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passHiden, setPassHiden] = useState(true);
  const toggleShowPass = () => {
    setPassHiden(!passHiden);
  };

  const auth = useSelector(state => state.auth);
  
  // const firstNames = value.map(item => item.firstname);
  console.log("auth", auth);


  //Get method (read data from API)
  const users = async () => {
    const response = await fetch('http://localhost:4546/demo', { //here only declare the database name and this is the endpoint
      method: 'GET',
    })
    const val = await response.json();
    console.log("datastore", val);
  }

  useEffect(() => {
    users();
  }, [])

  const handleSubmit = async (values) => {

    const data = {
      firstname: values?.firstname,
      lastname: values?.lastname,
      email: values?.email,
      phone: values?.phone,
      photo: images
    }
dispatch(createUser(data))
.then(() => {
  navigate("/dashboard");
})
    //post method (send data to API)
    // const response = await fetch('http://localhost:4545/demo', { //here only declare the database name and this is the endpoint
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: { 'Content-Type': 'application/json' }
    // })

    // const val = await response.json();
    // console.log("response", val);

    //we will directly dispatch and navigate without async await function 
    // try {

    //   console.log("vall", data);
    //   await dispatch(localValue(data)); // Assuming localValue is an async action creator
    //   navigate("/dashboard");
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };
  const handlechange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (upload) => {
        setImages(
          upload.target.result
          //  ...images,
          //photo: upload.target.result, // Set the data URL of the selected image
        );
      };

      reader.readAsDataURL(selectedFile);
    }
  }

  const altimage = "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
  const inputReader = React.createRef(); // Creating a ref for input element
  const uploadImage = () => {
    // Trigger the hidden input field to open file dialog
    inputReader.current.click();
  }

  return (
    <div className={style.MyProfile}>
      <Formik
        initialValues={initialValues}
        // validationSchema={loginvalidation}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>

              <div>
                <label>First Name </label>
                <Field
                  name="firstname"
                  type="text"
                  // className={`form-control-d`}
                  // placeholder="yourmailid@gmail.com"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label>Last Name </label>
                <Field
                  name="lastname"
                  type="text"
                  // className={`form-control-d`}
                  // placeholder="yourmailid@gmail.com"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label>Email Address </label>
                <Field
                  name="email"
                  type="text"
                  // className={`form-control-d`}
                  // placeholder="yourmailid@gmail.com"
                  autoComplete="off"
                  required
                />
              </div>
              {console.log("values", values)}
              <div>
                <label>Phone number </label>
                <Field
                  name="phone"
                  type="text"
                  // className={`form-control-d`}
                  // placeholder="yourmailid@gmail.com"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <input

                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={inputReader}
               
                  onChange={
                    // Handle selected file if needed
                    //console.log('Selected file:',e.target.files[0]);
                    // setFieldValue("photo", e.target.files[0])
                    handlechange
                  }
                />
                <img
                  onClick={uploadImage}
                  src={images ? images : altimage}
                  style={{
                    marginTop: "10px", display: 'inline-block',
                    height: 150,
                    width: 150,
                    borderRadius: '50%',
                    border: '1px solid black',
                    objectFit: 'cover',
                  }}
                  alt="Photo"
                />
                <h6 style={{ marginTop: "10px" }}>Upload Profile Image</h6>
              </div>
              {/* <div>
          <label>Password </label>
          <div className="pRelative">
            <Field
              name="password"
              type={passHiden ? "password" : "text"}
              // className={`form-control-d`}
              autoComplete="off"
              placeholder="*****"
            />
            <span
              className={passHiden ? "eye-view" : "eye-view open"}
              onClick={toggleShowPass}
            ></span>
           
          </div>
        </div> */}

              <Button type="submit">Sign In</Button>
            </Form>
          );
        }}
      </Formik>
      <div>
        {/* {firstNames.map((name, index) => (
      console.log("index",index),
      <p key={index}>{name}</p>
    ))} */}
        {/* <p>{auth.value.firstname}</p> */}
      </div>
    </div>
  );

}