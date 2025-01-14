import { useState } from 'react';
import Modal from "./Modal";

const PainPoints = ({ setCurrentPage, selectedOptions, setSelectedOptions, onContinue }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleOption = (option) => {
    console.log('Toggling option:', option);
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    console.log('Updated selectedOptions:', selectedOptions);
  };

  const handleContinueClick = () => {
    const painPointsData = {
      'Source 1': selectedOptions.includes('Source 1') ? 'Yes' : 'No',
      'Source 2': selectedOptions.includes('Source 2') ? 'Yes' : 'No',
      'Usage 1': selectedOptions.includes('Usage 1') ? 'Yes' : 'No',
      'Usage 2': selectedOptions.includes('Usage 2') ? 'Yes' : 'No',
      'Usage 3': selectedOptions.includes('Usage 3') ? 'Yes' : 'No',
      'Disposal 1': selectedOptions.includes('Disposal 1') ? 'Yes' : 'No',
      'Disposal 2': selectedOptions.includes('Disposal 2') ? 'Yes' : 'No',
      'Disposal 3': selectedOptions.includes('Disposal 3') ? 'Yes' : 'No'
    };

    console.log('Pain Points Selected:', selectedOptions);
    console.log('Data being saved to localStorage:', painPointsData);
    localStorage.setItem('rws_painpoints', JSON.stringify(painPointsData));
    
    // Verify it was saved
    const savedData = localStorage.getItem('rws_painpoints');
    console.log('Verified localStorage data:', JSON.parse(savedData));

    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500 text-center mb-4 font-bold">
        Select all that apply or are needs adjacent for your facility.
      </p>

      {/* Water Source Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(86,177,223)' }}>IS YOUR WATER SOURCE IN FLUX?</h3>
        <div className="space-y-2">
          <button 
            onClick={() => toggleOption('Source 1')}
            className={`w-full p-3 rounded-lg text-left text-sm transition-colors ${
              selectedOptions.includes('Source 1') 
                ? 'text-white' 
                : 'hover:bg-opacity-20'
            }`}
            style={{ 
              backgroundColor: selectedOptions.includes('Source 1') 
                ? 'rgb(86,177,223)' 
                : 'rgba(86,177,223,0.15)'
            }}
          >
            Soaring water bills pressuring your bottom line?
          </button>
          <button 
            onClick={() => toggleOption('Source 2')}
            className={`w-full p-3 rounded-lg text-left text-sm transition-colors ${
              selectedOptions.includes('Source 2') 
                ? 'text-white' 
                : 'hover:bg-opacity-20'
            }`}
            style={{ 
              backgroundColor: selectedOptions.includes('Source 2') 
                ? 'rgb(86,177,223)' 
                : 'rgba(86,177,223,0.15)'
            }}
          >
            Is well water or aquifer access at risk?
          </button>
        </div>
      </div>

      {/* Water Use Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(39,70,136)' }}>DO YOU HAVE WATER USAGE BALANCE?</h3>
        <div className="space-y-2">
          <button 
            onClick={() => toggleOption('Usage 1')}
            className={`w-full p-3 rounded-lg text-left text-sm transition-colors ${
              selectedOptions.includes('Usage 1') 
                ? 'text-white' 
                : 'hover:bg-opacity-20'
            }`}
            style={{ 
              backgroundColor: selectedOptions.includes('Usage 1') 
                ? 'rgb(39,70,136)' 
                : 'rgba(39,70,136,0.15)'
            }}
          >
            Are hidden water inefficiencies draining resources?
          </button>
          <button 
            onClick={() => toggleOption('Usage 2')}
            className={`w-full p-3 rounded-lg text-left text-sm transition-colors ${
              selectedOptions.includes('Usage 2') 
                ? 'text-white' 
                : 'hover:bg-opacity-20'
            }`}
            style={{ 
              backgroundColor: selectedOptions.includes('Usage 2') 
                ? 'rgb(39,70,136)' 
                : 'rgba(39,70,136,0.15)'
            }}
          >
            Is water conservation a priority for your operation?
          </button>
          <button 
            onClick={() => toggleOption('Usage 3')}
            className={`w-full p-3 rounded-lg text-left text-sm transition-colors ${
              selectedOptions.includes('Usage 3') 
                ? 'text-white' 
                : 'hover:bg-opacity-20'
            }`}
            style={{ 
              backgroundColor: selectedOptions.includes('Usage 3') 
                ? 'rgb(39,70,136)' 
                : 'rgba(39,70,136,0.15)'
            }}
          >
            Are you interested in ZLD/ZLW?
          </button>
        </div>
      </div>

      {/* Water Disposal Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(133,72,149)' }}>IS YOUR WATER DISPOSAL EFFICIENT?</h3>
        <div className="space-y-2">
          <button 
            onClick={() => toggleOption('Disposal 1')}
            className={`w-full p-3 rounded-lg text-left text-sm transition-colors ${
              selectedOptions.includes('Disposal 1') 
                ? 'text-white' 
                : 'hover:bg-opacity-20'
            }`}
            style={{ 
              backgroundColor: selectedOptions.includes('Disposal 1') 
                ? 'rgb(133,72,149)' 
                : 'rgba(133,72,149,0.15)'
            }}
          >
            Do General Order requirements feel overwhelming?
          </button>
          <button 
            onClick={() => toggleOption('Disposal 2')}
            className={`w-full p-3 rounded-lg text-left text-sm transition-colors ${
              selectedOptions.includes('Disposal 2') 
                ? 'text-white' 
                : 'hover:bg-opacity-20'
            }`}
            style={{ 
              backgroundColor: selectedOptions.includes('Disposal 2') 
                ? 'rgb(133,72,149)' 
                : 'rgba(133,72,149,0.15)'
            }}
          >
            Rising hauling fees giving you anxiety?
          </button>
          <button 
            onClick={() => toggleOption('Disposal 3')}
            className={`w-full p-3 rounded-lg text-left text-sm transition-colors ${
              selectedOptions.includes('Disposal 3') 
                ? 'text-white' 
                : 'hover:bg-opacity-20'
            }`}
            style={{ 
              backgroundColor: selectedOptions.includes('Disposal 3') 
                ? 'rgb(133,72,149)' 
                : 'rgba(133,72,149,0.15)'
            }}
          >
            Is your lagoon imperiled?
          </button>
        </div>
      </div>

      {selectedOptions.length > 0 && (
        <button 
          onClick={handleContinueClick}
          className="w-full mt-6 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90"
          style={{ backgroundColor: 'rgb(86,177,223)' }}
        >
          Continue
        </button>
      )}

      {showModal && (
        <Modal 
          selectedOptions={selectedOptions}
          onClose={() => setShowModal(false)}
          onContinue={onContinue}
        />
      )}
    </div>
  );
};

export default PainPoints;
