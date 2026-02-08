import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AIGC from './pages/AIGC';
import Trade from './pages/Trade';
import Forum from './pages/Forum';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/aigc" element={<AIGC />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </Router>
  );
}

export default App;
