import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from './pages/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <>
     <Router>
      {/* <Navbar/> */}
    <Routes>
        <Route path="/" element={<Home/>} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
