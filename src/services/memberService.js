import api from './api';
import { buildQueryString } from '../utils/helpers';

const memberService = {
  getAll:         (params = {}) => api.get(/members\),
  getById:        (id)          => api.get(/members/\),
  create:         (data)        => api.post('/members', data),
  update:         (id, data)    => api.put(/members/\, data),
  remove:         (id)          => api.delete(/members/\),
  getRequests:    (params = {}) => api.get(/members/requests\),
  approveRequest: (id)          => api.patch(/members/requests/\/approve),
  rejectRequest:  (id, reason)  => api.patch(/members/requests/\/reject, { reason }),
  updateStatus:   (id, status)  => api.patch(/members/\/status, { status }),
};
export default memberService;
