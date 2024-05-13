import { FaNoteSticky } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaAccusoft } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { MdOutlineAddTask } from "react-icons/md";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoIosApps } from "react-icons/io";
import { GoStack } from "react-icons/go";
import { MdDataObject } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";


const Sidebar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const data = [
        {
            title: "My Tasks",
            icon: <MdDataObject />,
            link: "/"
        },
        {
            title: "Important Tasks",
            icon: <MdLabelImportant />,
            link: "/importantTasks",
        },
        {
            title: "Completed Tasks",
            icon: <IoCheckmarkDoneCircle />,
            link: "/completedTasks",
        },
        {
            title: "Incompleted Tasks",
            icon: <TiArrowBack />,
            link: "/incompletedTasks",
        },
    ]
    const [Data, setData] = useState();
    const logout = () =>{
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        history("/signup");
    }
    const headers = {id: localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`}
    useEffect(()=> {
        const fetch = async () => {
            const response = await axios.get('http://localhost:1000/api/v2/get-all-tasks',
                {headers});
            setData(response.data.data)
        };

        fetch();
    }, [])

    return (
        <>
        <div>
            <h1 className="text-3xl font-mono font-extrabold">TaskSyncer</h1>
            <h1 className="text-4xl flex flex-row justify-center"><GoStack className="text-5xl"/></h1>
            <h4 className="my-1 text-gray-400 text-center"></h4>
            <hr />
        </div>
        <div>
            {data.map((items, i) => (
                <Link to={items.link} key={i} className="my-2 flex items-center font-serif hover:bg-gray-500 p-2 rounded-full tansition-all duration-300">
                {items.icon}&nbsp; {items.title}
                </Link>
            ))}
        </div>
        <div><button className="w-full bg-white hover:bg-gray-200 text-black font-mono font-bold py-2 px-4 rounded-full" onClick={logout}>Log Out</button></div>
    </>
    );
};

export default Sidebar;