import { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  styled
} from '@mui/material';

import { AppBar } from './components/app-bar';

const RootContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 68.5px);
`;

const ChatContainer = styled(Box)`
  flex-grow: 1;
  overflow: auto;
  padding: ${(props) => props.theme.spacing(2)};
`;

const UserMessage = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'isUser'
})(({ isUser }: { isUser?: boolean }) => ({
  width: '100%',
  backgroundColor: '#f0f0f0',
  borderRadius: '5px',
  marginBottom: '8px',

  '@media (min-width: 600px)': {
    width: '50%'
  },

  ...(isUser && {
    backgroundColor: '#e3f2fd'
  })
}));

const InputContainer = styled(Box)`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1, 2)};
`;

const TextFieldStyled = styled(TextField)`
  flex-grow: 1;
  margin-right: ${(props) => props.theme.spacing(2)};
`;

interface Message {
  id: number;
  text: string;
  isUser?: boolean;
}

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        isUser: true
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleRespond = () => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: 'This is a response from the chatbot.',
      isUser: false
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <>
      <AppBar />
      <RootContainer elevation={3}>
        <ChatContainer>
          <List>
            {messages.map((message) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.isUser ? 'flex-start' : 'flex-end'
                }}
              >
                <UserMessage key={message.id} isUser={message.isUser}>
                  <ListItemText primary={message.text} />
                </UserMessage>
              </Box>
            ))}
          </List>
        </ChatContainer>
        <InputContainer>
          <TextFieldStyled
            variant='outlined'
            placeholder='Type your message...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleSendMessage}
          >
            Send
          </Button>
          <Button variant='contained' color='secondary' onClick={handleRespond}>
            Receive
          </Button>
        </InputContainer>
      </RootContainer>
    </>
  );
};
