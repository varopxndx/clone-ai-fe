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

import { sendMessage } from '../../services/chatbot-services';

interface Message {
  id: number;
  text?: string;
  isUser?: boolean;
}

const USER_NAME = 'Renato';

const CHATBOT_NAME = 'ClonAlvaro';

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoadingMessage, setIsLoadingMessage] = useState<boolean>(false);

  const handleSendMessage = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsLoadingMessage(true);

    if (inputValue.trim() === '') {
      return;
    }

    const data = await sendMessage(inputValue);

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true
    };

    const newBotMessage: Message = {
      id: messages.length + 2,
      text: data?.text,
      isUser: false
    };

    setMessages([...messages, newUserMessage, newBotMessage]);

    setInputValue('');

    setIsLoadingMessage(false);
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
                  alignItems: message.isUser ? 'flex-end' : 'flex-start'
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
                {isLoadingMessage && <Typography>Loading...</Typography>}
              </Box>
            ))}
          </List>
        </ChatContainer>
        <InputContainer component='form' onSubmit={handleSendMessage}>
          <TextFieldStyled
            variant='outlined'
            placeholder='Type your message...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button variant='contained' color='primary' type='submit'>
            Send
          </Button>
        </InputContainer>
      </RootContainer>
    </>
  );
};
