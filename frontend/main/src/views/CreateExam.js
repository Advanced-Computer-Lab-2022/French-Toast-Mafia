import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import QuizIcon from '@mui/icons-material/Quiz';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Card } from '@mui/material';
import Grid from '@mui/material/Grid';
import MuiAlert from '@mui/material/Alert';
import Modal from "react-bootstrap/Modal";
import { useLocation } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

const CreateExam = () => {

    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [examId, setExamId] = useState('');

    const search = useLocation().search;
    const instrId = new URLSearchParams(search).get('instrId');
    const courseId = new URLSearchParams(search).get('courseId');


    const handleSubmit = async (event) => {
        setOpen(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.post(`http://localhost:5000/Exams/createExam?instrId=${instrId}&courseId=${courseId}`, {
            instrId: instrId,
            courseId: courseId,
            title: data.get('title'),
            description: data.get('description'),
            question: data.get('question'),
            choice1: data.get('choice1'),
            choice2: data.get('choice2'),
            choice3: data.get('choice3'),
            choice4: data.get('choice4'),
            correct: data.get('correct'),

        }).then((res) => {
            //get exam created id
            setExamId(res.data.id);
            console.log(res.data.id);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });

    };

    //Modal 
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleCancel = () => setShow(false);


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <QuizIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Exam
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Typography>Title</Typography>
                        <TextField margin="normal" required fullWidth id="title" name="title" label="Type exam title" autoFocus />

                        <Typography>Description</Typography>
                        <TextField margin="normal" required fullWidth id="description" name="description" label="Type your description" autoFocus />

                        <Typography>Question</Typography>
                        <TextField margin="normal" required fullWidth id="question" name="question" label="Type your question" autoFocus />

                        <Typography>First Choice</Typography>
                        <TextField margin="normal" required fullWidth id="choice1" name="choice1" label="Type your first choice" autoFocus />

                        <Typography>Second Choice</Typography>
                        <TextField margin="normal" required fullWidth id="choice2" name="choice2" label="Type your second choice" autoFocus />

                        <Typography>Third Choice</Typography>
                        <TextField margin="normal" required fullWidth id="choice3" name="choice3" label="Type your third choice" autoFocus />

                        <Typography>Fourth Choice</Typography>
                        <TextField margin="normal" required fullWidth id="choice4" name="choice4" label="Type your fourth choice" autoFocus />

                        <Typography>Correct Answer</Typography>
                        <TextField margin="normal" required fullWidth id="correct" name="correct" label="Type question's answer" autoFocus />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleShow}>Submit Exam</Button>

                        <Modal
                            show={show}
                            onHide={handleCancel}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Exam Created!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <Button variant="contained" sx={{ marginLeft: 20, mt: 0, mb: 1 }}
                                        onClick={() =>
                                            navigate(`/InstrExamPage?courseId=${courseId}&instrId=${instrId}&examId=${examId}`)}
                                    >View Exam Page</Button>
                                </Typography>

                            </Modal.Body>


                        </Modal>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default CreateExam;