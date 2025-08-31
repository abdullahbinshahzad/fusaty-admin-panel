import { getAccessToken } from '../utils/auth';
import { API_ENDPOINTS } from '../utils/constants';

const API_BASE_URL = 'http://15.185.106.143/api';

export const apiService = {
  makeRequest: async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const accessToken = getAccessToken();
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
        ...options.headers,
      },
    };

    const config = {
      ...defaultOptions,
      ...options,
    };

    // Debug: Log the request details
    console.log('API Request:', {
      url,
      method: config.method || 'GET',
      headers: config.headers,
      hasToken: !!accessToken,
      tokenValue: accessToken,
      tokenType: typeof accessToken,
    });

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  login: async (email, password) => {
    return apiService.makeRequest(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  getProviders: async (page = 1, limit = 10) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    return apiService.makeRequest(`${API_ENDPOINTS.GET_PROVIDERS}?${queryParams}`, {
      method: 'GET',
    });
  },

  getUsers: async (page = 1, limit = 10) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    return apiService.makeRequest(`${API_ENDPOINTS.GET_USERS}&${queryParams}`, {
      method: 'GET',
    });
  },

  approveProvider: async (providerId) => {
    return apiService.makeRequest(`${API_ENDPOINTS.APPROVE_PROVIDER}?providerId=${providerId}`, {
      method: 'PATCH',
    });
  },

  forgotPassword: async (email) => {
    return apiService.makeRequest(API_ENDPOINTS.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  verifyOTP: async (email, resetPasswordOtp) => {
    return apiService.makeRequest(API_ENDPOINTS.VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify({ email, resetPasswordOtp }),
    });
  },

  resetPassword: async (password, otp) => {
    return apiService.makeRequest(`${API_ENDPOINTS.RESET_PASSWORD}?resetPasswordOtp=${otp}`, {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },

  resendOTP: async (email) => {
    return apiService.makeRequest(API_ENDPOINTS.RESEND_OTP, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  updateUserTries: async (userId, tries) => {
    return apiService.makeRequest(`${API_ENDPOINTS.UPDATE_TRIES}/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ tries: tries }),
    });
  },

  deactivateUser: async (userId) => {
    return apiService.makeRequest(`${API_ENDPOINTS.DEACTIVATE_USER}/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive: false }),
    });
  },

  getCategories: async (page = 1, limit = 10, level = 0, isActive = true) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      level: level.toString(),
      isActive: isActive.toString(),
    });
    
    return apiService.makeRequest(`${API_ENDPOINTS.GET_CATEGORIES}?${queryParams}`, {
      method: 'GET',
    });
  },

  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const accessToken = getAccessToken();
    const url = `${API_BASE_URL}${API_ENDPOINTS.UPLOAD_FILE}`;
    
    const config = {
      method: 'POST',
      headers: {
        ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
      },
      body: formData,
    };

    // Debug: Log the upload request details
    console.log('File Upload Request:', {
      url,
      method: config.method,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      hasToken: !!accessToken,
    });

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  },

  createCategory: async (categoryData) => {
    return apiService.makeRequest(API_ENDPOINTS.CREATE_CATEGORY, {
      method: 'POST',
      body: JSON.stringify({
        name: categoryData.name,
        description: categoryData.description,
        imageUrl: categoryData.imageUrl,
      }),
    });
  },

  createSubCategory: async (categoryId, subCategoryData) => {
    const endpoint = API_ENDPOINTS.CREATE_SUB_CATEGORY.replace('{categoryId}', categoryId);
    return apiService.makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        name: subCategoryData.name,
        description: subCategoryData.description,
        imageUrl: subCategoryData.imageUrl,
      }),
    });
  },

  createSubToSubCategory: async (subCategoryId, subToSubCategoryData) => {
    const endpoint = API_ENDPOINTS.CREATE_SUB_TO_SUB_CATEGORY.replace('{subCategoryId}', subCategoryId);
    return apiService.makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        name: subToSubCategoryData.name,
        description: subToSubCategoryData.description,
        imageUrl: subToSubCategoryData.imageUrl,
      }),
    });
  },

  updateCategory: async (id, categoryData) => {
    const endpoint = API_ENDPOINTS.UPDATE_CATEGORY.replace(':id', id);
    return apiService.makeRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        name: categoryData.name,
        description: categoryData.description,
        imageUrl: categoryData.imageUrl,
      }),
    });
  },

  updateSubCategory: async (id, subCategoryData) => {
    const endpoint = API_ENDPOINTS.UPDATE_SUB_CATEGORY.replace(':id', id);
    return apiService.makeRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        name: subCategoryData.name,
        description: subCategoryData.description,
        imageUrl: subCategoryData.imageUrl,
      }),
    });
  },

  updateSubToSubCategory: async (id, subToSubCategoryData) => {
    const endpoint = API_ENDPOINTS.UPDATE_SUB_TO_SUB_CATEGORY.replace(':id', id);
    return apiService.makeRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        name: subToSubCategoryData.name,
        description: subToSubCategoryData.description,
        imageUrl: subToSubCategoryData.imageUrl,
      }),
    });
  },

  deleteCategory: async (id) => {
    const endpoint = API_ENDPOINTS.DELETE_CATEGORY.replace(':id', id);
    return apiService.makeRequest(endpoint, {
      method: 'DELETE',
    });
  },

  deleteSubCategory: async (id) => {
    const endpoint = API_ENDPOINTS.DELETE_SUB_CATEGORY.replace(':id', id);
    return apiService.makeRequest(endpoint, {
      method: 'DELETE',
    });
  },

  deleteSubToSubCategory: async (id) => {
    const endpoint = API_ENDPOINTS.DELETE_SUB_TO_SUB_CATEGORY.replace(':id', id);
    return apiService.makeRequest(endpoint, {
      method: 'DELETE',
    });
  },
};
