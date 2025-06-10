import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const VerifyOTP = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex w-full max-w-4xl">
        <div className="w-1/2 bg-purple-600 p-8 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-4xl font-bold">?</div>
          </div>
        </div>
        <div className="w-1/2 p-8 bg-gray-800 text-white">
          <h2 className="text-2xl font-bold mb-4">{t('verifyOTP.title')}</h2>
          <p className="text-sm mb-6">{t('verifyOTP.description')}</p>
          <Input label={t('verifyOTP.email')} type="email" value="123@gmail.com" className="bg-gray-700 text-white mb-4" />
          <Input label={t('verifyOTP.otp')} type="text" className="bg-gray-700 text-white" />
          <p className="text-sm text-gray-400 mb-6">01:00</p>
          <Button>{t('verifyOTP.verify')}</Button>
          <p className="text-purple-600 text-sm mt-2">{t('verifyOTP.resend')}</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;