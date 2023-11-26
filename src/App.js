import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import UpdatePage from './pages/UpdatePage/UpdatePage';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import InsertPage from './pages/InsertPage/InsertPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter basename='the-digital-cellar-frontend/'>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/insert" element={<InsertPage/>}/>
        <Route path="/update/:id" element={<UpdatePage/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
