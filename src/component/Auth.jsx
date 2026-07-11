// import React, { useState } from 'react';

// const Auth = ({ onAuthSuccess }) => {
//   const [isSignUp, setIsSignUp] = useState(true); // Toggle between Login and SignUp
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');

//     if (!email || !password || (isSignUp && !name)) {
//       setError('Please fill in all required fields.');
//       return;
//     }

//     if (isSignUp) {
//       // Sign Up Logic: Save credentials to localStorage
//       const userData = { name, email, password };
//       localStorage.setItem(`user_${email}`, JSON.stringify(userData));
//       localStorage.setItem('current_logged_user', JSON.stringify(userData));
//       onAuthSuccess(userData);
//     } else {
//       // Login Logic: Verify from localStorage
//       const savedUser = localStorage.getItem(`user_${email}`);
//       if (!savedUser) {
//         setError('No account found with this email. Please Sign Up.');
//         return;
//       }

//       const parsedUser = JSON.parse(savedUser);
//       if (parsedUser.password !== password) {
//         setError('Incorrect password. Please try again.');
//         return;
//       }

//       localStorage.setItem('current_logged_user', JSON.stringify(parsedUser));
//       onAuthSuccess(parsedUser);
//     }
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '100vh',
//       backgroundColor: '#000',
//       fontFamily: 'sans-serif'
//     }}>
//       <div style={{
//         backgroundColor: '#121212',
//         padding: '40px',
//         borderRadius: '12px',
//         width: '100%',
//         maxWidth: '400px',
//         boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
//         textAlign: 'center'
//       }}>
//         {/* Spotify Logo / Branding Icon */}
//         <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🟢</div>
//         <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '25px' }}>
//           {isSignUp ? 'Create your free account' : 'Log in to Spotify'}
//         </h2>

//         {error && (
//           <div style={{
//             backgroundColor: '#e91429',
//             color: '#fff',
//             padding: '10px',
//             borderRadius: '4px',
//             marginBottom: '15px',
//             fontSize: '0.85rem',
//             textAlign: 'left'
//           }}>
//             ⚠️ {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//           {isSignUp && (
//             <div style={{ textAlign: 'left' }}>
//               <label style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>What's your name?</label>
//               <input
//                 type="text"
//                 placeholder="Enter your profile name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #727272', backgroundColor: '#121212', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
//               />
//             </div>
//           )}

//           <div style={{ textAlign: 'left' }}>
//             <label style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>What is your email?</label>
//             <input
//               type="email"
//               placeholder="name@domain.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #727272', backgroundColor: '#121212', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
//             />
//           </div>

//           <div style={{ textAlign: 'left' }}>
//             <label style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Create a password</label>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #727272', backgroundColor: '#121212', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
//             />
//           </div>

//           <button
//             type="submit"
//             style={{
//               backgroundColor: '#1DB954',
//               color: '#000',
//               border: 'none',
//               padding: '14px',
//               borderRadius: '25px',
//               fontWeight: 'bold',
//               fontSize: '1rem',
//               cursor: 'pointer',
//               marginTop: '10px',
//               transition: '0.2s'
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//           >
//             {isSignUp ? 'Sign Up' : 'Log In'}
//           </button>
//         </form>

//         <hr style={{ border: '0', height: '1px', backgroundColor: '#292929', margin: '25px 0' }} />

//         <p style={{ color: '#b3b3b3', fontSize: '0.9rem' }}>
//           {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
//           <span
//             onClick={() => {
//               setIsSignUp(!isSignUp);
//               setError('');
//             }}
//             style={{ color: '#fff', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
//           >
//             {isSignUp ? 'Log in here' : 'Sign up free'}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Auth;
import React, { useState } from 'react';

const Auth = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between Login and SignUp
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (isSignUp && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isSignUp) {
      // Sign Up Logic: Save credentials to localStorage
      const userData = { name, email, password };
      localStorage.setItem(`user_${email}`, JSON.stringify(userData));
      localStorage.setItem('current_logged_user', JSON.stringify(userData));
      onAuthSuccess(userData);
    } else {
      // Login Logic: Verify from localStorage
      const savedUser = localStorage.getItem(`user_${email}`);
      if (!savedUser) {
        setError('No account found with this email. Please Sign Up.');
        return;
      }

      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.password !== password) {
        setError('Incorrect password. Please try again.');
        return;
      }

      localStorage.setItem('current_logged_user', JSON.stringify(parsedUser));
      onAuthSuccess(parsedUser);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Spotify Logo / Branding Icon */}
        <div className="auth-logo" />
        <h2 className="auth-title">
          {isSignUp ? 'Create your free account' : 'Log in to Spotify'}
        </h2>

        {error && (
          <div className="auth-error">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="auth-field">
              <label className="auth-label">What's your name?</label>
              <input
                type="text"
                placeholder="Enter your profile name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
              />
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">What is your email?</label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Create a password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
          </div>

          <button type="submit" className="auth-submit">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <hr className="auth-divider" />

        <p className="auth-switch-text">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="auth-switch-link"
          >
            {isSignUp ? 'Log in here' : 'Sign up free'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;