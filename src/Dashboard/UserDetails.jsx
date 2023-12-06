import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import style from "./UserDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneUser } from "../ducks/Users.duck";


export function UserDetails(){
  const dispatch = useDispatch();
const {id} = useParams();
const [userDetails,setUserDetails] = useState();

const {oneUser} = useSelector(state=>state.Users);

useEffect(()=>{
  //users();
  },[])

useEffect(()=>{
dispatch(fetchOneUser(id));
},[])
console.log("userDetails",userDetails);

//Get method (read data from API)
// const users =async()=>{
//     const response = await fetch(`http://localhost:4545/demo/${id}`,{ //here only declare the database name and this is the endpoint
//     method : 'GET',
//   })
//   const val = await response.json();
//   setUserDetails(val);
//   console.log("val",val);
//   }

  if (!oneUser) {
    // If userDetails is undefined (initial state), return a loading indicator or null
    return <div>Loading...</div>; // You can also return null or a loader component
  }

  const defaultimage ="https://as2.ftcdn.net/v2/jpg/02/83/72/41/1000_F_283724163_kIWm6DfeFN0zhm8Pc0xelROcxxbAiEFI.jpg"
 
return(
  <div className={"container" }>
  <div className="row">
    <div className="col-4"></div>
    <div className="col-4">
       <div className={style.userdetails}>
    <img
                
                  src={oneUser.photo || defaultimage}
                  style={{
                    marginLeft:"10px",
                    display: 'inline-block',
                    height: 150,
                    width: 150,
                    borderRadius: '50%',
                    border: '1px solid black',
                    objectFit: 'cover',
                  }}
                  alt="Photo"
                /><br/>
            <label>firstname :{oneUser.firstname}</label><br/>
           <label> lastname :{oneUser.lastname}</label><br/>
           <label> phone :{oneUser.phone}</label><br/>
           <label> email :{oneUser.email}</label>

           </div>
        </div>
        <div className="col-4"></div>
        </div>
        </div>
    );
}
