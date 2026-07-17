import api from './api';

const researchService = {
  getAll:   (params = {}) => api.get('/research', { params }),
  getById:  (id)          => api.get(`/research/${id}`),
  create:   (data)        => api.post('/research', data),
  update:   (id, data)    => api.put(`/research/${id}`, data),
  remove:   (id)          => api.delete(`/research/${id}`),
  publish:  (id)          => api.patch(`/research/${id}/publish`),
};
export default researchService;
