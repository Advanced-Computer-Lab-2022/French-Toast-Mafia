import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
    Col,
  } from "reactstrap";
  
import user1 from "../../assets/images/users/user1.jpg";
// import user2 from "../../assets/images/users/user2.jpg";
// import user3 from "../../assets/images/users/user3.jpg";
// import user4 from "../../assets/images/users/user4.jpg";
// import user5 from "../../assets/images/users/user5.jpg";


  const Reviews = ({reviews}) => {
    // console.log(reviews)
    // // console.log(reviews[0])
    // // console.log(Object.values(reviews[0]))

    const getRating = (rating) =>{
      let stars = [];
      for (var i = 0; i < rating; i++) {
          stars.push( <i className="bi bi-star-fill"style={{ color: "rgb(255, 210, 48)"}}></i>);
      }
    return stars;
  }
    return (
         reviews.map((r) => (
          <Col sm="6" lg="6" xl="3" key={r._id}>
      <Card>
     
        <CardBody className="text-center">
        <img 
            src={user1}
            className="rounded-circle"
            alt="avatar"
            width="45"
            height="45"
          />
          {/* <CardTitle className="border-bottom p-3 mb-0"></CardTitle> */}
          <CardTitle tag="h5">"{r.review}"</CardTitle>
          <CardSubtitle>{getRating(r.rating)}</CardSubtitle>
          <CardText className="mt-3 text-muted">-{r.username}</CardText> 
     
        </CardBody>
     
      </Card>
          </Col> 
        )) 
     
    );
  };
  
  export default Reviews;
  