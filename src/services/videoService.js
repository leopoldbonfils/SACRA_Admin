import api from './api';

const videoService = {
  getAll:   (params = {}) => api.get('/videos', { params }),
  getById:  (id)          => api.get(`/videos/${id}`),
  create:   (data)        => api.post('/videos', data),
  update:   (id, data)    => api.put(`/videos/${id}`, data),
  remove:   (id)          => api.delete(`/videos/${id}`),
};
export default videoService;
