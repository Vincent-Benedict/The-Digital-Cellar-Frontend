import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import UpdatePage from './pages/UpdatePage/UpdatePage';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import InsertPage from './pages/InsertPage/InsertPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="http://Vincent-Benedict.github.io/The-Digital-Cellar-Frontend/" element={<LoginPage/>}/>
        <Route path="http://Vincent-Benedict.github.io/The-Digital-Cellar-Frontend/home" element={<HomePage/>}/>
        <Route path="http://Vincent-Benedict.github.io/The-Digital-Cellar-Frontend/insert" element={<InsertPage/>}/>
        <Route path="http://Vincent-Benedict.github.io/The-Digital-Cellar-Frontend/update/:id" element={<UpdatePage/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
