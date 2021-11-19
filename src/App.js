import './App.css';
import SigninPage from './SigninPage';
import SignupPage from './SignupPage';
import Nav from './Nav.js';
import Feed from './Feed.js';
import UserPage from './UserPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './AuthContext';


function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <main>
            <Nav />
            <Routes>
              <Route exact path="/" element={<SigninPage />} />
              <Route exact path="/signup" element={<SignupPage />} />
              <Route exact path="/feed" element={<Feed />} />
              <Route exact path="/profile" element={<UserPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
