import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { Provider } from 'react-redux';
import store from './store/conversation/store.js';
import SocketContextProvider from './context/SocketContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
  </StrictMode>,
)
