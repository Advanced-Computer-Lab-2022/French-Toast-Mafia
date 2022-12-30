import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Modal from "react-bootstrap/Modal";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const { useState, useEffect } = require("react");

const UserCoursePage = () => {
  const [courses, setCourses] = useState([]);
  const params = new URLSearchParams(window.location.search);
  const search = useLocation().search;
  const userId = new URLSearchParams(search).get('userId');
  const courseId = new URLSearchParams(search).get('courseId');
  const navigate = useNavigate();


  useEffect(function () {
    // const courseId = params.get('courseId');
    //   const userId = params.get('userId');
    axios.get(`http://localhost:5000/Course/viewUserCourse?id=${userId}`).then(
      (res) => {
        const resCourse = res.data
        console.log(resCourse)
        setCourses(resCourse)
      }
    );
  }, []);

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    axios.get(`http://localhost:5000/User/getUserProgress?id=${userId}&courseId=${courseId}`).then(
      (res) => {
        const resProgress = res.data
        setProgress(resProgress);
      }
    );

  }, []);

  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleCancel = () => setShow(false);
 
  

  const handleProgressClick = () => {
    if (progress < 100) {
      setOpen(true);
      console.log("progress is less than 100")
    }
    else {
      setShow(true);
      setOpen2(true);

    //recieve certificate by mail
    axios.get(`http://localhost:5000/User/sendCertificate?id=${userId}`);

      console.log("progress is 100")
    }
  };

  const handleCertificateClick = () => {
    //navigate to certificate page
    navigate(`/CertificatePage?courseId=${courseId}&userId=${userId}`);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
  };


  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };




  return (

    <div className="UsersList">
      <h1 style={{ textAlign: "center" }}>Course Information</h1>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Course Name</StyledTableCell>
              <StyledTableCell align="center">Level</StyledTableCell>
              <StyledTableCell align="center">Subject</StyledTableCell>
              <StyledTableCell align="center">Instructor Info</StyledTableCell>
              <StyledTableCell align="center">Chapters</StyledTableCell>
              <StyledTableCell align="center">Exams</StyledTableCell>
              <StyledTableCell align="center">Rate Course</StyledTableCell>
              <StyledTableCell align="center">Progress</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {courses.map((course) => (
              <TableRow>
                <TableCell align="center">{course.NameOfCourse}</TableCell>
                <TableCell align="center">{course.LevelOfCourse}</TableCell>
                <TableCell align="center">{course.Subject}</TableCell>
                <TableCell align="center">
                  <Box sx={{ marginBottom: 2 }}>
                    <Button variant="contained"
                      style={{ width: 210, height: 40, color: '#FFF', marginTop: 10 }}
                      onClick={() =>
                        navigate(`/CourseInstructor?courseId=${courseId}&userId=${userId}`)
                      }
                      margin="normal"
                      padding="normal"
                    >View Instructor Info</Button>
                  </Box>
                </TableCell>

                <TableCell align="center">

                  <Box sx={{ marginBottom: 2 }}>
                    <Button variant="contained"
                      style={{ width: 200, height: 40, color: '#FFF', marginTop: 10 }}
                      onClick={() =>
                        navigate(`/CourseSubtitles?courseId=${courseId}&userId=${userId}`)
                      }
                      margin="normal"
                      padding="normal"
                    >View Chapters</Button>
                  </Box>

                </TableCell>

                <TableCell align="center">
                  <Box sx={{ marginBottom: 2 }}>
                    <Button variant="contained"
                      style={{ width: 150, height: 40, color: '#FFF', marginTop: 10 }}
                      onClick={() =>
                        // window.location.href=`/CourseExercises?courseId=${courseId}&userId=${userId}`
                        // navigate(`/ViewExam?courseId=${courseId}&userId=${userId}`)
                        navigate(`/CourseExams?courseId=${courseId}&userId=${userId}`)
                      }
                      margin="normal"
                      padding="normal"
                    >Exams</Button>
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <Box sx={{ marginBottom: 2 }}>
                    <Button variant="contained"
                      style={{ width: 150, height: 40, color: '#FFF', marginTop: 10 }}
                      onClick={() =>
                        //window.location.href=`/CourseRate?courseId=${courseId}&userId=${userId}`
                        navigate(`/CourseRate?courseId=${courseId}&userId=${userId}`)
                      }
                      margin="normal"
                      padding="normal"
                    >Rate Course</Button>
                  </Box>
                </TableCell>

                <TableCell align="center"
                  hover
                  onClick={() => { handleProgressClick() }}
                > <CircularProgressWithLabel value={progress} /></TableCell>

              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        show={show}
        onHide={handleCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography id="modal-modal-description" sx={{ mt: 2, ml: 11,mb:3}}>
            You have completed {progress}% of the course.
          </Typography>

          <Button variant="contained" size="small"
            style={{
              display: 'flex', height: 40, marginTop: 10,
              borderBlockColor: '#1aac83', borderTop: '#1aac83',
              borderBottom: '#1aac83', borderRight: '#1aac83',
              borderLeft: '#1aac83', marginLeft: 150,marginBottom:10
            }}

            onClick={() => {
              handleCertificateClick()
            }} >
            Get your certificate
          </Button>

        </Modal.Body>


      </Modal>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                              <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                                  Your progress is less than 100%.
                              </Alert>
                          </Snackbar>

                          <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
                              <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                                  A mail with the certificate has been sent to your email.
                              </Alert>
                          </Snackbar>



    </div>


  )
}
export default UserCoursePage;