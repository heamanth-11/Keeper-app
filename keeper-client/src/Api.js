import axios from 'axios'

const getApi = axios.create({
  baseURL: 'http://localhost:8000/',
  timeoutn: 1000
})

export default getApi