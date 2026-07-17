import api from './api';

const memberService = {
  getAll:         (params = {}) => api.get('/members', { params }),
  getById:        (id)          => api.get(`/members/${id}`),
  create:         (data)        => api.post('/members', data),
  update:         (id, data)    => api.put(`/members/${id}`, data),
  remove:         (id)          => api.delete(`/members/${id}`),
  getRequests:    (params = {}) => api.get('/members/requests', { params }),
  approveRequest: (id)          => api.patch(`/members/requests/${id}/approve`),
  rejectRequest:  (id, reason)  => api.patch(`/members/requests/${id}/reject`, { reason }),
  updateStatus:   (id, status)  => api.patch(`/members/${id}/status`, { status }),
};
export default memberService;
