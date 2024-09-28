import React from 'react';


import './App.css';
import Navbar from './features/header/topNav';
import ContentBox from './features/content/contentBox';

function App() {
  return (
    
      <div className="App">
        <Navbar/>
        <ContentBox/> 
      </div>
    
  );
}

export default App;