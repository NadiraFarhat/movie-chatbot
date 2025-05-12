import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome/Welcome';
import Chatbox from './pages/chatbox/Chatbox';
import Navigation from './components/navigation/Navigation';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/chatbox" element={<Chatbox />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
