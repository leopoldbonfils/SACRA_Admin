import api from './api';

const eventService = {
  getAll:   (params = {}) => api.get('/events', { params }),
  getById:  (id)          => api.get(`/events/${id}`),
  create:   (data)        => api.post('/events', data),
  update:   (id, data)    => api.put(`/events/${id}`, data),
  remove:   (id)          => api.delete(`/events/${id}`),
  cancel:   (id)          => api.patch(`/events/${id}/cancel`),
};
export default eventService;
