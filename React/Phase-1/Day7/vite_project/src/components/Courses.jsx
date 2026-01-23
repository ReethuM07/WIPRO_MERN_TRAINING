import {useState} from "react";

export default function Courses(){

    const[getHeading , setHeading] = useState("Courses are here...");

    const[getCourse, setCourses] = useState([]);

    function handleHeadindChange()
    {
            setCourses(["AI Crash Course","Python in 10 days"])
    }

    return(
    <>
    <div className="border p-1">

        <h2 className = "text-blue-950 border-2 font-bold">{getHeading}</h2>
        <h1 className = "flex-wrap">{getCourse}</h1>
        
       <button onClick={handleHeadindChange} className="bg-amber-700 text-white px-2 py-1 rounded mt-3 cursor-pointer">Upcoming Courses</button>

    </div>

    </>);
}