import React, { useState, useEffect } from 'react';
import Preloader from './Preloader';

const PreloaderExample = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('en'); // 'en' or 'fa'

  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fa' : 'en');
  };

  return (
    <div>
      {/* Language Toggle Button */}
      <div style={{ 
        position: 'fixed', 
        top: '20px', 
        right: '20px', 
        zIndex: 10000,
        background: '#2563eb',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontFamily: 'Arial, sans-serif'
      }} onClick={toggleLanguage}>
        {language === 'en' ? 'فارسی' : 'English'}
      </div>

      {/* Preloader Component */}
      <Preloader isVisible={isLoading} language={language} />

      {/* Main Content (shown after loading) */}
      {!isLoading && (
        <div style={{
          padding: '50px',
          textAlign: 'center',
          fontFamily: language === 'fa' ? 'Vazirmatn, Tahoma, sans-serif' : 'Inter, Arial, sans-serif',
          direction: language === 'fa' ? 'rtl' : 'ltr'
        }}>
          <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>
            {language === 'fa' ? 'خوش آمدید!' : 'Welcome!'}
          </h1>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
            {language === 'fa' 
              ? 'محتوای سایت شما اینجا نمایش داده می‌شود. کامپوننت preloader با موفقیت کار می‌کند.'
              : 'Your website content will be displayed here. The preloader component is working successfully.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default PreloaderExample;
