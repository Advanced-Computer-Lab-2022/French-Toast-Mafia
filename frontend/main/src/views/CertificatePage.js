import React from "react";
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
  
const CertificatePage = () => {

const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch('SamplePDF.pdf').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'Certificate.pdf';
            alink.click();
        })
    })
}
return (
    <>
        <center>
            <h1 style={{ marginTop: "200px",color: "#1976d2"}}
            >Congratulations Upon Completing The Course!</h1>
            <h4
            >Click on below button to download your Certificate</h4>
            <Button 
                sx={{mt:3}}
            variant="outlined" endIcon={<DownloadIcon />}
                      onClick={onButtonClick}> Download PDF
                    </Button>
        </center>
    </>
);
};

export default CertificatePage;
