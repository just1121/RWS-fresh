import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ selectedOptions, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('rws_painpoints');
      console.log('Pain Points in Modal:', JSON.parse(savedData));
      
      const timer = setTimeout(() => {
        navigate('/signup?fromPainPoints=true');
      }, 2000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Modal Error:', error);
    }
  }, [selectedOptions, navigate]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-200 to-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img 
            src="RWS-Logo-white.png"
            alt="RWS Logo" 
            className="h-16 w-auto"
          />
        </div>
        
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          We've recorded your selections
        </h2>
        
        <div className="flex items-center justify-center mb-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
          <p className="ml-3 text-gray-600">
            Loading assessment preferences...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;