import api from './api';

/**
 * Generic file upload service.
 * Most feature services have their own upload methods,
 * but this provides a centralised general-purpose uploader.
 */
const uploadService = {
  /**
   * Upload a single file.
   * @param {File}   file
   * @param {string} folder  Server-side folder/category
   * @param {Function} [onProgress]  (percent: number) => void
   */
  uploadFile: (file, folder = 'general', onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress
        ? (e) => onProgress(Math.round((e.loaded * 100) / e.total))
        : undefined,
    });
  },

  /**
   * Upload multiple files.
   * @param {File[]} files
   * @param {string} folder
   */
  uploadMultiple: (files, folder = 'general') => {
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));
    formData.append('folder', folder);
    return api.post('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /**
   * Delete a previously uploaded file by its URL or key.
   * @param {string} fileKey
   */
  deleteFile: (fileKey) => api.delete('/upload', { data: { fileKey } }),
};

export default uploadService;
