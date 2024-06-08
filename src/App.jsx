import { useEffect } from 'react';
import './App.css';
import AppRoutes from './config/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import { refreshToken } from './app/api/auth';


function App() {
  useEffect(() => {
    const fetchNewAccessToken = async () => {
      const newAccessToken = await refreshToken();
      console.log(newAccessToken);
    };

    fetchNewAccessToken();
  }, []);

// function App() {

//   useEffect(() => {
//     const newAccessToken = refreshToken();
//     console.log(newAccessToken)
//   }, []);
  return (
    <div className="h-screen bg-gray-200">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  )
}

export default App;
