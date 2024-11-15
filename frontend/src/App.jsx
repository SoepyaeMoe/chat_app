import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signup/SingupPage';
import HomePage from './pages/home/HomePage';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {

  const { authUser } = useAuthContext();

  return (
    <div className="flex h-screen w-100 justify-center items-center">
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path='/login' element={authUser ? <Navigate to={'/'} /> : <LoginPage />} />
        <Route path='/signup' element={authUser ? <Navigate to={'/'} /> : <SignupPage />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App;
