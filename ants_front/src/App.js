import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './screen/Home';
import { HomeContext,HomeProvider } from './screen/Home/HomeContext';
import React from 'react';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Routes>
        <Route exact path="/" element={
        <HomeProvider>
          <Home />
          </HomeProvider>} key="Home" />
      </Routes>
    </div>
  );
}

export default App;
