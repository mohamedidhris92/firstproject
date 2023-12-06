import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./LoginPage.module.css"
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./ducks/SignUp.duck";
import { useNavigate } from "react-router-dom";


export default function Home() {
      const navigate = useNavigate();
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    console.log("user and pass", email, password);

    const handlesubmit = async() => {
        const data = {
            email : email,
            password:password,
        }
        dispatch(loginUser(data)).then((e)=>{
            if(e === "success"){
                localStorage.setItem('isAuthenticated',true)
                navigate("/dashboard")
            }
            if(e === "no record found"){
                alert("Invalid User")
            }
            if(e === "the password is incorrect"){
                alert("Invalid password")
            }

        })
        // const response = await dispatch(loginUser(data));
        // console.log("dataof", response);
    }


    return (<>
        <div className={style.loginForm}>
            <div >
                <label>Enter your Email Id :
                    <input type="text"  value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
            </div>
            <div>
                <label>Enter your password :
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>
            <input type="submit" onClick={handlesubmit} />
            <Link to="/signup">SignUp</Link>
        </div>

    </>)

}