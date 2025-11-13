import React from 'react';

const Auth0VerificationChecklist = ({ redirectUri, domain, clientId }) => {
  const checklistItems = [
    {
      id: 1,
      title: 'Application Type',
      required: 'Single Page Application',
      location: 'Settings → Application Type (top of page)',
      instructions: 'Must be "Single Page Application", NOT "Regular Web Application" or "Native"',
    },
    {
      id: 2,
      title: 'Token Endpoint Authentication Method',
      required: 'None',
      location: 'Settings → Advanced Settings → Token Endpoint Authentication Method',
      instructions: 'Must be "None". SPAs cannot use client secrets.',
    },
    {
      id: 3,
      title: 'Allowed Web Origins',
      required: redirectUri,
      location: 'Settings → Application URIs → Allowed Web Origins',
      instructions: 'This is CRITICAL for CORS. Must include your exact redirect URI.',
    },
    {
      id: 4,
      title: 'Allowed Callback URLs',
      required: redirectUri,
      location: 'Settings → Application URIs → Allowed Callback URLs',
      instructions: 'Must include your redirect URI for the login flow to work.',
    },
    {
      id: 5,
      title: 'Allowed Logout URLs',
      required: redirectUri,
      location: 'Settings → Application URIs → Allowed Logout URLs',
      instructions: 'Must include your redirect URI for logout to work.',
    },
    {
      id: 6,
      title: 'Client ID Match',
      required: clientId,
      location: 'Settings → Basic Information → Client ID',
      instructions: 'Verify the Client ID in Auth0 matches your .env file.',
    },
    {
      id: 7,
      title: 'Domain Match',
      required: domain,
      location: 'Settings → Basic Information → Domain',
      instructions: 'Verify the Domain in Auth0 matches your .env file.',
    },
  ];

  return (
    <div style={{
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: 'rgba(0,0,0,0.4)',
      borderRadius: '12px',
      fontSize: '0.95rem',
      maxWidth: '800px',
      margin: '2rem auto',
    }}>
      <div style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '1rem', color: '#f7fafc' }}>
        ✅ Auth0 Configuration Verification Checklist
      </div>
      <div style={{ marginBottom: '1rem', color: '#cbd5e0', fontSize: '0.9rem' }}>
        Go to:{' '}
        <a 
          href="https://manage.auth0.com/dashboard/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#63b3ed', textDecoration: 'underline' }}
        >
          Auth0 Dashboard → Applications → Your App → Settings
        </a>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {checklistItems.map((item) => (
          <div 
            key={item.id}
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ fontWeight: '600', color: '#63b3ed', marginBottom: '0.5rem' }}>
              {item.id}. {item.title}
            </div>
            <div style={{ color: '#e2e8f0', marginBottom: '0.3rem' }}>
              <strong>Required:</strong> <code style={{ 
                backgroundColor: 'rgba(99, 179, 237, 0.2)', 
                padding: '2px 8px', 
                borderRadius: '4px',
                color: '#63b3ed',
                fontWeight: '600'
              }}>{item.required}</code>
            </div>
            <div style={{ color: '#a0aec0', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
              <strong>Location:</strong> {item.location}
            </div>
            <div style={{ color: '#cbd5e0', fontSize: '0.9rem' }}>
              {item.instructions}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '1.5rem', 
        padding: '1rem', 
        backgroundColor: 'rgba(99, 179, 237, 0.1)', 
        borderRadius: '8px',
        border: '1px solid rgba(99, 179, 237, 0.3)',
      }}>
        <div style={{ fontWeight: '600', color: '#63b3ed', marginBottom: '0.5rem' }}>
          🔄 After Making Changes:
        </div>
        <ol style={{ marginLeft: '1.5rem', color: '#e2e8f0', lineHeight: '1.8' }}>
          <li>Click <strong>"Save Changes"</strong> in Auth0 Dashboard</li>
          <li>Restart your React app (stop and run <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>npm start</code> again)</li>
          <li>Clear browser cache or use incognito mode</li>
          <li>Try logging in again</li>
        </ol>
      </div>
    </div>
  );
};

export default Auth0VerificationChecklist;

