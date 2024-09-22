import React, { useState } from 'react';
import axios from 'axios';
import './OpenAIComponent.css';

const OpenAIComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle OpenAI API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [{ role: 'user', content: userInput }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setOutput(result.data.choices[0].message.content);
      setIsEditing(false); // Ensure editing is disabled after fetching response
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
      setOutput('Error fetching response');
    }
  };

  // Function to fetch JSON file from the local server
  const handleGenerateRequirements = async () => {
    if (userInput.toLowerCase().includes('soccer')) {
      try {
        const response = await fetch('http://localhost:8080/json/soccer.json');
        const data = await response.json();
        setOutput(JSON.stringify(data, null, 2));
        setIsEditing(true); // Enable editing when displaying JSON data
      } catch (error) {
        console.error('Error fetching JSON file:', error);
        setOutput('Error fetching JSON data');
      }
    } else if (userInput.toLowerCase().includes('shopping')) {
      try {
        const response = await fetch('http://localhost:8080/json/shopping.json');
        const data = await response.json();
        setOutput(JSON.stringify(data, null, 2));
        setIsEditing(true); // Enable editing when displaying JSON data
      } catch (error) {
        console.error('Error fetching JSON file:', error);
        setOutput('Error fetching JSON data');
      }
    } else {
      setOutput('No matching JSON file found for the given input.');
    }
  };

  const handleJsonChange = (e) => {
    setOutput(e.target.value);
  };

  return (
    <div className="openai-container">
      <form className="openai-form" onSubmit={handleSubmit}>
        <div className="openai-input-container">
          <input
            className="openai-input"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask me anything..."
          />
          <div className="send-arrow" onClick={handleSubmit}>
            ➤
          </div>
        </div>
      </form>

      <button className="openai-button generate" onClick={handleGenerateRequirements}>
        Generate Requirements
      </button>

      <div className="output-display">
        <h3>Output:</h3>
        {isEditing ? (
          <textarea
            value={output}
            onChange={handleJsonChange}
            rows="10"
            cols="50"
          />
        ) : (
          <pre style={{ color: 'yellow', fontFamily: 'monospace', fontSize: '16px' }}>
            {output}
          </pre>
        )}
      </div>
    </div>
  );
};

export default OpenAIComponent;

