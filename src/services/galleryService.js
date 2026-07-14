import api from './api';
import { buildQueryString } from '../utils/helpers';

const galleryService = {
  getAll:       (params = {}) => api.get(/gallery\),
  getById:      (id)          => api.get(/gallery/\),
  upload:       (formData)    => api.post('/gallery/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update:       (id, data)    => api.put(/gallery/\, data),
  remove:       (id)          => api.delete(/gallery/\),
  getAlbums:    ()            => api.get('/gallery/albums'),
  createAlbum:  (data)        => api.post('/gallery/albums', data),
  deleteAlbum:  (id)          => api.delete(/gallery/albums/\),
};
export default galleryService;
