import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Navbar from './features/header/topNav';
import ContentBox from './features/content/contentBox';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <ContentBox/> 
      <Counter />
        
    </div>
  );
}

export default App;
