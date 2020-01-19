import React from 'react';
import './App.scss';

import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          GoodReadsApiDemo Sample App
        </p>
      </header>

      <Home />
    </div>
  );
}

export default App;
