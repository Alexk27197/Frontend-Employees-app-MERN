import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { ToastContainer } from "react-toastify";
import GetSingleEmployee from "./pages/GetSingleEmployee/GetSingleEmployee";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employee-details/:id" element={<GetSingleEmployee />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
