import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from "./Modal";

const PainPoints = ({ setCurrentPage, selectedOptions, setSelectedOptions, onContinue }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleOption = (option, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleContinueClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
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

    localStorage.setItem('rws_painpoints', JSON.stringify(painPointsData));
    setSelectedOptions([]);
    setShowModal(true);
  };

  const renderOption = (option, text, color) => {
    const isSelected = selectedOptions.includes(option);
    const baseOpacity = 0.15; // 15% opacity for unselected state
    const selectedOpacity = 1; // 100% opacity for selected state
    const rgbValues = color.match(/\d+/g);
    const baseColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${baseOpacity})`;
    const selectedColor = color;

    return (
      <button 
        onClick={(e) => toggleOption(option, e)}
        onTouchEnd={(e) => toggleOption(option, e)}
        className={`w-full p-3 rounded-lg text-left text-sm transition-all duration-200 ease-in-out
          ${isSelected ? 'text-white' : 'text-gray-700'}`}
        style={{ 
          backgroundColor: isSelected ? selectedColor : baseColor,
          WebkitTapHighlightColor: 'transparent',
          userSelect: 'none',
          cursor: 'pointer',
          border: 'none',
          outline: 'none'
        }}
      >
        {text}
      </button>
    );
  };

  return (
    <div>
      <h2 className="text-l font-bold mb-4" style={{ color: 'rgb(39,70,136)' }}>
        A Water Risk Assessment may include a visit to your facility to evaluate your process water system from source to drain—at no cost to you.
      </h2>
      

      {/* Water Source Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(86,177,223)' }}>IS YOUR WATER SOURCE IN FLUX?</h3>
        <div className="space-y-2">
          {renderOption('Source 1', 'Soaring water bills pressuring your bottom line?', 'rgb(86,177,223)')}
          {renderOption('Source 2', 'Is well water or aquifer access at risk?', 'rgb(86,177,223)')}
        </div>
      </div>

      {/* Water Use Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(39,70,136)' }}>DO YOU HAVE WATER USAGE BALANCE?</h3>
        <div className="space-y-2">
          {renderOption('Usage 1', 'Are hidden water inefficiencies draining resources?', 'rgb(39,70,136)')}
          {renderOption('Usage 2', 'Is water conservation a priority for your operation?', 'rgb(39,70,136)')}
          {renderOption('Usage 3', 'Are you interested in ZLD/ZLW? LLW?', 'rgb(39,70,136)')}
        </div>
      </div>

      {/* Water Disposal Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(133,72,149)' }}>IS YOUR WATER DISPOSAL EFFICIENT?</h3>
        <div className="space-y-2">
          {renderOption('Disposal 1', 'Do General Order requirements feel overwhelming?', 'rgb(133,72,149)')}
          {renderOption('Disposal 2', 'Rising hauling fees giving you anxiety?', 'rgb(133,72,149)')}
          {renderOption('Disposal 3', 'Is your lagoon imperiled?', 'rgb(133,72,149)')}
        </div>
      </div>

      {selectedOptions.length > 0 && (
        <button 
          onClick={(e) => handleContinueClick(e)}
          onTouchEnd={(e) => handleContinueClick(e)}
          className="w-full mt-6 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out hover:opacity-90"
          style={{ 
            backgroundColor: 'rgb(86,177,223)',
            WebkitTapHighlightColor: 'transparent',
            userSelect: 'none',
            cursor: 'pointer',
            border: 'none',
            outline: 'none'
          }}
        >
          Finish
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
