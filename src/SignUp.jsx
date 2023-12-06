
import React from 'react';
import { useState } from 'react';
import style from "./SignUp.module.css";
import { Link,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createUser } from './ducks/SignUp.duck';


export default function SignUp() {
const navigate = useNavigate();
const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
     console.log("values", userName, email, password, confirmPassword);
    const submit = () => {
        if (password == confirmPassword)
        {
         const data ={
            username : userName,
            email : email,
            password : password,
            confirmPassword : confirmPassword
         }
         dispatch(createUser(data))
         .then((e)=>{
            console.log("e",e);
            if(e === "Email Id already exist"){
            alert("Email Id already exist")
            }
            else{
                alert("successfully sign up please login your account")
                navigate("/")
            }
          })
        }
        else{
            alert("password and confirm password should be same");
        }
    }
    //const value = useSelector(state => state.auth);

    return (
        <div className={style.SignUp}>
            <Link to="/">&#8592; Back</Link>
            <h2>sign up</h2>
            <div >
                <label>User name :
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </label>
            </div>
            <div>
                <label>Email :
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
            </div>
            <div>
                <label>Password :
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>
            <div>
                <label>Confirm password :
                    <input type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
            </div>
            <input type="submit" onClick={submit} />
        </div>
        
    );
};


