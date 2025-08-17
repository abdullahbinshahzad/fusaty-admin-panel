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
};
