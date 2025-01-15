import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, Outlet, Link } from 'react-router-dom';
import PainPoints from './components/PainPoints';
import Modal from './components/Modal';
import Signup from './components/Signup';
import Confirmation from './components/Confirmation';

// Logo component with link
const LogoWithLink = () => (
  <div className="max-w-md mx-auto mb-6">
    <Link to="/">
      <img 
        src="/RWS-Logo-RGB.png" 
        alt="RWS Logo" 
        className="h-16 w-auto mx-auto hover:opacity-90 transition-opacity duration-200"
      />
    </Link>
  </div>
);

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
  const [showAboutPopup, setShowAboutPopup] = useState(false);

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      if (!['/painpoints', '/signup', '/confirmation', '/'].includes(path)) {
        navigate('/', { replace: true });
      }
      if (path === '/') {
        setCurrentPage(1);
        setShowStayConnected(false);
      }
    };

    handleNavigation();
    window.addEventListener('popstate', handleNavigation);
    
    return () => window.removeEventListener('popstate', handleNavigation);
  }, [navigate]);

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
        Take 20 seconds to learn more about our*{' '}
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
        Water Risk Assessment for your winery or beverage facility.
      </h2>

      <div className="space-y-4">
        <button 
          onClick={() => setShowStayConnected(true)}
          className="w-full p-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 active:bg-gray-100"
          style={{ 
            border: '1px solid rgb(86,177,223)',
            touchAction: 'manipulation'
          }}
        >
          Thanks, but our winery has perfect water balance.
        </button>

        <button 
          onClick={() => {
            setCurrentPage(2);
            navigate('/painpoints');
          }} 
          className="w-full p-2 rounded-lg text-white font-semibold hover:opacity-90 active:opacity-80"
          style={{ 
            backgroundColor: 'rgb(86,177,223)',
            touchAction: 'manipulation'
          }}
        >
          Sure, I have 20 seconds to learn more...
        </button>

        <div className="text-left mt-2">
          <span 
            className="relative inline-block text-sm text-gray-500 cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={() => setIsHovering(true)}
            onTouchEnd={() => setIsHovering(false)}
            onClick={() => setIsHovering(!isHovering)}
            style={{ touchAction: 'manipulation' }}
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

    return null;
  };

  const StayConnectedPage = () => {
    useEffect(() => {
      if (hasConsent) {
        const timer = setTimeout(() => {
          setShowStayConnected(false);
          setCurrentPage(1);
          setHasConsent(false);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [hasConsent]);

    return (
      <div className="text-center">
        <h3 className="text-xl font-bold mb-6">Feel free to reach out when you need water management expertise.</h3>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col space-y-4 items-center">
              <div 
                className="flex items-center space-x-2 w-48 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 active:bg-gray-100"
                style={{ touchAction: 'manipulation' }}
              >
                <img 
                  src="/vcard-icon.png" 
                  alt="vCard" 
                  className="h-8 w-8"
                />
                <a 
                  href="/eric-dahlberg.vcf" 
                  download
                  className="text-blue-500 hover:text-blue-600 active:text-blue-700"
                  style={{ touchAction: 'manipulation' }}
                  onTouchStart={(e) => e.preventDefault()}
                >
                  Download vCard
                </a>
              </div>

              <a 
                href="https://recwatersolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-48 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center active:bg-gray-100"
                style={{ touchAction: 'manipulation' }}
                onTouchStart={(e) => e.preventDefault()}
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
                className="w-48 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center active:bg-gray-100"
                style={{ touchAction: 'manipulation' }}
                onTouchStart={(e) => e.preventDefault()}
              >
                <img 
                  src="/WS Logo.png"
                  alt="Winesecrets Website" 
                  className="h-8 w-auto"
                />
              </a>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <button 
              onClick={() => {
                setShowStayConnected(false);
                setCurrentPage(2);
                navigate('/painpoints');
              }}
              className="w-full p-3 rounded-lg text-white hover:opacity-90 active:opacity-80"
              style={{ 
                backgroundColor: '#4CAF50',
                touchAction: 'manipulation'
              }}
              onTouchStart={(e) => e.preventDefault()}
            >
              I changed my mind, let me see if I need a FREE water risk assessment
            </button>
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
      className="absolute bg-white rounded-lg shadow-lg p-4 z-50"
      style={{ 
        width: '300px',
        right: '-320px',
        top: '-100px',
      }}
      onTouchStart={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div 
        className="absolute top-1/2 -left-2 transform -translate-y-1/2"
        style={{
          width: '0',
          height: '0',
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderRight: '8px solid white'
        }}
      ></div>
      <div className="flex justify-center mb-3">
        <img 
          src="/RWS-Logo-RGB.png"
          alt="RWS Logo" 
          className="h-10 w-auto"
        />
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">
        With 20+ years of expertise, RWS transforms water uncertainty into security with advanced filtration and custom recovery plans that maximize reuse, recycling, and efficiency for your facility.
      </p>
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

  // Add touch-friendly button styles
  const buttonBaseStyles = "w-full p-2 rounded-lg transition-all duration-150 touch-manipulation";
  const primaryButtonStyles = `${buttonBaseStyles} text-white font-semibold hover:opacity-90 active:opacity-80`;
  const secondaryButtonStyles = `${buttonBaseStyles} text-sm text-gray-500 hover:bg-gray-50 active:bg-gray-100`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-white p-6">
      {['/signup', '/confirmation', '/painpoints'].includes(window.location.pathname) ? (
        <>
          {window.location.pathname === '/painpoints' ? (
            <>
              <LogoWithLink />
              <div className="max-w-md mx-auto bg-blue-50 rounded-xl shadow-lg p-8 space-y-6">
                <PainPoints 
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  onContinue={() => navigate('/signup?fromPainPoints=true')}
                />
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
            </>
          ) : (
            <Outlet />
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
            {currentPage === 1 && !showStayConnected && <PageOne />}
            {currentPage === 2 && !showStayConnected && <PageTwo />}
            {showStayConnected && <StayConnectedPage />}
            {showPhoneInput && <PhoneInputModal />}
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
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />}>
          <Route path="painpoints" element={<PainPoints />} />
          <Route path="signup" element={<Signup />} />
          <Route path="confirmation" element={<Confirmation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;