import api from './api';
import { buildQueryString } from '../utils/helpers';

const eventService = {
  getAll:   (params = {}) => api.get(/events\),
  getById:  (id)          => api.get(/events/\),
  create:   (data)        => api.post('/events', data),
  update:   (id, data)    => api.put(/events/\, data),
  remove:   (id)          => api.delete(/events/\),
  cancel:   (id)          => api.patch(/events/\/cancel),
};
export default eventService;
