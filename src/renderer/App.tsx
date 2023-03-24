/* eslint-disable no-console */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Creator from './Pages/Creator/Creator';
import Home from './Pages/Home/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="creator" element={<Creator />} />
      </Routes>
    </Router>
  );
}
