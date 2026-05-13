import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
}

export const businessesAPI = {
  getAll: (skip = 0, limit = 10) => api.get('/businesses/', { params: { skip, limit } }),
  getById: (id) => api.get(`/businesses/${id}`),
}

export const leadsAPI = {
  getAll: () => api.get('/leads/'),
  create: (data) => api.post('/leads/', data),
  update: (id, data) => api.put(`/leads/${id}`, data),
}

export const searchAPI = {
  search: (params) => api.get('/search/businesses', { params }),
}

export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
}

export const aiAPI = {
  getInsights: (businessId) => api.get(`/ai/business/${businessId}`),
}

export default api
