import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
const InputData = ({InputDiv, setInputDiv, updatedData, setUpdatedData}) => {
    const [Data, setData] = useState({title:"", description:""});
    useEffect(()=>{
        setData({title: updatedData.title, description: updatedData.description})
    },[updatedData])
    const headers = {id: localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`}
    const change = (e) => {
        const {name, value} = e.target;
        setData({...Data, [name]:value})
    }
    const submitData = async() =>{
        if (Data.title==="" || Data.description===""){
            alert("all fields are required");
        }else{
            await axios.post("http://localhost:1000/api/v2/create-task", Data, { headers })
            setData({title:"",description:""});
            
        }
        setInputDiv("hidden");
        
        
    }
    const updateTask = async() =>{
        if (Data.title==="" || Data.description===""){
            alert("all fields are required");
        }else{
            await axios.put(`http://localhost:1000/api/v2/update-task/${updatedData.id}`, Data, { headers })
        }
        setUpdatedData({
            id: "",
            title: "",
            description: "",
        });
        setData({title:"",description:""});
        setInputDiv("hidden")
    }
    return (
        <>
        <div className={` ${InputDiv} top-0 left-0 bg-fuchsia-400 opacity-50 h-screen w-full`}></div>
        <div className={` ${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
            <div className="w-3/6 bg-fuchsia-300 p-4 h-[90vh] rounded">
                <div className="flex justify-end"><button onClick={() => {
                    setInputDiv("hidden");
                    setData({
                        title: "",
                        description: "",
                    });
                    setUpdatedData({
                        id: "",
                        title: "",
                        description: "",
                    })}}><AiOutlineCloseCircle /></button></div>
                <input type="text" placeholder="Title" name="title" className="px-3 py-2 rounded-md w-full my-3" value={Data.title} onChange={change}></input>
                <textarea name="description" cols='30' rows='12' placeholder="description" className="px-3 py-2 rounded-md w-full my-3" value={Data.description} onChange={change}></textarea>
                {setUpdatedData.id === "" ? (<button className="px-3 py-2 bg-purple-600 rounded-full font-mono" onClick={submitData}>Submit</button>) : (<button className="px-3 py-2 bg-purple-600 rounded-full font-mono" onClick={updateTask}>Update</button>)}
                
            </div>
        </div>
        </>
    )
};

export default InputData;