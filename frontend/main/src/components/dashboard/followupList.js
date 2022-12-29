import { Alert } from "reactstrap";
import Followup from "./followup";

const FollowupList = ({Followups}) => {
  
    const results =  Object.values(Followups).map(fUp => <Followup followup={fUp}/>)
    const rep = results?.length ? results :  <Alert color="primary">
    No Follow-ups posted yet
    </Alert>
    return (
        <main>{rep}</main>
    )

}

export default FollowupList