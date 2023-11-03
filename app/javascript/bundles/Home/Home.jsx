import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import PDFViewer from './PDFViewer';
import ChatWindow from './ChatWindow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [isUserUploadedFile, setIsUserUploadedFile] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isNewFileUploaded, setIsNewFileUploaded] = React.useState(false);

  const savePDF = (file) => {
    setLoading(true);
    setIsNewFileUploaded(false);
    // Upload the file to the server
    const formData = new FormData();
    formData.append('file', file);


    fetch('/upload_file', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });

        if (data.success) {
          setFile(file);
          setIsUserUploadedFile(true);
          setIsNewFileUploaded(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (isUserUploadedFile) {
      return;
    }

    fetch('/fetch_file')
      .then(response => response.blob())
      .then(blob => {
        let file = new File([blob], 'user_book.pdf', { type: 'application/pdf' });
        setFile(file);
        file = null;
      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
      });
  }, []);

  return (
    <div className={classes.root}>
      <PDFViewer
        file={file}
        onFileUpload={(file) => {
          savePDF(file);
        }}
        loading={loading}
      />
      <ChatWindow
        isUserUploadedFile={isUserUploadedFile}
        isNewFileUploaded={isNewFileUploaded}
      />
      <ToastContainer />
    </div>
  );
};

Home.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default Home;
