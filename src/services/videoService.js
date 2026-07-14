import api from './api';
import { buildQueryString } from '../utils/helpers';

const videoService = {
  getAll:   (params = {}) => api.get(/videos\),
  getById:  (id)          => api.get(/videos/\),
  create:   (data)        => api.post('/videos', data),
  update:   (id, data)    => api.put(/videos/\, data),
  remove:   (id)          => api.delete(/videos/\),
};
export default videoService;
