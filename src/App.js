import './App.css';
import Scatter from './screens/scatter';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Nav from './components/nav';
import Histo from './screens/histo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div id="nav-bar">
        <Nav />
        <Routes>
          <Route path="/scatter" element={<Scatter />} />
          <Route path="/histo" element={<Histo />} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
