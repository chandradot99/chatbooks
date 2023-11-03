import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';


const useStyles = makeStyles(() => ({
	chatInput: {
		display: "flex",
		width: "calc(100% - 32px)",
		height: "60px",
		padding: "16px",
	},
  button: {
    borderTopLeftRadius: "0 !important",
    borderBottomLeftRadius: "0 !important",
    marginLeft: "-2px !important"
  }
}));

const ChatInput = ({ onSend }) => {
  const classes = useStyles();
  const [userInput, setUserInput] = React.useState("What is this book about?");

  return (
    <div className={classes.chatInput}>
			<TextField
        fullWidth
        label="Ask Question"
        id="fullWidth"
        onChange={(event) => setUserInput(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            setUserInput("");
            onSend(userInput);
          }
        }}
        value={userInput}
      />
			<Button
        component="button"
        variant="contained"
        className={classes.button}
        onClick={() =>  {
          setUserInput("");
          onSend(userInput);
        }}
      >
				<Send />
			</Button>
    </div>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired
};

export default ChatInput;
