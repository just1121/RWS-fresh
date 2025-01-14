import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PainPoints from './components/PainPoints';
import Modal from './components/Modal';
import Signup from './components/Signup';
import Confirmation from './components/Confirmation';

function AppContent() {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showStayConnected, setShowStayConnected] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const PageOne = () => (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Take 20 seconds to learn more about{' '}
        <span 
          className="relative inline-block cursor-pointer group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          our*
          {isHovering && <InfoPopup />}
        </span>{' '}
        <span className="relative inline-block">
          <span className="text-black">FREE</span>
          <span 
            className="absolute -bottom-1 left-0 w-full h-[3px] bg-yellow-300"
            style={{ 
              transform: 'rotate(-2deg)',
              zIndex: 0
            }}
          ></span>
        </span>{' '}
        Water Risk Assessment for your winery or water facility.
      </h2>

      <div className="space-y-4">
        <button 
          onClick={() => setShowStayConnected(true)}
          className="w-full p-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
          style={{ 
            border: '1px solid rgb(86,177,223)'
          }}
        >
          Thanks, but our winery has perfect water balance.
        </button>

        <button 
          onClick={() => {
            setCurrentPage(2);
            navigate('/painpoints');
          }} 
          className="w-full p-2 rounded-lg text-white font-semibold hover:opacity-90"
          style={{ backgroundColor: 'rgb(86,177,223)' }}
        >
          Sure, I have 20 seconds to learn more...
        </button>

        <div className="text-left mt-2">
          <span 
            className="text-sm text-gray-500 cursor-pointer font-semibold"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            * About RWS
            {isHovering && <InfoPopup />}
          </span>
        </div>
      </div>
    </>
  );

  const PageTwo = () => {
    useEffect(() => {
      if (selectedOptions.length > 0) {
        const timer = setTimeout(() => {
          setCurrentPage(1);
          setSelectedOptions([]);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [selectedOptions]);

    return (
      <>
        <button 
          onClick={() => setCurrentPage(1)}
          className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>

        <p className="text-sm text-gray-500 text-center mb-4">
          Select all that apply or are adjacent to your needs
        </p>
      </>
    );
  };

  const StayConnectedPage = () => {
    useEffect(() => {
      if (hasConsent && smsSent) {
        const timer = setTimeout(() => {
          setShowStayConnected(false);
          setCurrentPage(1);
          setHasConsent(false);
          setSmsSent(false);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [hasConsent, smsSent]);

    return (
      <div className="text-center">
        <h3 className="text-xl font-bold mb-6">Feel free to reach out when you need water management expertise.</h3>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div 
                onClick={() => {
                  if (hasConsent) {
                    setShowPhoneInput(true);
                  }
                }}
                className={`w-full text-left pl-4 ${
                  hasConsent 
                    ? 'text-blue-500 hover:text-blue-600 cursor-pointer' 
                    : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                → Text Me Contact Info
              </div>
              
              <p 
                className="text-sm text-gray-600 pl-8 cursor-pointer text-left"
                onClick={() => setHasConsent(!hasConsent)}
                style={{ textAlign: 'left' }}
              >
                By clicking here, you agree to receive a single text message from RWS with contact info. Message and data rates may apply.
              </p>
            </div>

            <a 
              href="/eric-dahlberg.vcf" 
              download
              className="block text-left pl-4 text-blue-500 hover:text-blue-600 mb-8"
            >
              → Download vCard
            </a>

            <div className="border-t border-gray-200 my-8"></div>

            <button 
              onClick={() => {
                setShowStayConnected(false);
                setCurrentPage(2);
                navigate('/painpoints');
              }}
              className="w-full p-3 rounded-lg text-white hover:opacity-90"
              style={{ backgroundColor: '#4CAF50' }}
            >
              I changed my mind, let me see if I need a FREE water risk assessment
            </button>

            <div className="border-t border-gray-200 my-8"></div>

            <div className="flex justify-center space-x-8">
              <a 
                href="https://recwatersolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-white hover:bg-gray-50 border border-gray-200"
              >
                <img 
                  src="/RWS-Logo-RGB.png"
                  alt="RWS Website" 
                  className="h-8 w-auto"
                />
              </a>
              <a 
                href="https://winesecrets.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-white hover:bg-gray-50 border border-gray-200"
              >
                <img 
                  src="/WS Logo.png"
                  alt="Winesecrets Website" 
                  className="h-8 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handlePerfectBalance = () => {
    setShowStayConnected(true);
  };

  const InfoPopup = () => (
    <div 
      className="absolute left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 z-50 w-64"
      style={{ 
        top: '100%',
        marginTop: '8px',
        width: '300px'
      }}
    >
      <div className="flex justify-center mb-3">
        <img 
          src="/RWS-Logo-RGB.png"
          alt="RWS Logo" 
          className="h-10 w-auto"
        />
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">
        RWS, with 20+ years of expertise, transforms water uncertainty into security with advanced filtration and custom recovery plans that maximize reuse, recycling, and efficiency for your facility.
      </p>
      <div 
        className="absolute -top-2 left-1/2 transform -translate-x-1/2"
        style={{
          width: '0',
          height: '0',
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: '8px solid white'
        }}
      ></div>
    </div>
  );

  const handleSendSMS = async () => {
    if (!phoneNumber) {
      setShowPhoneInput(true);
      return;
    }

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          to: phoneNumber,
          message: `RWS Contact Info:\nEric Dahlberg\nPresident\nPhone: (707) 824-7907\nEmail: eric@winesecrets.com\n1446 Industrial Ave\nSebastopol, CA 95472`
        }),
      });

      if (response.ok) {
        setSmsSent(true);
        setTimeout(() => {
          setShowStayConnected(false);
          setCurrentPage(1);
          setHasConsent(false);
          setSmsSent(false);
          setPhoneNumber('');
          setShowPhoneInput(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  const PhoneInputModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Enter your phone number</h3>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="(123) 456-7890"
          className="w-full p-2 border rounded mb-4"
          pattern="[0-9]*"
          inputMode="numeric"
          autoFocus
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowPhoneInput(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowPhoneInput(false);
              handleSendSMS();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );

  const handleRedirect = () => {
    const painPointsData = {
      waterSource1: selectedOptions.includes('source1') ? 'Yes' : '',
      waterSource2: selectedOptions.includes('source2') ? 'Yes' : '',
      waterUse1: selectedOptions.includes('use1') ? 'Yes' : '',
      waterUse2: selectedOptions.includes('use2') ? 'Yes' : '',
      waterUse3: selectedOptions.includes('use3') ? 'Yes' : '',
      waterDisposal1: selectedOptions.includes('disposal1') ? 'Yes' : '',
      waterDisposal2: selectedOptions.includes('disposal2') ? 'Yes' : '',
      waterDisposal3: selectedOptions.includes('disposal3') ? 'Yes' : ''
    };

    const params = new URLSearchParams(painPointsData);
    window.location.href = `https://recovered-water-solutions.uw.r.appspot.com/?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-white p-6">
      {['/signup', '/confirmation', '/painpoints'].includes(window.location.pathname) ? (
        <>
          {window.location.pathname === '/painpoints' ? (
            <>
              <div className="max-w-md mx-auto mb-6">
                <img 
                  src="/RWS-Logo-RGB.png" 
                  alt="RWS Logo" 
                  className="h-16 w-auto mx-auto"
                />
              </div>
              <div className="max-w-md mx-auto bg-blue-50 rounded-xl shadow-lg p-8">
                <Routes>
                  <Route path="/painpoints" element={
                    <PainPoints 
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                      onContinue={() => navigate('/signup?fromPainPoints=true')}
                    />
                  } />
                </Routes>
              </div>
            </>
          ) : (
            <Routes>
              <Route path="/signup" element={<Signup isDirectSignup={window.location.search !== '?fromPainPoints=true'} />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          )}
        </>
      ) : (
        <>
          <div className="max-w-md mx-auto mb-6">
            <img 
              src="/RWS-Logo-RGB.png" 
              alt="RWS Logo" 
              className="h-16 w-auto mx-auto"
            />
          </div>
          
          <div className="max-w-md mx-auto bg-blue-50 rounded-xl shadow-lg p-8">
            {window.location.pathname === '/' && (
              <>
                {currentPage === 1 && !showStayConnected && <PageOne />}
                {currentPage === 2 && !showStayConnected && <PageTwo />}
                {showStayConnected && <StayConnectedPage />}
                {showPhoneInput && <PhoneInputModal />}
              </>
            )}
          </div>
        </>
      )}
  
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

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;