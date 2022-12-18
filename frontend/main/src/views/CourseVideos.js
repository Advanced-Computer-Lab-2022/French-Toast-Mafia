import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Col, Row } from "reactstrap";
import {useEffect} from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Pdf from "react-to-pdf";
const ref = React.createRef();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const theme = createTheme();

const { useState } = require("react");

const CourseVideos = () => { 
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();
    const [videos,setVideos] = useState([]);
    const params = new URLSearchParams(window.location.search);
    const search = useLocation().search;
    const courseId = new URLSearchParams(search).get('courseId');
    const subtitleId = new URLSearchParams(search).get('subtitleId');


   
    useEffect( function () {  
       axios.get(`http://localhost:5000/Subtitle/viewSubtitleVideo?id=${subtitleId}`).then(
            (res) => {
                const resVideos = res.data
              //  console.log(resVideos)
                setVideos(resVideos)
            }
        );
          },[]);

  const handleSubmit = (event) => {
    setOpen(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post(`http://localhost:5000/Subtitle/addNotes?id=${subtitleId}`, {
      Notes: data.get('notes'),
    }).then((res) => {
      console.log(res.data)
     setErrorMessage("Notes Added Successfully")
    })
      .catch((err) => {
        console.log(err)
      })
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const [notes,setNotes] = useState([]);
    
  const getNotes =  async () => {
   await axios.get(`http://localhost:5000/Subtitle/viewSubtitleNotes?id=${subtitleId}`).then(
         (res) => {
             const resNotes = res.data
             console.log(resNotes)
             setNotes(resNotes)
         }
     );
        }

    
        //   const downloadPDF = () => {
        //     // using Java Script method to get PDF file
        //     fetch('Notes.pdf').then(response => {
        //         response.blob().then(blob => {
        //             // Creating new object of PDF file
        //             const fileURL = window.URL.createObjectURL(blob);
        //             // Setting various property values
        //             let alink = document.createElement('a');
        //             alink.href = fileURL;
        //             alink.download = 'Notes.pdf';
        //             alink.click();
        //         })
        //     })
        // }
    
    return(
     
      <div className="UsersList">
      
      
      <Row>
      <Col sm="6" lg="6" xl="7" xxl="6">
      <Card>
      <CardBody>
        <CardTitle tag="h5">Chapter Video</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
         {videos.Description}
        </CardSubtitle>
        <iframe src={videos.Video} title="Youtube Video"
        width="100%" height="500"></iframe>
      </CardBody>
    </Card>
    </Col>

    <Col sm="4" lg="4" xl="3" xxl="5">
      <Card>
        <CardBody>
        

                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="notes"
                      label="Notes"
                      name="notes"
                      autoComplete="notes"
                      autoFocus
                      multiline
                      rows={18.3}
                    />
                    <Stack spacing={1} sx={{width:'100%' }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                      >
                        Save
                      </Button>
{/*
                      <Button variant="outlined" endIcon={<DownloadIcon />}
                          onClick={downloadPDF}> Download PDF
    </Button> */}

                    <Pdf targetRef={notes} filename="notes.pdf">
                      {({ toPdf }) =>  <Button variant="outlined" endIcon={<DownloadIcon />}
                          onClick={toPdf}> Download PDF
    </Button>}
                    </Pdf>

<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                  {errorMessage}
                              </Alert>
                          </Snackbar>
                    </Stack>
                  </Box>

              
    
    </CardBody>
    </Card>
    </Col>
    </Row>
                </div>
    
               

    )
}
export default CourseVideos;