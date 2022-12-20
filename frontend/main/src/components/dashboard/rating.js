import {
    Form,
    FormGroup,
    Input,
    Col,
    CardText,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Label
  } from "reactstrap";

import {useState, useEffect} from 'react';

const Rating = ({setRating}) => {

const handleClick = (e) => {
    return(setRating(e.target.id))
    
  };
  return (
    <header>
        <div className="input-group mb-3" style={{ display: "flex", justifyContent: 'flex-start'}}>
        <FormGroup check>
            <Input id="All" name="radio1" type="radio" onClick={handleClick}/>{" "}
            <Label check>
            All
            </Label>
        </FormGroup>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FormGroup check>
            <Input id ="1" name="radio1" type="radio" onClick={handleClick}/>{" "}
            <Label check>
            <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i> & up
            </Label>
        </FormGroup>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FormGroup check>            
            <Input id = "2" name="radio1" type="radio" onClick={handleClick}/>{" "}
            <Label check>
            <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i><i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i> & up
            </Label>
        </FormGroup>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FormGroup check>
            <Input id="3" name="radio1" type="radio" onClick={handleClick}/>{" "}
            <Label check>
            <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i><i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i><i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i> & up
            </Label>
        </FormGroup>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FormGroup check>            
            <Input id="4" name="radio1" type="radio" onClick={handleClick}/>{" "}
            <Label check>
            <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i><i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i><i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i><i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i> & up
            </Label>
        </FormGroup>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FormGroup check>            
            <Input id="5" name="radio1" type="radio" onClick={handleClick}/>{" "}
            <Label check>
            <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i><i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i><i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i><i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i><i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i>
            </Label>
        </FormGroup>
        </div>
    </header>
  
  );
}

export default Rating;