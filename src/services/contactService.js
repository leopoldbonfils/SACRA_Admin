import api from './api';

const contactService = {
  getAll:    (params = {}) => api.get('/contact', { params }),
  getById:   (id)          => api.get(`/contact/${id}`),
  markRead:  (id)          => api.patch(`/contact/${id}/read`),
  reply:     (id, message) => api.post(`/contact/${id}/reply`, { message }),
  remove:    (id)          => api.delete(`/contact/${id}`),
  getUnread: ()            => api.get('/contact/unread/count'),
};
export default contactService;
