export const API_ENDPOINTS = {
    LOGIN: '/user/login',
    FORGOT_PASSWORD: '/user/forgot-password',
    RESET_PASSWORD: '/user/reset-password',
    VERIFY_OTP: '/user/verify-reset-otp',
    RESEND_OTP: '/user/resend-otp',
    GET_USERS: '/user/by-role?role=user',
    UPDATE_TRIES: '/admin/edit-user-tries',
    DEACTIVATE_USER: '/admin/deactivate-user',
    GET_PROVIDERS: '/admin/get-providers',
    APPROVE_PROVIDER: '/admin/approve-provider',
  };