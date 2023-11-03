import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';
import ChatInput from './ChatInput';
import ChatQuestion from './ChatQuestion';
import ChatResponse from './ChatResponse';
import ChatLoading from './ChatLoading';

const useStyles = makeStyles(() => ({
    chatWindow: {
      width: "50%",
      position: "relative",
      display: "flex",
      flexDirection: "column"
    },
		chatsWrap: {
			height: "calc(100% - 60px)",
			overflow: "auto",
			display: "flex",
			flexDirection: "column",
			gap: "16px",
			padding: "16px",
		}
}));

const ChatWindow = ({ isUserUploadedFile, isNewFileUploaded }) => {
  const classes = useStyles();
  const [chatHistory, setChatHistory] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const containerRef = React.useRef(null);

  const queryChatBot = (userInput) => {
		setLoading(true);
    let history = [...chatHistory, { type: "User", content: userInput }];
    setChatHistory(history);

    const requestBody = {
      question: userInput,
      isSamplePDF: !isUserUploadedFile
    };

    fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then((response) => response.json())
      .then((data) => {
        history = [...history, { type: "System", content: data.response.content }];
        setChatHistory(history);
				setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
				setLoading(false);
      });
  };

	React.useEffect(() => {
		if(containerRef.current) {
			containerRef.current.scrollTo({
				top: containerRef.current.scrollHeight,
				left: 0,
				behavior: "smooth"
			})
		}
	}, [chatHistory]);

	React.useEffect(() => {
		if (isNewFileUploaded) {
			setChatHistory([]);
		}
	}, [isNewFileUploaded]);

  return (
    <div className={classes.chatWindow}>
			<div className={classes.chatsWrap} ref={containerRef}>
				{
					chatHistory.map(({ type, content }, index) => {
						return (
							<div key={type + index}>
								{
									type === "User" ? <ChatQuestion question={content} /> : <ChatResponse response={content} />
								}
							</div>
						);
					})
				}
				{
					loading && <ChatLoading />
				}
			</div>
        <ChatInput onSend={queryChatBot} />
    </div>
  );
};


ChatWindow.propTypes = {
  isUserUploadedFile: PropTypes.bool.isRequired,
	isNewFileUploaded: PropTypes.bool.isRequired
};


export default ChatWindow;
