import axios from 'axios';

const url = '/api';

const getDrones = () => (
  axios.get(url)
);

const getViolatePilots = () => (
  axios.get(`${url}/pilots`)
);

export {
  getDrones,
  getViolatePilots,
};
