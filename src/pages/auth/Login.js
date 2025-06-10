import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex w-full max-w-4xl">
        <div className="w-1/2 bg-purple-600 p-8 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-2xl font-bold">Welcome to</h1>
            <div className="text-4xl font-bold mt-4">ED</div>
          </div>
        </div>
        <div className="w-1/2 p-8 bg-gray-800 text-white">
          <h2 className="text-2xl font-bold mb-4">{t('login.title')}</h2>
          <p className="text-sm mb-6">{t('login.description')}</p>
          <Input label={t('login.email')} type="email" className="bg-gray-700 text-white" />
          <Input label={t('login.password')} type="password" className="bg-gray-700 text-white" />
          <a href="/forgot-password" className="text-purple-600 text-sm mb-4 block">{t('login.forgot')}</a>
          <Button>{t('login.signIn')}</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;