const getError = (error) => error.response && error.response.data && error.reponse.data.message
    ? error.response.data.message
    : error.message;

export { getError };