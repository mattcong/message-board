import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SigninPage from './components/signin/SigninPage';
import SignupPage from './components/signin/SignupPage';
import Nav from './components/nav/Nav.js';
import Feed from './components/feed/Feed.js';
import UserPage from './components/profile/UserPage';
import AuthProvider from './context/auth';


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
  )
}

export default App
