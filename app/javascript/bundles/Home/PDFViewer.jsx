import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import FileUpload from './FileUpload';

const useStyles = makeStyles(() => ({
	pdfRoot: {
		width: "50%",
		borderRight: "1px solid #e2e2e2",
	},
	documentWrap: {
		display: "flex",
		justifyContent: "center",
    margin: "16px",
    height: "calc(100% - 170px)",
		overflow: "auto",
	},
  document: {
		display: "flex",
		flexDirection: "column",
		gap: "16px",
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

const PDFViewer = ({ file, onFileUpload, loading }) => {
  const classes = useStyles();
	const [totalPages, setTotalPages] = React.useState(null);

	const onDocumentSuccess = ({ numPages }) => {
		setTotalPages(numPages);
	};

  return (
    <div className={classes.pdfRoot}>
      <FileUpload onFileUpload={onFileUpload} loading={loading} />
			{file && (
        <div className={classes.documentWrap}>
          <Document file={file} className={classes.document} onLoadSuccess={onDocumentSuccess}>
						{Array.from(new Array(totalPages), (el, index) => (
							<Page key={`page_${index + 1}`} pageNumber={index + 1}/>
						))}
          </Document>
        </div>
      )}
    </div>
  );
};

PDFViewer.propTypes = {
  file: PropTypes.object,
  onFileUpload: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default PDFViewer;
