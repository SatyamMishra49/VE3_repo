import React from "react";
import { CiHeart } from "react-icons/ci";
import { RiEditCircleLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import AllTasks from "../../pages/AllTasks";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

const Cards = ({home, setInputDiv, data, setUpdatedData}) => {
    const headers = {id: localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`}
    const handleCompleteTask = async(id) =>{
        try{
            await axios.put(
                `http://localhost:1000/api/v2/update-complete-task/${id}`,{}, {headers});
        }catch (error){
            console.log(error)
        }
    }
    const handleImportant = async(id) =>{
        try{
            await axios.put(
                `http://localhost:1000/api/v2/update-important-task/${id}`, {headers});
        }catch (error){
            console.log(error)
        }
    }
    const handleUpdate = (id,title,description) => {
        setInputDiv("fixed");
        setUpdatedData({id: id, title: title, description: description})
    }
    const deleteTasks = async(id) =>{
        try{
            await axios.delete(
                `http://localhost:1000/api/v2/delete-task/${id}`, {headers});
        }catch (error){
            console.log(error)
        }
    }
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {data && 
                data.map((items, i)=>(
                    <div className="bg-purple-500 rounded-md p-4">
                        <h3 className="text-xl font-semibold font-mono">{items.title}</h3>
                        <p className="">{items.desc}</p>
                        <div className="mt-4 w-full flex items-center">
                            <button className={` ${items.complete === 'Incomplete' ? "bg-rose-400" : "bg-lime-500"} px-2 py-1 rounded-full font-mono w-3/6` } onClick={() => handleCompleteTask(items._id)}>
                                {items.complete === true? "Complete": "Incomplete"}</button>
                            <div className="p-2 w-3/6 text-xl flex justify-around">
                                <button onClick={()=>handleImportant(items._id)}>{items.important === false ? (<FaRegHeart />) : (<FaHeart className="text-red-500"/>)}</button>
                                <button onClick={()=>handleUpdate(items._id,items.title,items.description)}><RiEditCircleLine /></button>
                                <button onClick={()=>deleteTasks(items._id)}><AiOutlineDelete /></button>
                            </div>
                        </div>
                    </div>
                ))}
                {home==='true' && (
                <button className="flex flex-col justify-center items-center bg-purple-500 rounded-md p-4" onClick={() => setInputDiv('fixed')}>
                    <IoAddCircleOutline className="text-5xl"/>
                    <h2 className="text-xl mt-4 font-mono">Add Tasks</h2>
                </button>
                )}
        </div>
    )
}
export default Cards;