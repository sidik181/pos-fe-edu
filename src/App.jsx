import './App.css';
import AppRoutes from './config/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <div className="h-screen bg-gray-200">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  )
}

export default App;
