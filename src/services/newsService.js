import api from './api';

const newsService = {
  getAll:   (params = {}) => api.get('/news', { params }),
  getById:  (id)          => api.get(`/news/${id}`),
  create:   (data)        => api.post('/news', data),
  update:   (id, data)    => api.put(`/news/${id}`, data),
  remove:   (id)          => api.delete(`/news/${id}`),
  publish:  (id)          => api.patch(`/news/${id}/publish`),
  archive:  (id)          => api.patch(`/news/${id}/archive`),
};
export default newsService;
