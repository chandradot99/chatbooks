import PropTypes from 'prop-types';
import React from 'react';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { CloudUpload } from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const useStyles = makeStyles(() => ({
  document: {
      "& .react-pdf__Page__canvas": {
        border: "1px solid #e2e2e2",
        borderRadius: 8
      }
    }
}));

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const Home = () => {
  const classes = useStyles();
  const [file, setFile] = React.useState(null);
  const [question, setQuestion] = React.useState("");

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };


  const onFormSubmit = () => {
    // Upload the file to the server
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload_file', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Log the response from the server
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const onAskQuestion = () => {
    fetch('/chat', {
      method: 'POST',
      body: {
        question: question
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Log the response from the server
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Button component="label" variant="contained" startIcon={<CloudUpload />}>
        Upload file
        <VisuallyHiddenInput type="file" onChange={onFileChange} />
      </Button>
      <Button component="label" variant="contained" onClick={onFormSubmit}>
        Save PDF
      </Button>
      <TextField fullWidth label="Ask Question" id="fullWidth" onChange={setQuestion} />
      <Button component="label" variant="contained" onClick={onAskQuestion}>
        Send
      </Button>
      {file && (
        <div style={{ marginTop: '20px' }}>
          <Document file={file} className={classes.document}>
            <Page pageNumber={2} />
          </Document>
        </div>
      )}
    </div>
  );
};

Home.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default Home;
