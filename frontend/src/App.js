import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import Auth0VerificationChecklist from './Auth0VerificationChecklist';

function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading-state">
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Auth0 Error Details:', error);
    console.error('Full Error Object:', JSON.stringify(error, null, 2));
    const is401Error = error.message?.includes('401') || error.message?.includes('Unauthorized');
    
    // Get configuration values for checklist
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = window.location.origin;
    
    return (
      <div className="app-container" style={{ padding: '1rem', maxWidth: '1200px', width: '100%' }}>
        <div className="error-state" style={{ marginBottom: '1rem' }}>
          <div className="error-title">Authentication Error</div>
          <div className="error-message">{error.message || 'Something went wrong'}</div>
          {error.error && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.9 }}>
              Error Code: {error.error}
            </div>
          )}
          {error.error_description && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.8, fontStyle: 'italic' }}>
              {error.error_description}
            </div>
          )}
        </div>
        
        {is401Error && (
          <Auth0VerificationChecklist 
            redirectUri={redirectUri}
            domain={domain}
            clientId={clientId}
          />
        )}
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="main-card-wrapper">
        <img 
          src="https://cdn.auth0.com/quantum-assets/dist/latest/logos/auth0/auth0-lockup-en-ondark.png" 
          alt="Auth0 Logo" 
          className="auth0-logo"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <h1 className="main-title">Welcome to Sample0</h1>
        
        {isAuthenticated ? (
          <div className="logged-in-section">
            <div className="logged-in-message">✅ Successfully authenticated!</div>
            <h2 className="profile-section-title">Your Profile</h2>
            <div className="profile-card">
              <Profile />
            </div>
            <LogoutButton />
          </div>
        ) : (
          <div className="action-card">
            <p className="action-text">Get started by signing in to your account</p>
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
