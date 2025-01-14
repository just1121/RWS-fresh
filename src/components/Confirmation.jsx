import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Confirmation() {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);

  useEffect(() => {
    const savedData = window.localStorage.getItem('bookingData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error parsing data:', error);
      }
    }
  }, []);

  const sendConfirmationEmail = async () => {
    if (!formData) return;

    try {
      const response = await fetch('https://us-central1-recovered-water-solutions.cloudfunctions.net/handleBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          requestType: 'email-only'
        })
      });

      if (response.ok) {
        setEmailSent(true);
        window.localStorage.removeItem('bookingData');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('❌ Error sending email:', error);
    }
  };

  const sendConfirmationSMS = async () => {
    if (!formData) return;

    try {
      const response = await fetch('https://us-central1-recovered-water-solutions.cloudfunctions.net/handleBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          requestType: 'sms-only'
        })
      });

      if (response.ok) {
        setSmsSent(true);
        window.localStorage.removeItem('bookingData');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('❌ Error sending SMS:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-white p-6">
      <div className="max-w-md mx-auto mb-6">
        <img 
          src="/RWS-Logo-white.png" 
          alt="RWS Logo" 
          className="h-16 w-auto mx-auto"
        />
      </div>
      
      <div className="max-w-md mx-auto bg-blue-50 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Water Risk Assessment Preferences</h2>
        
        {formData ? (
          <>
            <p className="mb-2">Name: {formData.fullName}</p>
            <p className="mb-2">Email: {formData.email}</p>
            <p className="mb-2">Phone: {formData.phone}</p>
            <p className="mb-2">First Choice: {formData.firstChoice}</p>
            <p className="mb-2">Second Choice: {formData.secondChoice}</p>
            <p className="mb-4">Facility: {formData.facility}</p>

            <div className="space-y-4">
              <button
                onClick={sendConfirmationEmail}
                disabled={emailSent}
                className="w-full bg-blue-500 text-white text-lg px-4 py-3 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {emailSent ? 'Email Sent!' : 'Email me these details'}
              </button>

              <button
                onClick={() => {
                  setNewPhone(formData.phone || '');
                  setShowPhoneModal(true);
                }}
                disabled={smsSent || !smsConsent}
                className="w-full bg-gray-400 text-white text-lg px-4 py-3 rounded hover:bg-gray-500 disabled:opacity-50"
              >
                {smsSent ? 'Text Sent!' : 'Text me these details'}
              </button>

              <div className="mt-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    className="w-6 h-6 mt-1 cursor-pointer rounded border-gray-300"
                  />
                  <span className="text-gray-600 text-base leading-relaxed">
                    By checking this box, I consent to receive a one-time SMS confirmation 
                    of my Water Risk Assessment preferences. Message and data rates may apply.
                  </span>
                </label>
              </div>
            </div>
          </>
        ) : (
          <div>
            <p className="mb-6 text-lg">No booking data available</p>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-3">SMS Messaging Policy</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                When booking a Water Risk Assessment, users may opt-in to receive a one-time SMS confirmation 
                of their preferences. Message and data rates may apply.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-md mx-auto mt-8 text-center">
        <img 
          src="/Unified-Symposium-Logo.svg" 
          alt="Unified Symposium Logo" 
          className="h-20 w-auto mx-auto mb-2"
        />
        <p className="text-[#b72956] text-xl font-semibold mt-2">
          Booth 1222 (Winesecrets)
        </p>
      </div>

      {showPhoneModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold mb-4">Confirm or Update Mobile Number</h3>
            <input 
              type="tel" 
              className="w-full border p-2 mb-4 rounded"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <button 
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowPhoneModal(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => {
                  sendConfirmationSMS(newPhone);
                  setShowPhoneModal(false);
                }}
              >
                Send Text
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}