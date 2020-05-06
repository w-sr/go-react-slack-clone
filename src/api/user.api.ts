
export const userAddAPI = (payload: any): Promise<number> => {
  const promise = new Promise<number>(resolve => {
    console.log('payload', payload)
    resolve(payload)
  });

  return promise;
};