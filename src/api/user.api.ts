import axios from 'axios';

export const userAddAPI = async (payload: any): Promise<boolean> => {
  console.log('payload', payload)
  await axios.post('/new/user', JSON.stringify(payload))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    })

  return true;
};