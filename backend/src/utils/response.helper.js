export const buildResponse = (status, message, data = null) => {
  return {
    status,
    message,
    data,
  };
};