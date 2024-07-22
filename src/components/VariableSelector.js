import React, { useState } from 'react';

const VariableSelector = ({selectedVariable, setSelectedVariable}) => {
  const availableVariables = ['preffered_premium_plan', 'preferred_listening_content', 'fav_music_genre', 'fav_pod_genre'];

  const handleChange = (event) => {
    setSelectedVariable(event.target.value);
  };

  const analyzeVariable = () => {
    // Logic for analyzing the selected variable
    console.log('Analyzing variable:', selectedVariable);
  };

  return (
    <div>
      <h2>Select Variable to Analyze</h2>
      <form>
        {availableVariables.map((variable) => (
          <div key={variable}>
            <input
              type="radio"
              value={variable}
              onChange={handleChange}
              checked={selectedVariable === variable}
            />
            {variable}
          </div>
        ))}
      </form>
      <br />
      <button type="button" onClick={analyzeVariable}>Analyze</button>

      <div>
        <h2>Analysis Process</h2>
        {/* Display analysis results based on selected variable */}
        {selectedVariable ? (
          <p>Analyzing {selectedVariable}</p>
        ) : (
          <p>No variable selected</p>
        )}
      </div>
    </div>
  );
};

export default VariableSelector;






