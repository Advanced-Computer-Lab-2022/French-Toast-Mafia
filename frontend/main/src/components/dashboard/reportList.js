import Report from "./report"
import { Alert } from "reactstrap";

const ReportList = ({Reports}) => {
   //console.log(Reports)
    // console.log(Object.values(Reports)[0])
    const results =  Object.values(Reports).map(report => <Report id={report._id} report={report} followup = {report.follow_up} />)
    const rep = results?.length ? results :  <Alert color="primary">
    No issues reported yet
    </Alert>
    return (
        <main>{rep}</main>
    )

}

export default ReportList