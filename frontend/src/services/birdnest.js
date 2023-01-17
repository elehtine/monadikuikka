import axios from 'axios';

const url = 'http://127.0.0.1:8000';

const getDrones = () => (
  axios.get(url)
);

const getNDZViolateDrones = () => (
  axios.get(`${url}/ndz`)
);

export {
  getDrones,
  getNDZViolateDrones,
};
