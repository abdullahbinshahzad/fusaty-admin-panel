import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        login: {
          title: 'Login',
          description: 'How do I get started lorem ipsum dolor sit?',
          email: 'Enter Email',
          password: 'Enter Password',
          forgot: 'Forgot Password?',
          signIn: 'Sign in',
        },
        forgotPassword: {
          title: 'Forgot Password',
          description: 'Enter your registered email or phone number. We’ll send you a code to reset your password.',
          email: 'Enter Email',
          sendOTP: 'Send OTP',
        },
        createNewPassword: {
          title: 'Create New Password',
          description: 'Set a new password for your account.',
          newPassword: 'New Password',
          confirmPassword: 'Confirm New Password',
          reset: 'Reset Password',
        },
        verifyOTP: {
          title: 'Verify OTP',
          description: 'We’ve sent you a One-Time Password (OTP) to your email',
          email: 'Email',
          otp: 'Enter OTP',
          verify: 'Verify',
          resend: 'Didn’t Receive the OTP? RESEND IT',
        },
      },
    },
    ar: {
      translation: {
        login: {
          title: 'تسجيل الدخول',
          description: 'كيف أبدأ lorem ipsum dolor sit؟',
          email: 'أدخل البريد الإلكتروني',
          password: 'أدخل كلمة المرور',
          forgot: 'نسيت كلمة المرور؟',
          signIn: 'تسجيل الدخول',
        },
        forgotPassword: {
          title: 'نسيت كلمة المرور',
          description: 'أدخل بريدك الإلكتروني المسجل أو رقم هاتفك. سنرسل لك رمزًا لإعادة تعيين كلمة المرور.',
          email: 'أدخل البريد الإلكتروني',
          sendOTP: 'إرسال OTP',
        },
        createNewPassword: {
          title: 'إنشاء كلمة مرور جديدة',
          description: 'اضبط كلمة مرور جديدة لحسابك.',
          newPassword: 'كلمة المرور الجديدة',
          confirmPassword: 'تأكيد كلمة المرور الجديدة',
          reset: 'إعادة تعيين كلمة المرور',
        },
        verifyOTP: {
          title: 'تحقق من OTP',
          description: 'لقد أرسلنا إليك كلمة مرور لمرة واحدة (OTP) إلى بريدك الإلكتروني',
          email: 'البريد الإلكتروني',
          otp: 'أدخل OTP',
          verify: 'تحقق',
          resend: 'لم تتلقَ الـ OTP؟ أعد إرسالها',
        },
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;