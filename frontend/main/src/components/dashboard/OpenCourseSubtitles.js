import { Container, Card, CardBody, CardTitle, CardSubtitle, Table,
  Row,
  Col,
} from "reactstrap";

import Accordion from 'react-bootstrap/Accordion';
import OpenSubtitle from "./OpenSubtitle";

const OpenCourseSubtitles = ({subtitles}) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Course Subtitles</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the Course
          </CardSubtitle>

          <Row>
            <Col>
                <div>
                    <Accordion className="accordion accordion-flush" defaultActiveKey="0">
                      {subtitles.map(s =>  <OpenSubtitle subtitle={s}/>)}
                    </Accordion>
                </div>
            </Col>
          </Row>
      </CardBody>
      </Card>
    </div>
  );
};

export default OpenCourseSubtitles;
