import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home.jsx';
import AppNavbar from './Components/Navbar.jsx';
import Products from './Components/Products.jsx';
import Contact from './Components/Contact.jsx';
import RegistrationForm from './pages/RegistrationForm.jsx';

import LoginForm from './pages/LoginForm.jsx'; // 👈 Add this import

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
