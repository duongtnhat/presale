import baseAxios from "@/app/baseAxios";
import {AxiosRequestConfig} from "axios";

export type RequestConfig = AxiosRequestConfig & { showError?: boolean; errorMessage?: string }

export const validateStatus = (status: number) => {
  return (status >= 200 && status <= 304) || status === 403
}

const request = async (url: string, config: RequestConfig): Promise<any> => {
  try {
    const response = await baseAxios(config)
    const data = response.data
    if (typeof data === 'object' && validateStatus(response.status)) {
      data.success = true
      return data
    }
    return data
  } catch (error) {
    console.log('error == ', error)
  }
}

export const api = {
    get: async (url: string, config?: RequestConfig) => {
        return request(url, { method: 'get', url, ...config })
    },
    post: async (url: string, data?: any, config?: RequestConfig) => {
        return request(url, { method: 'post', url, data, ...config })
    },
    put: async (url: string, data?: any, config?: RequestConfig) => {
        return request(url, { method: 'put', url, data, ...config })
    },
    delete: async (url: string, config?: RequestConfig) => {
        return request(url, { method: 'delete', url, ...config })
    },
}

export const apiGetConfig = () => {
    return api.get('config')
}

export const getPresale = (address: any) => {
    return api.get('presale?address=' + address)
}

export const createPresale = (payload: {amount: number | undefined; address: string | undefined; ext_id: any; currency: string | undefined}) => {
    return api.post('presale', payload)
}