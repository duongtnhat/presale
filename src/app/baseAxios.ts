import axios from 'axios'



const baseAxios = axios.create({
  baseURL: 'https://jpostar.net/api/',
  timeout: 600000,
  withCredentials: false,
  timeoutErrorMessage: 'AXIOS_TIMEOUT_ERROR_MESSAGE',
})

baseAxios.interceptors.request.use( (config) => {
  config.headers['Content-Type'] = 'application/json'

  return config
})

baseAxios.interceptors.response.use(
  async (response) => {
    const error = response.data?.errors
    if (error) {
      console.log(JSON.stringify(error))
    }
    return response
  },
  async (error) => {
    if ([401, 403].includes(error.response.status)) {
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

export default baseAxios
