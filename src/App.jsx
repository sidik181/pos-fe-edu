import AppRoutes from "./config/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {

  return (
    <div className="h-screen bg-gray-200">
      <ToastContainer />
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
