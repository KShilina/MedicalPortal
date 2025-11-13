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

// Log Auth0 configuration for debugging
console.log('🔐 Auth0 Configuration:');
console.log('═══════════════════════════════════════════════════════');
console.log('Domain:', domain);
console.log('Client ID:', clientId);
console.log('Redirect URI:', redirectUri);
console.log('');
console.log('⚠️  CRITICAL: Verify these Auth0 Application Settings:');
console.log('   1. Application Type: MUST be "Single Page Application"');
console.log('   2. Token Endpoint Authentication Method: MUST be "None"');
console.log('   3. Allowed Callback URLs:', redirectUri);
console.log('   4. Allowed Logout URLs:', redirectUri);
console.log('   5. Allowed Web Origins:', redirectUri);
console.log('');
console.log('📋 Quick Access:');
console.log('   Auth0 Dashboard: https://manage.auth0.com/dashboard/');
console.log('   → Navigate to: Applications → Your App → Settings');
console.log('   Quick Fix Guide: See QUICK_FIX_401.md in project root');
console.log('   Full Guide: See AUTH0_SETUP_VERIFICATION.md in project root');
console.log('');
console.log('💡 Tip: Run checkAuth0Config() in console for detailed checklist');
console.log('═══════════════════════════════════════════════════════');

// Helper function for console debugging
window.checkAuth0Config = function() {
  console.log('\n🔍 Auth0 Configuration Verification Checklist\n');
  console.log('Current Configuration:');
  console.log('  Domain:', domain);
  console.log('  Client ID:', clientId);
  console.log('  Redirect URI:', redirectUri);
  console.log('\n📋 Verify in Auth0 Dashboard:\n');
  console.log('1. Application Type');
  console.log('   ✅ Must be: "Single Page Application"');
  console.log('   ❌ NOT: "Regular Web Application" or "Native"');
  console.log('   📍 Location: Settings → Application Type (top of page)\n');
  
  console.log('2. Token Endpoint Authentication Method');
  console.log('   ✅ Must be: "None"');
  console.log('   ❌ NOT: "Post" or "Client Secret"');
  console.log('   📍 Location: Settings → Advanced Settings → Token Endpoint Authentication Method\n');
  
  console.log('3. Allowed Web Origins');
  console.log('   ✅ Must include:', redirectUri);
  console.log('   ⚠️  This is CRITICAL for CORS - missing this causes 401 errors');
  console.log('   📍 Location: Settings → Application URIs → Allowed Web Origins\n');
  
  console.log('4. Allowed Callback URLs');
  console.log('   ✅ Must include:', redirectUri);
  console.log('   📍 Location: Settings → Application URIs → Allowed Callback URLs\n');
  
  console.log('5. Allowed Logout URLs');
  console.log('   ✅ Must include:', redirectUri);
  console.log('   📍 Location: Settings → Application URIs → Allowed Logout URLs\n');
  
  console.log('6. Verify .env matches Auth0 Dashboard');
  console.log('   ✅ Domain in .env:', domain);
  console.log('   ✅ Client ID in .env:', clientId);
  console.log('   📍 Location: Settings → Basic Information\n');
  
  console.log('🔗 Auth0 Dashboard: https://manage.auth0.com/dashboard/');
  console.log('   → Applications → Your App → Settings\n');
};

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
