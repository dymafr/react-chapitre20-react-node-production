import * as axios from 'axios';

const apiNode = axios.create({
  baseURL: 'http://localhost:3000/'
})

export default apiNode;