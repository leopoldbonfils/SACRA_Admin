import api from './api';
import { buildQueryString } from '../utils/helpers';

const researchService = {
  getAll:   (params = {}) => api.get(/research\),
  getById:  (id)          => api.get(/research/\),
  create:   (data)        => api.post('/research', data),
  update:   (id, data)    => api.put(/research/\, data),
  remove:   (id)          => api.delete(/research/\),
  publish:  (id)          => api.patch(/research/\/publish),
};
export default researchService;
