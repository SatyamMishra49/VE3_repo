import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import ImportantTasks from "./pages/ImportantTasks";
import IncompletedTasks from "./pages/IncompletedTasks";
import CompletedTasks from "./pages/CompletedTasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import auth, { authActions } from "./store/auth";

const App = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }
    if(isLoggedIn === false){
      navigate("/signup");
    }
  }, [isLoggedIn]);

  return (
  <div className="bg-violet-300 text-black h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path="/importantTasks" element={<ImportantTasks />} />
          <Route path="/completedTasks" element={<CompletedTasks />} />
          <Route path="/incompletedTasks" element={<IncompletedTasks />} />
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
  </div>
  );
};
export default App;
