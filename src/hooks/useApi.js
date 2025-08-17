import { useState, useCallback } from 'react';
import { apiService } from '../services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeRequest = useCallback(async (apiCall, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall(...args);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await executeRequest(apiService.login, email, password);
      
      console.log('Full login response:', response);
      console.log('Response.result:', response.result);
      console.log('Response.result.access_token:', response.result?.access_token);
      
      // Save the access token to localStorage
      // Handle different possible token field names
      let token = response.result?.access_token || response.token || response.accessToken;
      console.log('Raw token from response:', token, 'Type:', typeof token);
      
      // If token is an object, extract the actual token value
      if (token && typeof token === 'object') {
        // Try to get the actual token value from the object
        if (token.token) {
          token = token.token;
        } else if (token.value) {
          token = token.value;
        } else if (token.access_token) {
          token = token.access_token;
        } else {
          // If we can't find a specific field, try to get the first string value
          const values = Object.values(token);
          const stringValue = values.find(val => typeof val === 'string' && val.length > 10);
          if (stringValue) {
            token = stringValue;
          } else {
            console.warn('Could not extract token from object:', token);
            token = null;
          }
        }
        console.log('Token after extraction:', token);
      }
      
      if (token && typeof token === 'string' && token.length > 10) {
        localStorage.setItem('access_token', token);
        console.log('Access token saved:', token);
      } else {
        console.warn('No valid access token found in response:', response);
        console.log('Token value:', token, 'Type:', typeof token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }, [executeRequest]);

  const getProviders = useCallback(async (page = 1, limit = 10) => {
    try {
      const response = await executeRequest(apiService.getProviders, page, limit);
      return response;
    } catch (error) {
      throw error;
    }
  }, [executeRequest]);

  const getUsers = useCallback(async (page = 1, limit = 10) => {
    try {
      const response = await executeRequest(apiService.getUsers, page, limit);
      return response;
    } catch (error) {
      throw error;
    }
  }, [executeRequest]);

  const updateUserTries = useCallback(async (userId, tries) => {
    try {
      const response = await executeRequest(apiService.updateUserTries, userId, tries);
      return response;
    } catch (error) {
      throw error;
    }
  }, [executeRequest]);

  const deactivateUser = useCallback(async (userId) => {
    try {
      const response = await executeRequest(apiService.deactivateUser, userId);
      return response;
    } catch (error) {
      throw error;
    }
  }, [executeRequest]);

  const approveProvider = useCallback(async (providerId) => {
    try {
      const response = await executeRequest(apiService.approveProvider, providerId);
      return response;
    } catch (error) {
      throw error;
    }
  }, [executeRequest]);

  return {
    loading,
    error,
    login,
    getProviders,
    getUsers,
    updateUserTries,
    deactivateUser,
    approveProvider,
  };
}; 