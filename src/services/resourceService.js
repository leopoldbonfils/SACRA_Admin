import api from './api';

const resourceService = {
  getAll:          (params = {}) => api.get('/resources', { params }),
  getById:         (id)          => api.get(`/resources/${id}`),
  upload:          (formData)    => api.post('/resources/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update:          (id, data)    => api.put(`/resources/${id}`, data),
  remove:          (id)          => api.delete(`/resources/${id}`),
  getCategories:   ()            => api.get('/resources/categories'),
  createCategory:  (data)        => api.post('/resources/categories', data),
  deleteCategory:  (id)          => api.delete(`/resources/categories/${id}`),
};
export default resourceService;
