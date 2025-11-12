import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// Validate Auth0 configuration
if (!domain || !clientId) {
  console.error('Auth0 configuration missing. Please check your .env file.');
  console.error('Required environment variables:');
  console.error('- REACT_APP_AUTH0_DOMAIN');
  console.error('- REACT_APP_AUTH0_CLIENT_ID');
  throw new Error('Auth0 domain and client ID must be set in .env file');
}

// Validate domain format
if (!domain.includes('.auth0.com') && !domain.includes('.us.auth0.com') && !domain.includes('.eu.auth0.com') && !domain.includes('.au.auth0.com')) {
  console.warn('Auth0 domain format might be incorrect. Expected format: your-domain.auth0.com');
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Get the redirect URI - use window.location.origin for Create React App
const redirectUri = window.location.origin;

// Log the redirect URI for debugging
console.log('Auth0 Redirect URI:', redirectUri);
console.log('Make sure this URL is added to your Auth0 Application Settings:');
console.log('- Allowed Callback URLs');
console.log('- Allowed Logout URLs');
console.log('- Allowed Web Origins');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
