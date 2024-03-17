import './App.css';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './screens/About';
import PackagesScreen from './screens/PackagesScreen';
import BookingScreen from './screens/BookingScreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/about" element={<About />} />
          <Route path="/packages" element={<PackagesScreen />} />
          <Route path="/booking/:pkgid" element={<BookingScreen />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
