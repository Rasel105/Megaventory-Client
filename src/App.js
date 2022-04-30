import logo from './logo.svg';
import './App.css';
import Header from './Pages/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Navbar from './Pages/Navbar/Navbar';
import Inventory from './Pages/Inventory/Inventory';
import ManageInventories from './Pages/ManageInventories/ManageInventories';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Header/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/inventory/:id' element={<Inventory/>}></Route>
        <Route path='/manageInventories' element={<ManageInventories/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
