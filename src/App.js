import React from 'react';
import OpenAIComponent from './OpenAIComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Craft your <span className="highlight">ideas</span> into <span className="highlight">code</span>
        </h1>
        <OpenAIComponent />
      </header>
    </div>
  );
}

export default App;
