import api from './api';
import { buildQueryString } from '../utils/helpers';

const contactService = {
  getAll:    (params = {}) => api.get(/contact\),
  getById:   (id)          => api.get(/contact/\),
  markRead:  (id)          => api.patch(/contact/\/read),
  reply:     (id, message) => api.post(/contact/\/reply, { message }),
  remove:    (id)          => api.delete(/contact/\),
  getUnread: ()            => api.get('/contact/unread/count'),
};
export default contactService;
