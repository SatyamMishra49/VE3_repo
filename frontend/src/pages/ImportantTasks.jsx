import React, { useState } from 'react';
import Cards from '../components/Home/Cards';
import axios from 'axios';
import { useEffect } from 'react';

const ImportantTasks = () =>{
    const [Data,setData] = useState();
    const headers = {id: localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`}
    useEffect(()=> {
        const fetch = async () => {
            const response = await axios.get('http://localhost:1000/api/v2/get-important-task',
                {headers});
                setData(response.data.data)
        };

        fetch();
    }, [])
    return (
        <div><Cards home="false" data={Data}></Cards></div>
    );
};
export default ImportantTasks;