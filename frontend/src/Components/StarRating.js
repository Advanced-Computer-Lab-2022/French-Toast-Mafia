import React ,{useState} from 'react'
import { FaStar } from "react-icons/fa";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const StarRating = () => {
    const [rating, Setrating] = useState(null);
    const [Hover , setHover] = useState(null);
    const navigate = useNavigate();




 return( 
     <div >
         {[...Array(5)].map( (star,i) => {
           const ratingvalue= i + 1;


          return(
          <label>
          <input type="radio"
           name="rating" 
          value={ratingvalue} 
          onClick={ ()=> Setrating(ratingvalue) } 
          />

          <FaStar 
           className='star'
           size={50} 
           color={ratingvalue <= ( Hover || rating )? "#ffc107" : "#e4e5e9"  } 
           onMouseEnter={ () => setHover(ratingvalue)  } 
            onMouseLeave ={ () => setHover(null)  } 
            style={{
                marginRight: 10,
                cursor: "pointer"
              }} />
          </label>

          )
         })}


    <p> The rating is {rating} </p>

    
      <textarea
        placeholder="What's your feedback?"
       
      />

<Button 
     style={{width:150, height:40  ,backgroundColor:' #1aac83' ,marginTop:100,justifyContent:'right' ,alignSelf: 'flex-start '}}
     onClick={ () => { navigate("/") } }
     type='submit'
     variant="contained "  > 
     <h1  > Submit </h1>

</Button>
</div>
  )
};

export default StarRating;
