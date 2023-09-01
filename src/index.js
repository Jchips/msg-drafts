import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './components/Header';
import Profile from './components/Profile';
import { Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import MyNav from './components/MyNav';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_CLIENTID}
    authorizationParams={{
      redirect_uri: process.env.REACT_APP_AUTH_REDIRECTURI
    }}
  >
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
  </React.StrictMode>
);
