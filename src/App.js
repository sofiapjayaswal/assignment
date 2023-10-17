import './App.css';
import Scatter from './screens/scatter';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Nav from './components/nav';
import Histogram from './screens/histogram';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div id="nav-bar">
        <Nav />
        <Routes>
          <Route path="/scatter" element={<Scatter />} />
          <Route path="/histogram" element={<Histogram />} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
