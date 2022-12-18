import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import { Button } from '@mui/material';
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Card } from '@mui/material';
import { deepPurple, lightGreen } from "@mui/material/colors";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from "react-bootstrap/Modal";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  UncontrolledAlert,
  CardBody,
  CardTitle,
} from "reactstrap";




 const CreditCardss = () => {

  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
  };


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDone = () => navigate("/home");


  const navigate = useNavigate();


  const [CardNumber, setNumber] = useState('');

  const [CardName, setName] = useState('');

  const [CardCvc, setCvc] = useState('');

  const [CardExpiry, setExpiry] = useState('');

  const [focus, setFocus] = useState('');

  const[err , setErr] = useState(false);

  const[done , setDone] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if(CardNumber.length==0 || CardName.length==0 || CardCvc.length==0 || CardExpiry.length==0){
      setErr(true);
    }

    const card = { CardName, CardNumber , CardExpiry , CardCvc }
    const response = await fetch('http://localhost:5000/Card/addCard' , {
        method : 'POST' ,
        body : JSON.stringify(card) , 
        headers : {
            'Content-Type' : 'application/json'
        }
    }) 

    const json = await response.json(card)

    if(!response.ok){
        setErr(json.err)
           

    }
    if(response.ok){
        setName('')
        setNumber('')
        setExpiry('')
        setCvc('')


        setErr(false)
          console.log('new card added', json)
          setDone(true);

      
       


    }
   
}

return (
  <>
    <Button
          onClick={handleShow}
          halfWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
    >
          Pay
        </Button> 
  

  <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Payment Form</Modal.Title>
  </Modal.Header>
  <Modal.Body>
   


<Card className="final-results"  >

<h2 className="text-center" > </h2>

<div clasName="rccs__card rccs__card--unknown">
  <Cards
    cvc={CardCvc}

    expiry={CardExpiry}

    focused={focus}

    name={CardName}

    number={CardNumber}

  />
</div>
<br />
<form  onSubmit={ handleSubmit}   >
  <div className="row">
    <div className="col-sm-11">
      <label for="name">Card Number</label>
      <input
        type="text"
        className="form-control"
        value={CardNumber}
        name="CardNumber"
        onChange={(e) => {
          setNumber(e.target.value);
        }}
        onFocus={(e) => setFocus(e.target.name)}
        
      ></input>
      

    </div>
    
  </div>
   {err&&CardNumber.length<=0?
        <Alert color="warning"> Card Number can't be empty! </Alert>:""}

  <br />
  
  <div className="row">
    <div className="col-sm-11">
      <label for="name">Card Name</label>
      <input
        type="text"
        className="form-control"
        value={CardName}
        name="CardName"
        onChange={(e) => {
          setName(e.target.value);
        }}
        onFocus={(e) => setFocus(e.target.name)}
      ></input>
    </div>
  </div>

  {err&&CardName.length<=0?
        <Alert color="warning"> Card Name can't be empty! </Alert>:""}

  <br />
  <div className="row">
    <div className="col-sm-6">
      <label for="name">Expiration Date</label>
      <input
        type="text"
        name="expiry"
        className="form-control"
        value={CardExpiry}
        onChange={(e) => {
          setExpiry(e.target.value);
        }}
        onFocus={(e) => setFocus(e.target.name)}
      ></input>
    </div>
    {err&&CardExpiry.length<=0?
        <Alert color="warning"> Expiry date can't be empty! </Alert>:""}

      <div className="col-sm-5">
      <label for="name">CVV</label>
      <input
        type="tel"
        name="cvc"
        className="card"
        value={CardCvc}
        
        onChange={(e) => {
          setCvc(e.target.value);
  
        }}
        onFocus={(e) => setFocus(e.target.name)}
      ></input>
        {err&&CardCvc.length<=0?
        <Alert color="warning"> Card CVC can't be empty! </Alert>:""}
  
    </div>
    
   
  </div>


</form>

</Card>

 </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose} >
      Close
    </Button>

    <Button variant="primary"  type='submit' onClick={handleSubmit}>
      Confirm Payment
    </Button>

    
    {done?
        <Alert color="warning"> Card is Added Successfully! 
        <Button variant="primary"  type='submit' onClick={handleDone}>
      Done
    </Button>
    </Alert>:""}


  </Modal.Footer> 
   </Modal>

  
  </>
  
);

}





export default CreditCardss;


