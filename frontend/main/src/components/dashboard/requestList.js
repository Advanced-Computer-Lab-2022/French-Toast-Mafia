import Request from "./request"
import { Alert } from "reactstrap";

const RequestList = ({Requests}) => {

    
   //console.log(Reports)
    // console.log(Object.values(Reports)[0])
    const results =  Object.values(Requests).map(request => <Request id={request._id} request={request} />)
    const rep = results?.length ? results :  <Alert color="primary">
    No Courses requested yet
    </Alert>
    return (
        <main>{rep}</main>
    )

}

export default RequestList