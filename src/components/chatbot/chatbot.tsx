import { useState } from 'react';
import { Button, Box, List, ListItemText, Typography } from '@mui/material';

import { AppBar } from '../app-bar';
import {
  RootContainer,
  ChatContainer,
  UserMessage,
  InputContainer,
  TextFieldStyled
} from './chatbot.style';

interface Message {
  id: number;
  text: string;
  isUser?: boolean;
}

const USER_NAME = 'Renato';

const CHATBOT_NAME = 'ClonAlvaro';

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
                  <ListItemText
                    primary={message.text}
                    secondary={
                      <Typography variant='caption' color='text.primary'>
                        {message.isUser ? USER_NAME : CHATBOT_NAME}
                      </Typography>
                    }
                  />
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
