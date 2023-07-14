import axios from 'axios';

const apiBaseUrl = 'http://localhost:8080/v1';

interface MessageResponse {
  text: string;
}

export const sendMessage = async (
  message: string
): Promise<MessageResponse | undefined> => {
  try {
    const response = await axios.post(`${apiBaseUrl}/get-answer`, {
      message
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
