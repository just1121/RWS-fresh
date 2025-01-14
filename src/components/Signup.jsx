import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({ isDirectSignup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstChoice: '',
    secondChoice: '',
    fullName: '',
    email: '',
    phone: '',
    facility: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form Data:', formData);
    console.log('Is Direct Signup:', isDirectSignup);
    console.log('URL Search:', window.location.search);
    
    const painPointsData = localStorage.getItem('rws_painpoints');
    console.log('Pain Points from localStorage:', painPointsData);
    
    const parsedPainPoints = painPointsData ? JSON.parse(painPointsData) : {};
    
    const painPointsText = {
      'Source 1': 'Soaring water bills pressuring your bottom line?',
      'Source 2': 'Is well water or aquifer access at risk?',
      'Usage 1': 'Are hidden water inefficiencies draining resources?',
      'Usage 2': 'Is water conservation a priority for your operation?',
      'Usage 3': 'Are you interested in ZLD/ZLW?',
      'Disposal 1': 'Do General Order requirements feel overwhelming?',
      'Disposal 2': 'Rising hauling fees giving you anxiety?',
      'Disposal 3': 'Is your lagoon imperiled?'
    };

    const dataToSend = {
      ...formData,
      timestamp: new Date().toISOString(),
      requestType: 'signup-only',
      'Source 1': parsedPainPoints['Source 1'] === 'Yes' ? painPointsText['Source 1'] : 'No',
      'Source 2': parsedPainPoints['Source 2'] === 'Yes' ? painPointsText['Source 2'] : 'No',
      'Usage 1': parsedPainPoints['Usage 1'] === 'Yes' ? painPointsText['Usage 1'] : 'No',
      'Usage 2': parsedPainPoints['Usage 2'] === 'Yes' ? painPointsText['Usage 2'] : 'No',
      'Usage 3': parsedPainPoints['Usage 3'] === 'Yes' ? painPointsText['Usage 3'] : 'No',
      'Disposal 1': parsedPainPoints['Disposal 1'] === 'Yes' ? painPointsText['Disposal 1'] : 'No',
      'Disposal 2': parsedPainPoints['Disposal 2'] === 'Yes' ? painPointsText['Disposal 2'] : 'No',
      'Disposal 3': parsedPainPoints['Disposal 3'] === 'Yes' ? painPointsText['Disposal 3'] : 'No'
    };

    console.log('Final Data to Send:', JSON.stringify(dataToSend, null, 2));
    
    try {
      console.log('Sending data to server:', JSON.stringify(dataToSend, null, 2));
      
      const response = await fetch('https://us-central1-recovered-water-solutions.cloudfunctions.net/handleBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);
  
      if (!response.ok) {
        console.error('Server response:', responseText);
        throw new Error(responseText || response.statusText);
      }
  
      // Try to parse the response if it's JSON
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('✅ Server Response:', responseData);
      } catch (e) {
        console.log('Response was not JSON:', responseText);
      }
      
      // Save form data to localStorage
      window.localStorage.setItem('bookingData', JSON.stringify(formData));
      
      // Only clear painpoints after successful write
      console.log('Clearing painpoints from localStorage');
      localStorage.removeItem('rws_painpoints');
      
      navigate('/confirmation');
      
    } catch (error) {
      console.error('❌ Error:', error);
      // Don't clear localStorage on error
      alert('There was an error submitting the form. Please try again.');
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
        <h2 className="text-2xl font-bold mb-6 text-center">
          When do you prefer to schedule your Water Risk Assessment?
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Choice
            </label>
            <select
              name="firstChoice"
              value={formData.firstChoice}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a month</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Second Choice
            </label>
            <select
              name="secondChoice"
              value={formData.secondChoice}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a month</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Winery/Water Facility
            </label>
            <input
              type="text"
              name="facility"
              value={formData.facility}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
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

export default Signup;