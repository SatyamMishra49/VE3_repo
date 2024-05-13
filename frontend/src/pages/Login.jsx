import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Login = () => {
    const [Data, setData] = useState({username:"", password:""});
    const history = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    if(isLoggedIn === true){
        history("/");
      }
    const change = (e) =>{
        const { name, value } = e.target;
        setData({...Data, [name]: value});
    }
    const submit = async() => {
        try{
            if(Data.username===""|| Data.password===""){
                alert("all fields are required")
            }else{
                const response = await axios.post("http://localhost:1000/api/v1/log-in", Data);
                // console.log(response);
                setData({username:"", password:""})
                localStorage.setItem("id",response.data.id);
                localStorage.setItem("token",response.data.token);
                dispatch(authActions.login);
                history("/");
                
            }
        }catch (error){
            alert(error.response.data.message)
        }
    }

    return (
        <>
        <div className="h-[98vh] flex items-center justify-center">
            <div className="p-4 w-2/6 rounded bg-indigo-500">
                <div className="flex text-center px-3 py-2 text-3xl font-mono">Login</div>
                <input 
                type="username" 
                placeholder="username" 
                className="bg-purple-200 px-3 py-2 my-3 w-full rounded-full" 
                name="username"
                value={Data.username}
                onChange={change}></input>
                <input 
                type="password" 
                placeholder="password" 
                className="bg-purple-200 px-3 py-2 my-3 w-full rounded-full" 
                name="password"
                value={Data.password}
                onChange={change}></input>
                <div className="w-full flex items-center justify-between">
                    <button className="bg-lime-700 font-mono px-3 py-2 my-3 rounded-full" onClick={submit}>Login</button>
                    <Link to="/signup">Create an account..signup here</Link>
                </div>
            </div>
        </div>
        </>
    )
};
export default Login;
