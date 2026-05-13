import axios from 'axios'

// Create axios instance
const API = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Business API endpoints
export const businessAPI = {
  // Get all businesses
  getAll: (page = 1, perPage = 10) =>
    API.get('/api/businesses/', { params: { page, per_page: perPage } }),

  // Search businesses
  search: (filters) => API.get('/api/businesses/search', { params: filters }),

  // Get single business
  getById: (id) => API.get(`/api/businesses/${id}`),

  // Create business
  create: (data) => API.post('/api/businesses/', data),

  // Update business
  update: (id, data) => API.put(`/api/businesses/${id}`, data),

  // Delete business
  delete: (id) => API.delete(`/api/businesses/${id}`),

  // Get statistics
  getStats: () => ({
    categories: API.get('/api/businesses/stats/categories'),
    cities: API.get('/api/businesses/stats/cities'),
  }),
}

export default API
