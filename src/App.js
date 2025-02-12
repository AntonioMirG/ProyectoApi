import React from 'react';
import './App.css'; 
import MostrarPersonajes from './componentes/MostrarPersonajes';
function App() {
  return (
    <div className="App">
      <header>
        <h1>Wiki Dragon Ball</h1>
      </header>
      <div>
        <MostrarPersonajes />
      </div>
    </div>
  );
}

export default App;
