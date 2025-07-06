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
          enterPassword: 'Please enter your password',
          success: 'Login successful!',
          error: 'Login failed. Please try again.'
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
          resend: 'RESEND IT',
          didntReceive: 'Didn\'t Receive the OTP?',
          timeLeft: 'Time Left'
        },
        sidebar: {
          dashboard: 'Dashboard',
          userManagement: 'User Management',
          providerManagement: 'Provider Management',
          orderManagement: 'Order Management',
          categoryManagement: 'Category Management',
          ratingsManagement: 'Ratings Management',
          paymentManagement: 'Payment Management',
          providerPayout: 'Provider Payout'
        },
        table: {
          name: 'Name',
          email: 'Email',
          category: 'Category',
          status: 'Status',
          verified: 'Verified',
          action: 'Action',
        },
        search: {
          byName: 'By Name',
          byEmail: 'By Email',
          byCategory: 'By Category',
          byStatus: 'By Status',
          searchName: 'Search Name',
          searchEmail: 'Search Email',
          searchCategory: 'Search Category',
          searchStatus: 'Search Status'
        },
        tabs: {
          all: 'All',
          approved: 'Approved',
          pendingRequests: 'Pending Requests',
          rejected: 'Rejected',
          deactivated: 'Deactivated'
        },
        pagination: {
          showing: 'Showing',
          of: 'of',
          first: '<< First',
          back: '< Back',
          next: 'Next >',
          last: 'Last >>'
        },
        providerDetail: {
          title: 'Provider Detail',
          approve: 'Approve',
          deactivate: 'Deactivate',
          reject: 'Reject',
          information: 'Provider Information',
          name: 'Provider Name',
          email: 'Email Address',
          phone: 'Phone Number',
          dateRegistered: 'Date Registered',
          categories: 'Categories',
          noCategories: 'No categories assigned',
          location: 'Location',
          noLocation: 'Location not available',
          status: 'Status',
          verified: 'Verified',
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
          enterPassword: 'يرجى إدخال كلمة المرور',
          success: 'تم تسجيل الدخول بنجاح!',
          error: 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.'
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
          title: 'تحقق من مكتب المدعي العام',
          description: 'لقد أرسلنا إليك كلمة مرور لمرة واحدة (مكتب المدعي العام) إلى بريدك الإلكتروني',
          email: 'البريد الإلكتروني',
          otp: 'أدخل مكتب المدعي العام',
          verify: 'تحقق',
          resend: 'أعد إرسالها',
          didntReceive: 'لم تتلقَ الـ مكتب المدعي العام؟',
          timeLeft: 'الوقت المتبقي'
        },
        sidebar: {
          dashboard: 'لوحة التحكم',
          userManagement: 'إدارة المستخدمين',
          providerManagement: 'إدارة المزودين',
          orderManagement: 'إدارة الطلبات',
          categoryManagement: 'إدارة الفئات',
          ratingsManagement: 'إدارة التقييمات',
          paymentManagement: 'إدارة المدفوعات',
          providerPayout: 'دفع المزودين'
        },
        table: {
          name: 'الاسم',
          email: 'البريد الإلكتروني',
          category: 'الفئة',
          status: 'الحالة',
          verified: 'متحقق',
          action: 'الإجراء',
        },
        search: {
          byName: 'بالاسم',
          byEmail: 'بالبريد الإلكتروني',
          byCategory: 'بالفئة',
          byStatus: 'بالحالة',
          searchName: 'البحث بالاسم',
          searchEmail: 'البحث بالبريد الإلكتروني',
          searchCategory: 'البحث بالفئة',
          searchStatus: 'البحث بالحالة'
        },
        tabs: {
          all: 'الكل',
          approved: 'موافق عليه',
          pendingRequests: 'طلبات معلقة',
          rejected: 'مرفوض',
          deactivated: 'معطل'
        },
        pagination: {
          showing: 'عرض',
          of: 'من',
          first: '<< الأول',
          back: '< السابق',
          next: 'التالي >',
          last: 'الأخير >>'
        },
        providerDetail: {
          title: 'تفاصيل المزود',
          approve: 'موافقة',
          deactivate: 'إلغاء التفعيل',
          reject: 'رفض',
          information: 'معلومات المزود',
          name: 'اسم المزود',
          email: 'عنوان البريد الإلكتروني',
          phone: 'رقم الهاتف',
          dateRegistered: 'تاريخ التسجيل',
          categories: 'الفئات',
          noCategories: 'لم يتم تعيين فئات',
          location: 'الموقع',
          noLocation: 'الموقع غير متاح',
          status: 'الحالة',
          verified: 'متحقق',
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