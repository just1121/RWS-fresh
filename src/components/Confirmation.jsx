import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Confirmation() {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState(null);

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
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('❌ Error sending email:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-white p-6">
      <div className="max-w-md mx-auto mb-6">
        <Link to="/" className="block">
          <img 
            src="/RWS-Logo-RGB.png" 
            alt="RWS Logo" 
            className="h-16 w-auto mx-auto hover:opacity-90 transition-opacity duration-200"
          />
        </Link>
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
                style={{ touchAction: 'manipulation' }}
                onTouchStart={(e) => e.preventDefault()}
              >
                {emailSent ? 'Email Sent!' : 'Email me these details'}
              </button>
            </div>
          </>
        ) : (
          <div>
            <p className="mb-6 text-lg">No data available</p>
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
    </div>
  );
}