import './App.css';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './screens/About';
import PackagesScreen from './screens/PackagesScreen';
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HeroSection from './components/HeroSection'; // Import the HeroSection component
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';	

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroSection />} /> {/* Add route for HeroSection */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/about" element={<About />} />
          <Route path="/packages" element={<PackagesScreen />} />
          <Route path="/booking/:pkgid/:fromdate/:todate" element={<BookingScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
        </Routes>
        <Footer />

      </BrowserRouter>
    </div>

  );
}

export default App;
