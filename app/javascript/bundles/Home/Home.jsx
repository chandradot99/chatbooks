import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Sidebar from './Sidebar';
import PDFViewer from './PDFViewer';
import ChatWindow from './ChatWindow';
import './styles.css'; // Import the CSS file

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100vh",
    fontFamily: "'Inter', sans-serif"
  }
}));

const Home = () => {
  const classes = useStyles();

  const [file, setFile] = React.useState(null);

  // const onFormSubmit = () => {
  //   // Upload the file to the server
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   fetch('/upload_file', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.message); // Log the response from the server
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };

  return (
    <div className={classes.root}>
      <Sidebar onFileUpload={setFile} />
      <PDFViewer file={file} />
      <ChatWindow />
      {/* <Button component="label" variant="contained" onClick={onFormSubmit}>
        Save PDF
      </Button> */}
    </div>
  );
};

Home.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default Home;
