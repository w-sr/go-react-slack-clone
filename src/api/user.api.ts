import axios from 'axios';

export const userAddAPI = async (payload: any) => {
  new Promise((resolve, reject) => {
    axios.post(`/new/user`, JSON.stringify(payload))
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
};