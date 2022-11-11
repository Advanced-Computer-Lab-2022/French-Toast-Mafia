import AllCoursesInfo from "../Components/AllCoursesInfo";
import { useEffect,useState } from "react";


function CoursePricePage ({route, navigation})  {
    const {cost} = route.params;


    return (
        <div className='courses'>
            <h1>Course Price</h1>
          <h2>{JSON.stringify(cost)}</h2>
        

    </div>
    );
    }

    export default CoursePricePage;