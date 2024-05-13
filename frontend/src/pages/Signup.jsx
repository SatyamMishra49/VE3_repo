import React from "react";
import { CgPassword } from "react-icons/cg";
import { LiaSignInAltSolid } from "react-icons/lia";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Signup = () =>{
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const navigate = useNavigate();
    if(isLoggedIn === true){
        navigate("/");
    }
    const [Data, setData] = useState({username:"", email:"", password:""});
    const history = useNavigate();
    const change = (e) =>{
        const { name, value } = e.target;
        setData({...Data, [name]: value});
    }
    const submit = async() => {
        try{
            if(Data.username==="" || Data.email==="" || Data.password===""){
                alert("all fields are required");
            }else{
                const response = await axios.post("http://localhost:1000/api/v1/sign-in", Data);
                setData({username:"", email:"", password:""})
                alert(response.data.message);
                history("/login");
            }
        }catch (error){
            alert(error.response.data.message)
        }
    }


    return (
        <>
        <div className="h-[98vh] flex items-center justify-center">
            <div className="p-4 w-2/6 rounded bg-indigo-500">
                <div className="flex text-center px-3 py-2 text-3xl font-mono">SignUp</div>
                <input 
                type="username" 
                placeholder="username" 
                className="bg-purple-200 px-3 py-2 my-3 w-full rounded-full" 
                name="username"
                value={Data.username}
                onChange={change}></input>
                <input 
                type="email" 
                placeholder="email" 
                className="bg-purple-200 px-3 py-2 my-3 w-full rounded-full" 
                name="email"
                value={Data.email}
                required
                onChange={change}></input>
                <input 
                type="password" 
                placeholder="password" 
                className="bg-purple-200 px-3 py-2 my-3 w-full rounded-full" 
                name="password"
                value={Data.password}
                onChange={change}></input>
                <button className="bg-rose-600 font-mono px-3 py-2 my-3 rounded-full" onClick={submit}>SignUp</button>
            </div>
        </div>
        </>
    )
}
export default Signup;