
import './App.css';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Home from './components/Home';
import Profile from './components/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={

            <LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
              </ProtectedRoute>} />


        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
