import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { store } from '../store/store';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        login: {
          title: 'Login',
          description: 'How do I get started?',
          email: 'Enter Email',
          password: 'Enter Password',
          forgot: 'Forgot Password?',
          signIn: 'Sign in',
          welcome: 'Welcome to',
          pleaseFillFields: 'Please Fill Required Fields!',
          enterValidEmail: 'Please enter a valid email',
          enterEmail: 'Please enter your email address',
          enterPassword: 'Please enter your password'
        },
        forgotPassword: {
          title: 'Forgot Password',
          description: 'Enter your registered email address and phone number. We\'ll send you a code to reset your password.',
          email: 'Enter Email',
          sendOTP: 'Send OTP'
        },
        createNewPassword: {
          title: 'Create New Password',
          description: 'Set a new password for your account.',
          newPassword: 'New Password',
          confirmPassword: 'Confirm New Password',
          reset: 'Reset Password',
          enterNewPassword: 'Enter New Password',
          confirmNewPassword: 'Confirm New Password'
        },
        verifyOTP: {
          title: 'Verify OTP',
          description: 'We\'ve sent you a One-Time Password (OTP) to your email',
          email: 'Email',
          otp: 'Enter OTP',
          verify: 'Verify',
          resend: 'Didn\'t Receive the OTP? RESEND IT',
          timeLeft: 'Time Left'
        }
      },
    },
    ar: {
      translation: {
        login: {
          title: 'تسجيل الدخول',
          description: 'كيف أبدأ؟',
          email: 'أدخل البريد الإلكتروني',
          password: 'أدخل كلمة المرور',
          forgot: 'نسيت كلمة المرور؟',
          signIn: 'تسجيل الدخول',
          welcome: 'مرحباً بك في',
          pleaseFillFields: 'يرجى ملء الحقول المطلوبة!',
          enterValidEmail: 'يرجى إدخال بريد إلكتروني صالح',
          enterEmail: 'يرجى إدخال عنوان بريدك الإلكتروني',
          enterPassword: 'يرجى إدخال كلمة المرور'
        },
        forgotPassword: {
          title: 'نسيت كلمة المرور',
          description: 'أدخل بريدك الإلكتروني المسجل أو رقم هاتفك. سنرسل لك رمزًا لإعادة تعيين كلمة المرور.',
          email: 'أدخل البريد الإلكتروني',
          sendOTP: 'إرسال OTP'
        },
        createNewPassword: {
          title: 'إنشاء كلمة مرور جديدة',
          description: 'اضبط كلمة مرور جديدة لحسابك.',
          newPassword: 'كلمة المرور الجديدة',
          confirmPassword: 'تأكيد كلمة المرور الجديدة',
          reset: 'إعادة تعيين كلمة المرور',
          enterNewPassword: 'أدخل كلمة المرور الجديدة',
          confirmNewPassword: 'تأكيد كلمة المرور الجديدة'
        },
        verifyOTP: {
          title: 'تحقق من OTP',
          description: 'لقد أرسلنا إليك كلمة مرور لمرة واحدة (OTP) إلى بريدك الإلكتروني',
          email: 'البريد الإلكتروني',
          otp: 'أدخل OTP',
          verify: 'تحقق',
          resend: 'لم تتلقَ الـ OTP؟ أعد إرسالها',
          timeLeft: 'الوقت المتبقي'
        }
      },
    },
  },
  lng: store.getState().language.language,
  fallbackLng: 'en',
});

// Subscribe to store changes to update language
store.subscribe(() => {
  const currentLanguage = store.getState().language.language;
  if (i18n.language !== currentLanguage) {
    i18n.changeLanguage(currentLanguage);
  }
});

export default i18n;