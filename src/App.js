import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/search" 
          element={
            document.cookie.includes('fetch-access-token')
              ? <SearchPage />
              : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;