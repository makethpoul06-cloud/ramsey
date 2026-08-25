import { useNavigate } from 'react-router-dom';

export default function TestDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <main style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Staff Dashboard</h1>
      <p>You have successfully navigated through the auth flow.</p>
      <button type="button" onClick={handleLogout} style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}>
        Logout
      </button>
    </main>
  );
}
