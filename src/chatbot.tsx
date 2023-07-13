import { ReactElement, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  styled
} from '@mui/material';

const RootContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Title = styled(Typography)<{ component?: ReactElement | string }>`
  text-align: center;
  margin: ${(props) => props.theme.spacing(2, 0)};
`;

const ChatContainer = styled(Box)`
  flex-grow: 1;
  overflow: auto;
  padding: ${(props) => props.theme.spacing(2)};
`;

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
}

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  return (
    <RootContainer elevation={3}>
      <Title variant='h4' component='h1'>
        Clone AI - Chat
      </Title>
      <ChatContainer>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id}>
              <ListItemText primary={message.text} />
            </ListItem>
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
        <Button variant='contained' color='primary' onClick={handleSendMessage}>
          Send
        </Button>
      </InputContainer>
    </RootContainer>
  );
};
