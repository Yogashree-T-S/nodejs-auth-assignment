import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ThankYou from './pages/ThankYou';
import VerifyOtp from './pages/VerifyOtp';
import Error from './pages/error';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
