import React from 'react';
import { Home } from './Home';
import { Loading } from './Loading';
import { Results } from './Results';
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  const [videoFile, setVideoFile] = React.useState(null);
  const [USState, setUSState] = React.useState('Alabama');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Home 
            videoFile={videoFile}
            setVideoFile={setVideoFile}
            USState={USState}
            setUSState={setUSState}
          />
        } />
        <Route path="/loading" element={<Loading/>} />
        <Route path="/results" element={<Results/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
