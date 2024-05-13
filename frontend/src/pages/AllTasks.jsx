import React, { useState } from 'react';
import Cards from '../components/Home/Cards';
import { IoAddCircleOutline } from "react-icons/io5";
import InputData from '../components/Home/InputData';
import { useEffect } from 'react';
import axios from 'axios';


const AllTasks = () =>{
    const [updatedData, setUpdatedData] = useState({
        id:"",
        title:"",
        description:""
    });
    const[InputDiv, setInputDiv] = useState("hidden");

    const [Data, setData] = useState();
    const headers = {id: localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`}
    useEffect(()=> {
        const fetch = async () => {
            const response = await axios.get('http://localhost:1000/api/v2/get-all-task',
                {headers});
                setData(response.data.data)
        };

        fetch();
    }, [])
    
    return (
        <>
        <div>
            <div className='w-full flex justify-end px-4 py-2'>
                <button onClick={() => setInputDiv("fixed")}><IoAddCircleOutline className='text-3xl'/></button>
            </div>
            <div>{Data && (
            <Cards home={ "true" } setInputDiv={setInputDiv} data={Data.tasks} setUpdatedData={setUpdatedData}></Cards>)}</div>
        </div>
        <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} updatedData={updatedData} setUpdatedData={setUpdatedData}></InputData>
        </>
    );
};
export default AllTasks;