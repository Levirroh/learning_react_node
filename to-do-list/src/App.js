import React, { useEffect, useState } from 'react';
import './index.css';
import Test from "./components/Test"
import Connection from "./components/Connection"

function App() {

  return (
    <div className="App">
      <Test />
      <Connection />
    </div>
  );
}

export default App;