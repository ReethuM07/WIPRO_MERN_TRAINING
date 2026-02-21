import React, { useState } from 'react';
import ProgramList from './components/ProgramList';
import './App.css';

function App() {

  const [userId, setUserId] = useState('USR101');

  return (
    <div className="App">
      <header className="App-header">
        <h1>FitTrack - Personal Fitness Training Portal</h1>

        <div className="user-selector">
          <label>Select User ID:</label>

          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="USR101">Arjun Mehta (USR101)</option>
            <option value="USR102">Sneha Verma (USR102)</option>
          </select>
        </div>
      </header>

      <ProgramList userId={userId} />
    </div>
  );
}

export default App;