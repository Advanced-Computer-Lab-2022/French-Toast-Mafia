import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Col, Row } from "reactstrap";
import { useEffect } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import getVideoId from 'get-video-id';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const ref = React.createRef();


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const { useState } = require("react");

const CourseVideos = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = React.useState(false);
  const [videos, setVideos] = useState([]);
  const search = useLocation().search;
  const subtitleId = new URLSearchParams(search).get('subtitleId');
  const [videoId, setVideoId] = useState('');


  useEffect(function () {
    axios.get(`http://localhost:5000/Subtitle/viewSubtitleVideo?id=${subtitleId}`).then(
      (res) => {
        const resVideos = res.data
        setVideos(resVideos)
        setVideoId(getVideoId(resVideos.Video));
        console.log(videoId.id);
      }
    );
  }, []);


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

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById('notes').value], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Notes.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);

    
    
  };




  return (

    <div className="UsersList">

      <Row>
        <Col sm="6" lg="6" xl="7" xxl="6">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Chapter Video</CardTitle>
              <CardSubtitle className="text-muted" tag="h6">
                {videos.Description}
              </CardSubtitle>
              <iframe id="theiframe" src={videos.Video} title="Youtube Video"
                width="100%" height="500" allowFullScreen
              ></iframe>
              <FormControlLabel label="I've Watched The Video" control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                  label="beb"
                />
              } />
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
                <Stack spacing={1} sx={{ width: '100%' }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Save
                  </Button>

                  <Button variant="outlined" endIcon={<DownloadIcon />}
                    onClick={downloadTxtFile}> Download PDF
                  </Button>


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