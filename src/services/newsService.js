import api from './api';
import { buildQueryString } from '../utils/helpers';

const newsService = {
  getAll:   (params = {}) => api.get(/news\),
  getById:  (id)          => api.get(/news/\),
  create:   (data)        => api.post('/news', data),
  update:   (id, data)    => api.put(/news/\, data),
  remove:   (id)          => api.delete(/news/\),
  publish:  (id)          => api.patch(/news/\/publish),
  archive:  (id)          => api.patch(/news/\/archive),
};
export default newsService;
