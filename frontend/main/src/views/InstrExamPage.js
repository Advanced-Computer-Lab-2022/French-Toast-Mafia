import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
import MuiAlert from '@mui/material/Alert';
import Modal from "react-bootstrap/Modal";
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';

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


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#000',
}));



const InstrExamPage = () => {

    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const search = useLocation().search;
    const examId = new URLSearchParams(search).get('examId');

    useEffect(function () {
        axios.get(`http://localhost:5000/Exams/getExamById?id=${examId}`).then(
            (res) => {
                const exams = res.data
                // console.log(exams)
                setExams(exams)
            }
        )
    }, []);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleCancel = () => {
    setShow(false);
    //render the page again
    fetchData();
    }
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = React.useState(false);
   
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const handleSubmit = async (event) => {
        setOpen(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.post(`http://localhost:5000/Exams/addMCQ?id=${examId}`, {
            question: data.get('question'),
            choice1: data.get('choice1'),
            choice2: data.get('choice2'),
            choice3: data.get('choice3'),
            choice4: data.get('choice4'),
            correct: data.get('correct'),

        }).then((res) => {
            setErrorMessage("Question Added Successfully!");
            
        }).catch((err) => {
            setErrorMessage("Error: " + err);
        });
        fetchData();

        //empty the form
        setQuestion('');
        setChoice1('');
        setChoice2('');
        setChoice3('');
        setChoice4('');
        setCorrect('');


    };

    const [mcq, setMcq] = useState([]);

    async function fetchData() {
        axios.get(`http://localhost:5000/Exams/getAllMcq?id=${examId}`).then(
            (res) => {
                const m = res.data
                console.log("MCQS: ")
                console.log(m)
                setMcq(m)
            }
        )
    }

    useEffect(() => {
        fetchData();
    }, []);

    const [question, setQuestion] = useState('');
    const [choice1, setChoice1] = useState('');
    const [choice2, setChoice2] = useState('');
    const [choice3, setChoice3] = useState('');
    const [choice4, setChoice4] = useState('');
    const [correct, setCorrect] = useState('');


    return (
        <div>
            <h1>Exam Page</h1>
            <div className="UsersList">

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                        <Item>Exam Title: {exams.title}</Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>Exam Description: {exams.description}</Item>
                    </Grid>
                </Grid>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" style={{ color: '#FFF' }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Question</StyledTableCell>
                                <StyledTableCell align="center">First Choice</StyledTableCell>
                                <StyledTableCell align="center">Second Choice</StyledTableCell>
                                <StyledTableCell align="center">Third Choice</StyledTableCell>
                                <StyledTableCell align="center">Fourth Choice</StyledTableCell>
                                <StyledTableCell align="center">Answer</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mcq.map((m) => (
                                <TableRow key={exams._id}>
                                    <TableCell align="center">{m.question}</TableCell>
                                    <TableCell align="center">{m.choice1}</TableCell>
                                    <TableCell align="center">{m.choice2}</TableCell>
                                    <TableCell align="center">{m.choice3}</TableCell>
                                    <TableCell align="center">{m.choice4}</TableCell>
                                    <TableCell align="center">{m.correct}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                <Button variant="contained"
                    onClick={handleShow}
                    sx={{ mt: 2, mb: 2, ml: 65, mr: 2 }}
                >Add Another Question</Button>

                <Modal
                    show={show}
                    onHide={handleCancel}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Another Question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Box component="form" 
                          onSubmit={handleSubmit}
                         noValidate sx={{ mt: 1 }}>
                            <Typography>Question</Typography>
                            <TextField margin="normal" required fullWidth id="question" name="question" label="Type your question"
                            onChange={(e) => {
                                setQuestion(e.target.value) }}
                            value={question}
                            autoFocus />

                            <Typography>First Choice</Typography>
                            <TextField margin="normal" required fullWidth id="choice1" name="choice1" label="Type your first choice" 
                             onChange={(e) => {
                                setChoice1(e.target.value) }}
                            value={choice1}
                            autoFocus />

                            <Typography>Second Choice</Typography>
                            <TextField margin="normal" required fullWidth id="choice2" name="choice2" label="Type your second choice" 
                             onChange={(e) => {
                                setChoice2(e.target.value) }}
                            value={choice2}
                            autoFocus />

                            <Typography>Third Choice</Typography>
                            <TextField margin="normal" required fullWidth id="choice3" name="choice3" label="Type your third choice" 
                             onChange={(e) => {
                                setChoice3(e.target.value) }}
                            value={choice3}
                            autoFocus />

                            <Typography>Fourth Choice</Typography>
                            <TextField margin="normal" required fullWidth id="choice4" name="choice4" label="Type your fourth choice" 
                             onChange={(e) => {
                                setChoice4(e.target.value) }}
                            value={choice4}
                            autoFocus />

                            <Typography>Correct Answer</Typography>
                            <TextField margin="normal" required fullWidth id="correct" name="correct" label="Type question's answer"
                             onChange={(e) => {
                                setCorrect(e.target.value) }}
                            value={correct}
                            autoFocus />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ marginLeft: 20, mt: 0, mb: 1 }}
                                onClick={() =>
                                    console.log("View Exam Page")}
                            >Add Question</Button>
                        </Box>
                    </Modal.Body>

                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                  {errorMessage}
                              </Alert>
                          </Snackbar>


                </Modal>



            </div>
        </div>

    )
}
export default InstrExamPage;