import api from './api';

const galleryService = {
  getAll:       (params = {}) => api.get('/gallery', { params }),
  getById:      (id)          => api.get(`/gallery/${id}`),
  upload:       (formData)    => api.post('/gallery/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update:       (id, data)    => api.put(`/gallery/${id}`, data),
  remove:       (id)          => api.delete(`/gallery/${id}`),
  getAlbums:    ()            => api.get('/gallery/albums'),
  createAlbum:  (data)        => api.post('/gallery/albums', data),
  deleteAlbum:  (id)          => api.delete(`/gallery/albums/${id}`),
};
export default galleryService;
