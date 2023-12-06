import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Formik, Field, Form } from "formik";
//material UI dependencies
import { Button } from "react-bootstrap";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { colors, makeStyles } from "@mui/material";
import { createUser, deleteUser, fetchOneUser, fetchUser, updateUser } from "../ducks/Users.duck";



export default function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { value } = useSelector(state => state.auth);
  const { allUsers, oneUser } = useSelector(state => state.Users);
  console.log("allusers", allUsers);
  console.log("oneuser", oneUser);

  console.log("valueauth", value);
  const [dbData, setDBData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [oneUse, setOneUse] = useState(false);

  console.log("user", userDetails);
  const [images, setImages] = useState("");
  console.log("images", images);

  const [id, setId] = useState();
  console.log("id", id);

  //Get method (read data from API)
  // const users = async () => {
  //   const response = await fetch('http://localhost:4545/demo', { //here only declare the database name and this is the endpoint
  //     method: 'GET',
  //   })
  //   const val = await response.json();
  //   setDBData(val);
  //   console.log("dashboard", val);
  // }

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  const viewDetails = (id) => {
    navigate(`/userdetails/${id}`)
    console.log("clicked", id);
  }

  const trash = (id) => {
    console.log("deleted", id);
    setOpen(true);
    setId(id);
  }

  const edit = async (Id) => {
    setId(Id);

    setEditOpen(true)
    dispatch(fetchOneUser(Id))
      .then(() => {
        setOneUse(true);
      })

    // const response = await fetch(`http://localhost:4545/demo/${id}`, { //here only declare the database name and this is the endpoint
    //   method: 'GET',
    // })
    // const val = await response.json();
    // setUserDetails(val);
    // setImages(val.photo)
    // console.log("userdetails", val);
    // console.log("edited", id);
  }

  const handleClose = () => {


    setUserDetails("");
    setImages("");
    setId("");
    setOneUse(false);
    setOpen(false);
    setEditOpen(false);
  }


  const handleDelete = async () => {
    // const response = await fetch(`http://localhost:4545/demo/${id}`, { //here only declare the database name and this is the endpoint
    //   method: 'DELETE',
    // })
    // const val = await response.json();

    // console.log("val", val);
    dispatch(deleteUser(id))
      .then(() => {
        setOpen(false);
        dispatch(fetchUser());
        // users();
      })
  }

  const newInitialValues = {
    firstname: oneUser?.firstname,
    lastname: oneUser?.lastname,
    email: oneUser?.email,
    phone: oneUser?.phone,
  };

  useEffect(() => {
    setImages(oneUser?.photo)
  }, [oneUser])

  const handleSubmit = async (values) => {

    const data = {
      firstname: values?.firstname,
      lastname: values?.lastname,
      email: values?.email,
      phone: values?.phone,
      photo: images

    }
    console.log("datasubmit", data);
    dispatch(updateUser(data, id))
      .then(() => {
        dispatch(fetchUser());
        handleClose();

      })
    //PUT method (Update data to API)
    // const response = await fetch(`http://localhost:4545/demo/${id}`, { //here only declare the database name and this is the endpoint
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    //   headers: { 'Content-Type': 'application/json' }
    // })

    // const val = await response.json();
    // console.log("response", val);
    // setEditOpen(false);
    // //users()
    // setUserDetails("");

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

  const inputReader = React.createRef(); // Creating a ref for input element
  const uploadImage = () => {
    // Trigger the hidden input field to open file dialog
    inputReader.current.click();
  }

  const defaultimage = "https://as2.ftcdn.net/v2/jpg/02/83/72/41/1000_F_283724163_kIWm6DfeFN0zhm8Pc0xelROcxxbAiEFI.jpg"
  const altimage = "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
  return (<>


    {allUsers?.length > 0 && allUsers?.map((data, index) => (
      <div key={index}>
        {/* Render your card or content here */}
        {index === allUsers.length - 1 && (<>       {/* To access a last data of the array */}
          <div className={style.Dashboard}>
            <img
              // onClick={uploadImage}
              src={data.photo || defaultimage}
              style={{
                display: 'inline-block',
                height: 150,
                width: 150,
                borderRadius: '50%',
                border: '1px solid black',
                objectFit: 'cover',
              }}
            //alt="Photo"
            />
          </div>
          <h4 className={style.head}>welcome</h4>

          <h4 className={style.head1}> {data.firstname} {data.lastname}</h4>
        </>)}
      </div>
    ))}




    <h4 style={{ marginLeft: '90px' }}>Thank you for joining with us</h4>


    <div className={style.gridcontainer}>
      {allUsers?.length > 0 &&
        allUsers.slice().reverse().map((data, index) => (

          <div className={style.griditem} key={index}>
            <div className={style.card}>
              <div >

                <button className={style.edit} onClick={() => edit(data._id)}>
                  <FaEdit />
                </button>
                <span>
                  <button className={style.delete} onClick={() => trash(data._id)}>
                    <FaTrash />
                  </button></span>

                <img
                  onClick={() => viewDetails(data._id)}
                  src={data.photo || defaultimage}
                  style={{
                    marginLeft: "10px",
                    display: 'inline-block',
                    height: 150,
                    width: 150,
                    borderRadius: '50%',
                    border: '1px solid black',
                    objectFit: 'cover',
                  }}
                  alt="Photo"
                />
                <h5>Name : {data.firstname} {data.lastname}</h5>
                <p >phone : {data.phone}</p>
                <p>email : {data.email}</p>
              </div>
            </div>
          </div>
        ))}
    </div>

    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"

    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete your account?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button variant="danger" onClick={handleDelete} autoFocus>
          Agree
        </Button>
      </DialogActions>

    </Dialog>


    {oneUse == true && (
      <Dialog
        open={editOpen}
        onClose={handleClose}

        PaperProps={{
          style: {

            overflow: 'hidden',
          },
        }}
      >
        <div className={style.MyProfile}>
          <Formik
            initialValues={newInitialValues}
            // validationSchema={loginvalidation}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => {
              return (
                <div className={style.form}>
                  <Form>

                    <div>
                      <label>First Name </label>
                      <Field
                        name="firstname"
                        type="text"
                        // className={`form-control-d`}
                        // placeholder="yourmailid@gmail.com"
                        autoComplete="off"
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
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <input

                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={inputReader}
                        onChange={
                          handlechange
                        }
                      />
                      <img
                        onClick={uploadImage}
                        value={images}
                        src={images}
                        style={{
                          display: 'inline-block',
                          height: 150,
                          width: 150,
                          borderRadius: '50%',
                          border: '1px solid black',
                          objectFit: 'cover',
                        }}
                        alt="Photo"
                      />
                      <h6 style={{ marginTop: "10px" }} onClick={uploadImage}>Upload Profile Image</h6>
                    </div>
                    <Button style={{ marginTop: "5px" }} type="submit">update</Button>

                  </Form>
                </div>
              );
            }}
          </Formik>
          <div>

          </div>
        </div>

      </Dialog>

    )
    }

  </>);


}