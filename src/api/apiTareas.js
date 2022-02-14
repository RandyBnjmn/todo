import axios from 'axios'

const apiTareas = axios.create({
  baseURL: 'https://todo-4e93c-default-rtdb.firebaseio.com',
})

export default apiTareas
