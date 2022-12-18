// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container } from 'react-bootstrap';
// import axios from 'axios';
// import Button from '@mui/material/Button';
// import Table from '@mui/material/Table';
// import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';  
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { height } from '@mui/system';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";



// // return(

// // <Container>

// // <div className="ratio ratio-4x3">
// //   <iframe src="https://www.youtube.com/embed/xNRJwmlRBNU" title="YouTube video" allowFullScreen></iframe>
// // </div> 

// // </Container>
// // )}



// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));

// const theme = createTheme();

// const { useState } = require("react");


// const PreviewVideo = () => {

//     const navigate = useNavigate();
//     const [videos,setVideos] = useState([]);
//     const params = new URLSearchParams(window.location.search);
//     const search = useLocation().search;
//     const courseId = new URLSearchParams(search).get('courseId');

//     const getVideos = async () => {
//         await axios.get(`http://localhost:5000/Course/getCoursePreviewVideos?id=${courseId}`).then(
//             (res) => {
//                 const resVideos = res.data
//                 console.log(resVideos)
//                 setVideos(resVideos)
//             }
//         );
//     }

    
//     return(
     
//       <div className="UsersList">
//       <Box sx={{marginBottom: 2}}>
//       <Button variant="contained"
//       style={{width:300, height:40  , color:'#FFF' ,marginTop:10}}
//       onClick={getVideos}
//       margin="normal"
//       padding="normal"
//       >Load Course Videos</Button>
//       {/* margin */}
//       </Box>

//       <TableContainer component={Paper}>
//      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//        <TableHead>
//       <TableRow>
//         <StyledTableCell align="center">Course Videos</StyledTableCell>
//       </TableRow>
//     </TableHead>

//     <TableBody>
//       {videos.map((v) => (
//         <TableRow
//         hover
//         sx={{
//             "&:hover":{
//             cursor: "pointer",backgroundColor: "#f5f5f5", width: "100%", }}}>
//           <TableCell align="center">
//             <iframe src={v} title="Youtube Video allowfullscreen"></iframe>
//             </TableCell>
//         </TableRow>
//       ))}
      
//     </TableBody>
//   </Table>
// </TableContainer>

          
//                 </div>
    
               

//     )
// }


// export default PreviewVideo;












import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { height } from '@mui/system';
import { json, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { getPreviewVideo} from '../api/axios'



// return(

// <Container>

// <div className="ratio ratio-4x3">
//   <iframe src="https://www.youtube.com/embed/xNRJwmlRBNU" title="YouTube video" allowFullScreen></iframe>
// </div> 

// </Container>
// )}



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const theme = createTheme();

const { useState , useEffect } = require("react");


const PreviewVideo = () => {

    const navigate = useNavigate();
    const [videos,setVideos] = useState([]);
    const params = new URLSearchParams(window.location.search);
    const search = useLocation().search;
    const courseId = new URLSearchParams(search).get('courseId');

    const PreviewVideo = async () => {
        await axios.get(`http://localhost:5000/Course/getCoursePreviewVideos?id=${courseId}`).then(
            (res) => {
                const resVideos = res.data
                console.log(resVideos)
                setVideos(resVideos)
            }
        );
    }
    useEffect(() => {
        getPreviewVideo().then(json => {
            setVideos(json)
            return json 
        })  
    } , [])

    
    return(
     
      <div className="UsersList">
      

      <TableContainer component={Paper}>
     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
       <TableHead>
      <TableRow>
        <StyledTableCell align="center">Course Videos</StyledTableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {videos.map((course) => (
        <TableRow
        hover
        sx={{
            "&:hover":{
            cursor: "pointer",backgroundColor: "#f5f5f5", width: "100%", }}}
            // onClick={() => window.location.href=`/MyCourses?courseId=${course._id}`}
            //   key={course._id}

            >
          <TableCell align="center">
             <div className="ratio ratio-4x3">
   <iframe src={course} title="YouTube video" allowFullScreen></iframe>

 </div> 

            </TableCell>
            
              
          

        </TableRow>
      ))}
      
    </TableBody>
  </Table>
</TableContainer>

          
    </div>
    
               

    )


}


export default PreviewVideo;