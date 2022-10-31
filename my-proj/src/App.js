import {useState} from 'react'
//import Header from './componentss/Header';
import React from 'react';
//import NewAdmin from './componentss/NewAdmin';
import Add from './componentss/Add'
import Home from './componentss/Home'
import Add1 from './componentss/Add1'
import Add2 from './componentss/Add2'
import SignUp from './componentss/SignUp'
import { Routes, Route } from "react-router-dom"
import { Router,Link  } from "react-router-dom";



 

function App() {

  const newAdmin = (admin) => {
    console.log(admin);

  }


  return (
    <React.Fragment>
      <SignUp>
        <SignUp/>
      </SignUp>
      <main>
        <Routes>
          <Route path="/addadmin" element={ <Add2/>} />
          <Route path="/addinstr" element={ <Add/>} />
          <Route path="/adduser" element={ <Add1/>} />



        </Routes>
      </main>




    </React.Fragment>



  )
    

  
    





    
       







    





    
    
    

    







  
  
    
  
}

export default App