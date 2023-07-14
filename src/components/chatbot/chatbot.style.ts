import { TextField, Paper, Box, ListItem, styled } from '@mui/material';

export const RootContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 68.5px);
`;

export const ChatContainer = styled(Box)`
  flex-grow: 1;
  overflow: auto;
  padding: ${(props) => props.theme.spacing(2)};
`;

export const UserMessage = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'isUser'
})(({ isUser }: { isUser?: boolean }) => ({
  width: '100%',
  backgroundColor: '#f0f0f0',
  borderRadius: '5px',
  marginBottom: '8px',
  textAlign: isUser ? 'left' : 'right',

  '@media (min-width: 600px)': {
    width: '50%'
  },

  ...(isUser && {
    backgroundColor: '#e3f2fd'
  })
}));

export const InputContainer = styled(Box)`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1, 2)};
`;

export const TextFieldStyled = styled(TextField)`
  flex-grow: 1;
  margin-right: ${(props) => props.theme.spacing(2)};
`;
