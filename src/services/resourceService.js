import api from './api';
import { buildQueryString } from '../utils/helpers';

const resourceService = {
  getAll:          (params = {}) => api.get(/resources\),
  getById:         (id)          => api.get(/resources/\),
  upload:          (formData)    => api.post('/resources/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update:          (id, data)    => api.put(/resources/\, data),
  remove:          (id)          => api.delete(/resources/\),
  getCategories:   ()            => api.get('/resources/categories'),
  createCategory:  (data)        => api.post('/resources/categories', data),
  deleteCategory:  (id)          => api.delete(/resources/categories/\),
};
export default resourceService;
